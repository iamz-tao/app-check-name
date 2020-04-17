import React, { Component } from 'react';
import { Avatar, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { DotsLoader, TextLoader } from 'react-native-indicator';
import Device from 'react-native-device-info';
import Beacons from 'react-native-beacons-manager';
import { checkLocationStatus } from '../../../../AuthBeacon/func'

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableHighlight,
  Picker,
  Modal,
  Image,
  DeviceEventEmitter,
  PermissionsAndroid
} from 'react-native';

import {
  Logout,
  GetCurrentYear,
  GetSubjectRegistration,
  Checkname,
  GetClassCheckName,
  GetBeaconClass
} from '../../../../actions';


const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This example app needs to access your location in order to use bluetooth beacons.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      // permission denied
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}

class StudentCheckName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: '',
      section: '',
      token: '',
      modalVisible: false,
      macAddress: '',
      ischecking: false,
      beacon: [],
      uuid: '',
      major: '',
      minor: '',
      distance: 0,
      hasbeacon: false,
      rssi: '',
      isBluetooth: true,
    };
  }

  async componentDidMount() {
    const {
      LoginReducer: {
        data: { token },
      },
    } = this.props.navigation.state.params;
    const {
      GetSubjectRegistration,
      GetCurrentYear,
      GetClassCheckName,
    } = this.props;
    if (!token) {
      this.props.navigation.navigate('Login');
    } else {
      const request = await requestLocationPermission();
      if (request) {
        this.setState({
          token,
        });
        GetCurrentYear({
          token,
        });
        GetSubjectRegistration({
          token,
        });
        GetClassCheckName({
          token,
        });

        this.getMacAddress();
      }
    }
    this.beacondidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        if (data.beacons.length > 0) {
          this.setState({
            beacon:data.beacons,
          })
        }
        else {
          this.setState({
            beacon: [],
            isBluetooth: false
          }
          )
        }
      }
    )
  }

  setModalVisible() {
    this.setState({ modalVisible: true });
  }

  handleSelect = () => {
    const select = this.state.pickerValues;
    if (select === '') {
      alert('Please select!');
    }
    alert(select);
  };

  getMacAddress = () => {
    Device.getMacAddress()
      .then(address => {
        this.setState({ macAddress: address })
      })
      .catch(err => {
        console.warn(err)
      })
  }

  scan = async () => {
    //Set Scan Beacon 3 s
    Beacons.setForegroundScanPeriod(3000);
    Beacons.setRssiFilter(0, 2000);
    Beacons.startRangingBeaconsInRegion('REGION')
      .then(() => {
        console.log('------scanning----------')
      })
  }

  setBeacon = () => {
    const { beacon } = this.state;
    beacon.map(b => {
      this.setState({
        uuid: b.uuid,
        major: b.major,
        minor: b.minor,
        distance: b.distance,
        rssi: b.rssi
      })
    })
  }

  getClassId = () => {
    const { pickerValues } = this.state;
    const {
      openingClass: { openingClass },
    } = this.props;
    let class_id;
    if (openingClass.length === 1) {
      class_id = openingClass[0].class_id
    }
    else {
      class_id = pickerValues;
    }
    return class_id;
  }

  checkname = async () => {
    this.scan();
    this.setState({ ischecking: true });
    setTimeout(async () => {
      // this.scan();
      this.setBeacon();
      await this.handleCheck();
      this.setState({ ischecking: false, modalVisible: true })
    }, 3500)
  };

  handleCheck = async () => {
    const { Checkname } = this.props;
    const { macAddress, token, uuid, major, minor, distance, rssi } = this.state;
    const check = this.checkBeaconEmpty();
    const class_id = this.getClassId();
    Checkname({
      token,
      macAddress,
      uuid,
      major,
      minor,
      distance,
      rssi,
      check,
      class_id
    })
  }

  checkBeaconEmpty = () => {
    const { beacon } = this.state;
    if (beacon.length < 1) {
      return true;
    }
    else {
      return false;
    }
  }

  checkBeaconLength = async () => {
    const { beacon } = this.state;
    if (beacon.length > 1) {
      return true;
    }
    else {
      return false;
    }
  }

  componentWillUnmount() {
    this.beacondidRange = null;
    Beacons.stopRangingBeaconsInRegion("REGION1");
  }

  handleLogout = () => {
    const { Logout } = this.props;
    Logout({});
  };

  render() {
    const { pickerValues, section, token, ischecking, uuid, distance, hasbeacon } = this.state;
    const {
      currentYear: { year, semester },
    } = this.props.currentYear;
    const {
      openingClass: { fetching, openingClass },
    } = this.props;


    const { statusCheckin, time_check, status, error_message } = this.props.checkname
    const subjectsArr = [];
    const sectionArr = [];
    let subject_name = '';
    let sectionId = '';
    let time = '';
    let time2 = '';
    if (fetching || !openingClass || ischecking) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }
    openingClass.map((s, i) => {
      subjectsArr.push({
        label: `${s.Section.subject_code} ${s.Section.subject_name}`,
        value: s.class_id,
      });
    });
    // console.log(openingClass)
    if (pickerValues !== '') {
      const classDetail = openingClass.filter(
        s => s.class_id === pickerValues,
      )[0].Section;
      subject_name = classDetail.subject_name;
      sectionId = classDetail.section_number;
      time = `${classDetail.Time[0].day} ${classDetail.Time[0].start_time} - ${
        classDetail.Time[0].end_time
        }`;
      time2 =
        classDetail.Time.length === 2 &&
        `${classDetail.Time[1].day} ${classDetail.Time[1].start_time} - ${
        classDetail.Time[1].end_time
        }}`;
    }
    
    // console.log('subjects>>',subjects)
    return (
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            presentationStyle="pageSheet">
            <View style={styles.ModalWrapper}>
              <View style={styles.DetailModalSuccessWrapper}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  {status === 'SUCCESS' && (
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        style={styles.CustomImg}
                        source={require('../../../../../android/statics/images/success.png')}
                      />
                      <View style={{ height: 36 }} />
                      <Text style={styles.styleLabelFail}>
                        CHECK NAME SUCCESS
                      </Text>
                      <Text style={styles.styleLabel}>
                        You can check history in MY SUBJECT page.{"\n"}
                        Time   : {time_check}. {"\n"}
                        Status : {statusCheckin === 'ONTIME' && 
                        (<Text style={{color: 'green'}}>On Time</Text>)}
                        {statusCheckin === 'LATE' && (<Text style={{color: '#0029FF'}}>Late</Text>)}
                        {statusCheckin === 'ABSENT' && (<Text style={{color: '#FF0000'}}>Absent</Text>)}
                      </Text>
                    </View>
                  )}
                  {status === 'FAILURE' && (
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        style={styles.CustomImg}
                        source={require('../../../../../android/statics/images/icon-failure.png')}
                      />
                      <View style={{ height: 36 }} />
                      <Text style={styles.styleLabelFail}>
                        CHECK NAME FAILED
                      </Text>
                      <Text style={styles.styleLabel}>
                        {error_message}
                      </Text>
                    </View>
                  )}
                  <View style={{ height: 16 }} />
                  <TouchableHighlight
                    style={styles.btnReq}
                    onPress={() => {
                      this.setState({ modalVisible: !this.state.modalVisible });
                      if (status === 'SUCCESS') {
                        // this.props.navigation.navigate('StudentListCheckName');
                      }
                      else {
                      }

                    }}>
                    <Text style={{ color: 'white' }}>OK</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.container}>
          <View style={{ display: 'flex', alignItems: 'flex-end' }}>
            <TouchableHighlight
              style={styles.btnLogout}
              onPress={() => {
                this.handleLogout();
              }}>
              <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.containerWrapper}>
            <Text style={styles.styleHeader}>CHECK NAME</Text>
          </View>
          <Text style={(styles.styleLabel, { paddingLeft: 16 })}>
            YEAR / SEMESTER : {year} / {semester}
          </Text>
          <View style={{ height: 21 }} />
          {openingClass !== null && openingClass.length === 1 && (
            <View>
              <Text
                style={(styles.styleLabel, { paddingLeft: 16, marginBottom: 6 })}>
                SUBJECT NAME : {openingClass[0].Section.subject_code}{' '}
                {openingClass[0].Section.subject_name}
              </Text>
              <Text
                style={(styles.styleLabel, { paddingLeft: 16, marginBottom: 6 })}>
                SECTION : {openingClass[0].Section.section_number}
              </Text>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text
                  style={
                    (styles.styleLabel, { paddingLeft: 16, marginBottom: 6 })
                  }>
                  TIME : {openingClass[0].Section.Time[0].day}{' '}
                  {openingClass[0].Section.Time[0].start_time} -{' '}
                  {openingClass[0].Section.Time[0].end_time}
                </Text>
                {openingClass[0].Section.Time[1] && (
                  <Text
                    style={
                      (styles.styleLabel, { paddingLeft: 58, marginBottom: 6 })
                    }>
                    TIME : {openingClass[0].Section.Time[1].day}{' '}
                    {openingClass[0].Section.Time[1].start_time} -{' '}
                    {openingClass[0].Section.Time[1].end_time}
                  </Text>
                )}
              </View>
            </View>
          )}
          {openingClass !== null && openingClass.length > 1 && (
            <View>
              <View style={styles.styleInputWrapper}>
                <View style={styles.inputContainer}>
                  <Text style={styles.styleLabel}>SELECT SUBJECT :</Text>
                  <View style={styles.stylePicker}>
                    <Picker
                      style={{ height: 45 }}
                      selectedValue={pickerValues}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          pickerValues: itemValue,
                        })
                      }>
                      <Picker.Item label="Select Subject" value="" />

                      {subjectsArr.length > 0 &&
                        subjectsArr.map(s => (
                          <Picker.Item label={s.label} value={s.value} />
                        ))}
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={{ display: 'flex', paddingLeft: 21, width: 340 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={
                      (styles.styleLabel, { width: 116, alignSelf: 'center' })
                    }>
                    Subject Name :{' '}
                  </Text>
                  <Text style={{ flex: 3 }}>{subject_name}</Text>
                </View>
                <View style={{ height: 8 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={(styles.styleLabel, { width: 100 })}>
                    Date/Time :
                  </Text>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text style={styles.styleLabel}>{time}</Text>
                    <Text style={styles.styleLabel}>{time2}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          <View style={{ height: 8 }} />
          <View style={styles.btnWrapper}>
            <TouchableHighlight
              style={styles.btnCancel}
              onPress={() => this.props.navigation.navigate('StudentHomePage')}>
              <Text style={{ color: '#949494' }}>CANCEL</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnReq}
              onPress={() => {
                this.checkname();
                // this.setModalVisible();
              }}>
              <Text style={{ color: 'white' }}>CHECK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

//use to add reducer state to props
const mapStateToProps = state => {
  return {
    openingClass: state.checkNameReducer,
    currentYear: state.yearReducer,
    Subjects: state.subjectReducer,
    checkname: state.checkNameReducer
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  GetClassCheckName,
  GetCurrentYear,
  GetSubjectRegistration,
  Logout,
  Checkname,
  GetBeaconClass
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentCheckName);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    fontFamily: 'Kanit',
    padding: 8,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  btnLogout: {
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 8,
    borderWidth: 1,
    backgroundColor: '#CA5353',
    borderColor: '#CA5353',
    color: '#ffffff',
    width: 68,
    height: 36,
    borderRadius: 21,
  },
  CustomImg: {
    width: 116,
    height: 116,
    top: 20,
  },
  ModalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  DetailModalWrapper: {
    width: 300,
    height: 300,
    backgroundColor: '#EBEAEA',
    borderRadius: 19,
  },
  DetailModalSuccessWrapper: {
    width: 300,
    height: 300,
    backgroundColor: '#F7F7F7',
    borderColor: '#EBEAEA',
    borderRadius: 19,
  },
  loadingWrapper: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  btnReq: {
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 8,
    borderWidth: 1,
    backgroundColor: '#CA5353',
    borderColor: '#CA5353',
    color: '#ffffff',
    width: 96,
    height: 46,
    borderRadius: 21,
  },
  btnCancel: {
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 8,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#949494',
    color: '#949494',
    width: 96,
    height: 46,
    borderRadius: 21,
  },
  containerWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  styleHeader: {
    display: 'flex',
    flex: 1,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 42,
    paddingLeft: 16,
  },
  styleLabel: {
    fontSize: 14,
    lineHeight: 21,
    display: 'flex',
    paddingLeft: 12,
    alignItems: 'center',
  },
  styleLabelFail: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 21,
    display: 'flex',
    paddingLeft: 12,
    color: '#CA5353',
  },
  styleInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 16,
  },
  inputContainer: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 300,
    marginBottom: 12,
    flexDirection: 'column',
    display: 'flex',
  },
  inputs: {
    height: 45,
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(36, 52, 69, 0.5)',
    borderRadius: 21,
    paddingLeft: 12,
  },
  inputContainerGroup: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 300,
    marginBottom: 12,
    flexDirection: 'row',
    display: 'flex',
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: 150,
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: '#CA5353',
    borderColor: '#CA5353',
    color: '#ffffff',
  },
  styleButtonGroup: {
    borderRadius: 21,
    borderColor: '#CA5353',
  },
  stylePicker: {
    width: '100%',
    borderWidth: 1,
    height: 45,
    borderColor: 'rgba(36, 52, 69, 0.5)',
    borderRadius: 21,
    color: '#738497',
  },
});



