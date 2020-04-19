import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DotsLoader, TextLoader} from 'react-native-indicator';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  Picker,
  Image,
  TextInput,
} from 'react-native';
import {CheckBox} from 'react-native-elements';

import {Table, TableWrapper} from 'react-native-table-component';
import SuccessModal from '../../../../components/successModal';

import {
  GetCurrentYear,
  Logout,
  GetSubjectsApprove,
  GetAllBeacon,
  OpenClass as LecturerOpenClass,
  GetClass,
  getAttandance,
} from '../../../../actions';

const Header = props => {
  return (
    <View style={{display: 'flex'}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={styles.Header}>
          <View style={(styles.HeaderWrapper, {width: 96})}>
            <Text style={{paddingLeft: 8}}>ID</Text>
          </View>
          <View style={styles.HeaderWrapper}>
            <Text>NAME</Text>
          </View>
          <View style={(styles.HeaderWrapper, {width: 56, paddingLeft: 8})}>
            <Text>TIME</Text>
          </View>
          <View style={(styles.HeaderWrapper, {width: 50})}>
            <Text>STATUS</Text>
          </View>
          {/* <View style={{width: '4%'}} /> */}
        </View>
      </View>
    </View>
  );
};

class OpenClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: '',
      section_id: '',
      subject_code: '',
      subject_name: '',
      token: '',
      beacon_id: '',
      modalVisible: false,
      tableHead: ['ID', '', 'NAME', 'STATUS'],
      checked: false,
      distance: 3,
      class_id: null,
    };
  }

  componentDidMount() {
    const {token} = this.props.navigation.state.params;
    const {class_id} = this.state;
    const {
      GetCurrentYear,
      GetSubjectsApprove,
      GetAllBeacon,
      GetClass,
      getAttandance,
    } = this.props;
    if (!token) {
      this.props.navigation.navigate('Login');
    }
    GetCurrentYear({
      token,
    });
    GetSubjectsApprove({
      token,
    });
    GetAllBeacon({
      token,
    });
    GetClass({token});

    if (class_id) {
      getAttandance({
        class_id,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.subjects.openClass && props.subjects.openClass.length > 0) {
      const class_id = props.subjects.openClass[0].class_id;
      return {class_id: class_id};
    }
  }

  handleSubmit = (section_id, beacon_id) => {
    const {token} = this.props.navigation.state.params;
    const {LecturerOpenClass, GetClass} = this.props;
    const {distance} = this.state;
    const payload = {
      section_id,
      beacon_id,
      distance,
    };

    LecturerOpenClass({
      token,
      payload,
    });
    GetClass({token});
  };

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  setModalVisible = () => {
    const {token} = this.props.navigation.state.params;
    const {GetAllBeacon} = this.props;
    const {modalVisible} = this.state;
    this.setState({
      modalVisible: !modalVisible,
      section_id: '',
      beacon_id: '',
      pickerValues: '',
    });
    GetAllBeacon({
      token,
    });
  };

  handleChecked = () => {
    const {checked, distance} = this.state;
    this.setState({
      checked: !checked,
    });
    if (checked) {
      this.setState({
        distance: 3,
      });
    }
  };

  render() {
    const {
      pickerValues,
      section_id,
      beacon_id,
      modalVisible,
      checked,
    } = this.state;
    const {
      currentYear: {year, semester},
      fetching,
    } = this.props.currentYear;
    const subjects = this.props.subjects.subjectsApprove;
    const {
      studentsAttendance: {users},
      studentsAttendance,
    } = this.props;
    const {beacons, status, openClass} = this.props.subjects;
    const subjectsArr = [];
    const sectionArr = [];
    const beaconArr = [];

    if (subjects !== null) {
      subjects.map((s, i) => {
        subjectsArr.push({
          label: `${s.Subject.subject_code} ${s.Subject.subject_name}`,
          value: s.Subject.subject_code,
        });
      });
    }

    if (subjects !== null && pickerValues !== '') {
      subjects
        .filter(s => s.Subject.subject_code === pickerValues)[0]
        .sections.map((s, i) => {
          sectionArr.push({
            label: `${s.section_number}`,
            value: s.id,
          });
        });
    }
    if (beacons) {
      beacons
        .filter(beacon => beacon.status === 'DISABLE')
        .map(b => {
          beaconArr.push({
            label: b.name,
            value: b.id,
          });
        });
    }
    
    // console.log('users',studentsAttendance.users.length)

    if (!subjects) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }
    if (subjects && !openClass) {
      <View style={styles.loadingWrapper}>
        <DotsLoader color="#CA5353" />
        <TextLoader text="Loading" />
      </View>;
    }

    if (subjects && openClass && !studentsAttendance.users) {
      <View style={styles.loadingWrapper}>
        <DotsLoader color="#CA5353" />
        <TextLoader text="Loading" />
      </View>;
    }

    if (openClass !== null && openClass.length > 0) {
      const name = this.props.subjects.openClass[0].Lecturer_name;
      return (
        <ScrollView style={{backgroundColor: '#ffffff'}}>
          <View style={styles.container}>
            <View style={{display: 'flex', alignItems: 'flex-end'}}>
              <TouchableHighlight
                style={styles.btnLogout}
                onPress={() => {
                  this.handleLogout();
                }}>
                <Text style={{color: 'white'}}>Logout</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.containerWrapper}>
              <Text style={styles.styleHeader}>ATTENDANCE ROLL</Text>
            </View>
            <Text style={(styles.styleLabel, {paddingLeft: 16})}>
              YEAR : {year} / {semester}
            </Text>
            <Text style={(styles.styleLabel, {paddingLeft: 16})}>
              LECTURER : {name}
            </Text>
            {studentsAttendance.users !== null &&
              studentsAttendance.users.length === 0 && (
                <View style={styles.NotFound}>
                  <Image
                    style={styles.CustomImg}
                    source={require('../../../../../android/statics/images/nodata.png')}
                  />
                  <View style={{height: 4}} />
                  <Text>There aren't students attendance in this class.</Text>
                </View>
              )}
            {studentsAttendance.users !== null &&
              studentsAttendance.users.length > 0 && (
                <View style={styles.containerTest}>
                  <Table>
                    <Header />
                    {users.map((s, index) => (
                      <TableWrapper style={styles.row}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: 6,
                            width: '100%',
                          }}>
                          <View style={{width: 86}}>
                            <Text>{s.id}</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text>
                              {s.firstname} {s.lastname}
                            </Text>
                          </View>
                          <View style={{width: 58, paddingLeft: 8}}>
                            <Text>{s.time}</Text>
                          </View>
                          <View style={{width: 66}}>
                            {s.status === 'ABSENT' && (
                              <Text style={{color: '#FF0000'}}>Absent</Text>
                            )}
                            {s.status === 'LATE' && (
                              <Text style={{color: '#0029FF'}}>Late</Text>
                            )}
                            {s.status === 'ONTIME' && (
                              <Text style={{color: '#green'}}>On Time</Text>
                            )}
                          </View>
                        </View>
                      </TableWrapper>
                    ))}
                  </Table>
                </View>
              )}
            <View style={styles.btnWrapper}>
              <TouchableHighlight
                style={styles.btnCancel}
                onPress={() =>
                  this.props.navigation.navigate('Lecturer Home Page')
                }>
                <Text style={{color: '#949494'}}>BACK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{backgroundColor: '#ffffff'}}>
          <SuccessModal
            msg={
              status === 'SUCCESS'
                ? 'Open Class Succeeded.'
                : 'Open Class Failed.'
            }
            setModalVisible={this.setModalVisible}
            modalVisible={modalVisible}
            status={status}
            path={'Lecturer Home Page'}
          />
          <View style={styles.container}>
            <View style={{display: 'flex', alignItems: 'flex-end'}}>
              <TouchableHighlight
                style={styles.btnLogout}
                onPress={() => {
                  this.handleLogout();
                }}>
                <Text style={{color: 'white'}}>Logout</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.containerWrapper}>
              <Text style={styles.styleHeader}>OPEN CLASS</Text>
            </View>
            <Text style={(styles.styleLabel, {paddingLeft: 16})}>
              YEAR / SEMESTER : {year} / {semester}
            </Text>
            <View style={styles.styleInputWrapper}>
              <View style={styles.inputContainer}>
                <Text style={styles.styleLabel}>SELECT SUBJECT :</Text>
                <View style={styles.stylePicker}>
                  <Picker
                    style={{height: 45}}
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
                    style={{height: 45}}
                    selectedValue={section_id}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        section_id: itemValue,
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
            <View style={styles.styleInputWrapper}>
              <View style={styles.inputContainer}>
                <Text style={styles.styleLabel}>SELECT BEACON :</Text>
                <View style={styles.stylePicker}>
                  <Picker
                    style={{height: 45}}
                    selectedValue={beacon_id}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        beacon_id: itemValue,
                      });
                    }}>
                    <Picker.Item label="Select Beacon" value="" />

                    {beaconArr.length > 0 &&
                      beaconArr.map(sec => (
                        <Picker.Item label={sec.label} value={sec.value} />
                      ))}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={{marginTop: 0, marginLeft: 28}}>
              <View style={(styles.inputContainer, {flexDirection: 'row'})}>
                <Text style={{display: 'flex', lineHeight: 66}}>
                  CUSTOM DISTANCE :
                </Text>
                <CheckBox
                  checked={checked}
                  onPress={() => {
                    this.handleChecked();
                  }}
                  // size={10}
                  // style={{flex: 1}}
                  textStyle={{fontWeight: '100'}}
                  containerStyle={styles.containerCheckbox}
                  uncheckedColor="black"
                  uncheckedIcon={
                    <Image
                      source={require('../../../../../android/statics/images/unchecked.jpg')}
                      style={{width: 30, height: 30}}
                    />
                  }
                  checkedIcon={
                    <Image
                      source={require('../../../../../android/statics/images/check.png')}
                      style={{width: 30, height: 30}}
                    />
                  }
                />
                <Text
                  style={{
                    display: 'flex',
                    color: '#A8A3A3',
                    fontSize: 10,
                    lineHeight: 66,
                  }}>
                  Default 3 m.
                </Text>
              </View>
              {checked === true && (
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <TextInput
                    style={styles.inputs}
                    placeholder="1-70 m."
                    onChangeText={distance => this.setState({distance})}
                  />
                </View>
              )}
            </View>
            <View style={styles.btnWrapper}>
              <TouchableHighlight
                style={styles.btnCancel}
                onPress={() =>
                  this.props.navigation.navigate('Lecturer Home Page')
                }>
                <Text style={{color: '#949494'}}>CANCEL</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.btnReq}
                disabled={
                  beacon_id === '' || section_id === '' || pickerValues === ''
                }
                onPress={() => {
                  this.handleSubmit(section_id, beacon_id);
                  this.setModalVisible();
                }}>
                <Text style={{color: 'white'}}>OPEN</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

//use to add reducer state to props
const mapStateToProps = state => {
  return {
    studentsAttendance: state.teachHistoryReducer,
    currentYear: state.yearReducer,
    subjects: state.subjectReducer,
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  GetSubjectsApprove,
  GetCurrentYear,
  GetAllBeacon,
  LecturerOpenClass,
  GetClass,
  Logout,
  getAttandance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenClass);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    fontFamily: 'Kanit',
    padding: 8,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  containerCheckbox: {
    backgroundColor: '#FFFFFF',
    // borderColor: '#D0CDCD',
    // borderWidth: 1,
    // borderRadius: 10,
  },
  containerTest: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
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
  text: {margin: 6, color: '#525252'},
  textHeader: {margin: 6, color: '#000000'},
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.3,
    borderTopWidth: 0,
    borderColor: '#D0CDCD',
  },
  NotFound: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 26,
  },
  HeaderWrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },
  Header: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 12,
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
    marginBottom: 8,
    flexDirection: 'column',
    display: 'flex',
  },
  inputs: {
    height: 45,
    width: 300,
    borderWidth: 1,
    borderColor: 'rgba(36, 52, 69, 0.5)',
    borderRadius: 21,
    paddingLeft: 10,
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
