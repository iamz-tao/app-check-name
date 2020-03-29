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
  Checkname
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
      distance: 0
    };
  }

  async componentDidMount() {

    const {
      LoginReducer: {
        data: { token },
      },
    } = this.props.navigation.state.params;
    const { GetSubjectRegistration, GetCurrentYear } = this.props;
    if (!token) {
      this.props.navigation.navigate('Login');
    } else {

      Beacons.detectIBeacons();
      Beacons.setForegroundScanPeriod(1000);

      const request_permission = await requestLocationPermission();
      checkLocationStatus();

      if (request_permission) {
        this.scan();
        Beacons.setRssiFilter(0, 4000);
        this.setState({
          token,
        });
        GetCurrentYear({
          token,
        });
        GetSubjectRegistration({
          token,
        });

        this.getMacAddress();
      }

      this.beacondidRange = DeviceEventEmitter.addListener(
        'beaconsDidRange',
        (data) => {
          if (data.beacons.length > 0) {
            this.setState({
              beacon: data.beacons
            })
            // console.log(data.beacons)

          }
        }
      )
    }
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
            distance: b.distance
          })
        })
      }

  checkname = async () => {
   
    this.setState({ ischecking: true });

    setTimeout(async () => {
      this.setBeacon();
      await this.handleCheck();
      this.setState({ischecking : false,modalVisible : true})
    },5000)
  };

    handleCheck = async () => {
      const {Checkname} = this.props;
      const { macAddress,token,uuid,major,minor,distance} = this.state;

      Checkname({
        token,
        macAddress,
        uuid,
        major,
        minor,
        distance
      })
    }

  handleLogout = () => {
    const { Logout } = this.props;
    Logout({});
  };

  render() {
    const { pickerValues, section, token, ischecking, uuid, distance } = this.state;
    const {
      currentYear: { year, semester },
    } = this.props.currentYear;
    const { subjectsRegistration } = this.props.Subjects;
     const statusReq = this.props.Subjects.status;

    const statusCheckname = this.props.checkname.status;
    // console.log(statusCheckname)
    //  console.log(statusCheckname)
    const subjectsArr = [];
    const sectionArr = [];
    let teacher_name = '';
    let subject_name = '';

    if (ischecking) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }

    if (subjectsRegistration === null) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }

    const subjectApprove = subjectsRegistration.registrations.filter(
      s => s.status === 'APPROVE',
    );
    subjectApprove.map((s, i) => {
      subjectsArr.push({
        label: `${s.subject_code} ${s.subject_name}`,
        value: s.subject_code,
      });
    });
    if (pickerValues !== '') {
      // subject_name = subjectApprove.filter(s=>s.subject_code === pickerValues)[0].subject_name
      // teacher_name = subjectApprove.filter(s=>s.subject_code === pickerValues)[0].section_number
      subjectApprove
        .filter(s => s.subject_code === pickerValues)
        .map((s, i) => {
          sectionArr.push({
            label: `${s.section_number}`,
            value: s.request_id,
          });
        });
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
                  {statusCheckname === 'SUCCESS' && (
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
                        You can check history in MY SUBJECT page.
                      </Text>
                    </View>
                  )}
                  {statusReq === 'FAILURE' && (
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
                        Check your internet or turn on your bluetooth.
                      </Text>
                    </View>
                  )}
                  <View style={{ height: 16 }} />
                  <TouchableHighlight
                    style={styles.btnReq}
                    onPress={() => {
                      this.setState({ modalVisible: !this.state.modalVisible });
                      if (statusReq === 'SUCCESS') {
                        this.props.navigation.navigate('StudentListSubject', {
                          token,
                        });
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
          <View style={styles.styleInputWrapper}>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>SELECT SECTION :</Text>
              <View style={styles.stylePicker}>
                <Picker
                  style={{ height: 45 }}
                  selectedValue={section}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({
                      section: itemValue,
                    });
                  }}>
                  <Picker.Item label="Select Section" value="" />

                  {sectionArr.length > 0 &&
                    sectionArr.map(sec => (
                      <Picker.Item label={sec.label} value={sec.value} />
                    ))}
                </Picker>
              </View>
            </View>
          </View>
          {/* <View style={{display: 'flex', paddingLeft: 16, width: 340}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={(styles.styleLabel, {width: 116, alignSelf: 'center'})}>
                Subject Name :{' '}
              </Text>
              <Text style={{flex: 1}}>{subject_name}</Text>
            </View>
            <View style={{height: 8}}/>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={(styles.styleLabel, {width: 116, alignSelf: 'center'})}>
                Lecturer Name :{' '}
              </Text>
              <Text style={{flex: 1}}>{teacher_name}</Text>
            </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={(styles.styleLabel, {width: 116})}>Date/Time :</Text>
              <Text style={(styles.styleLabel, {flex: 1})}>
                {day} {time}
              </Text>
            </View>
          </View>  */}
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
                // this.handleSubmit(token, section_id);
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
    currentYear: state.yearReducer,
    Subjects: state.subjectReducer,
    checkname: state.checknameReducer
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  GetCurrentYear,
  GetSubjectRegistration,
  Logout,
  Checkname
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
