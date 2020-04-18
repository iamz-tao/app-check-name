import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DotsLoader, TextLoader} from 'react-native-indicator';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Picker,
  Modal,
  Image,
} from 'react-native';
import SettingSection from './components/settingSection';

import {
  GetCurrentYear,
  Logout,
  GetSubjectOpenSection,
  OpenSection as LecturerOpenSection,
} from '../../../../actions';

class OpenSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: '',
      modalVisible: false,
      modalVisibleSubmit: false,
      late_time: '',
      absent_time: '',
      total_mark: '',
      section_number: '',
      sday: '',
      fday: '',
      e_time: '',
      s_time: '',
      e_time2: '',
      s_time2: '',
    };
  }

  componentDidMount() {
    const {token} = this.props.navigation.state.params;
    const {GetSubjectOpenSection, GetCurrentYear} = this.props;
    if (!token) {
      this.props.navigation.navigate('Login');
    }
    GetCurrentYear({
      token,
    });
    GetSubjectOpenSection({
      token,
    });
  }

  setModalSubmit() {
    this.setState({modalVisibleSubmit: true});
  }

  setModalVisible() {
    this.setState({modalVisible: true});
  }

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  setModalVisible = () => {
    const {modalVisible} = this.state;
    this.setState({modalVisible: !modalVisible});
  };

  handleSetting = data => {
    const {modalVisible} = this.state;
    const {fday, sday, s_time, e_time, s_time2, e_time2} = data;
    this.setState({
      modalVisible: !modalVisible,
      fday,
      sday,
      s_time,
      e_time,
      s_time2,
      e_time2,
    });
  };

  handleSubmit = () => {
    const {
      pickerValues,
      late_time,
      absent_time,
      total_mark,
      section_number,
      fday,
      sday,
      s_time,
      e_time,
      s_time2,
      e_time2,
    } = this.state;
    const {
      currentYear: {year, semester},
    } = this.props.currentYear;
    const students = this.props.subjects.subjects;
    const {token} = this.props.navigation.state.params;
    const {LecturerOpenSection} = this.props;
    const Subject = students.filter(s => s.id === pickerValues)[0];
    let Time = [];
    if (
      s_time !== null &&
      e_time !== null &&
      s_time2 === null &&
      e_time2 === null
    ) {
      Time = [
        {
          day: fday,
          start_time: s_time,
          end_time: e_time,
        },
      ];
    }
    if (
      s_time !== null &&
      e_time !== null &&
      s_time2 !== null &&
      e_time2 !== null
    ) {
      Time = [
        {
          day: fday,
          start_time: s_time,
          end_time: e_time,
        },
        {
          day: sday,
          start_time: s_time2,
          end_time: e_time2,
        },
      ];
    }

    const payload = {
      year,
      semester,
      Subject: {
        approved_status: Subject.approved_status,
        subject_code: Subject.subject_code,
        subject_name: Subject.subject_name,
      },
      section_number,
      Time,
      time_late: late_time,
      time_absent: absent_time,
      total_mark,
    };
    // console.log(payload)
    LecturerOpenSection({
      token,
      payload,
    });
  };

  render() {
    const {
      pickerValues,
      modalVisible,
      modalVisibleSubmit,
      fday,
      sday,
      s_time,
      e_time,
      s_time2,
      e_time2,
    } = this.state;
    const {token} = this.props.navigation.state.params;
    const subjects = this.props.subjects.subjects;
    const statusReq = this.props.subjects.status;
    const {
      currentYear: {year, semester},
    } = this.props.currentYear;
    if (subjects === null) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }
    // console.log(e_time);
    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <View>
          <Modal
            animationType="slide"
            // transparent={false}
            visible={this.state.modalVisibleSubmit}
            presentationStyle="pageSheet">
            <View style={styles.ModalWrapper}>
              <View style={styles.DetailModalSuccessWrapper}>
                <View style={{width: '100%', alignItems: 'center'}}>
                  {statusReq !== null && statusReq === 'SUCCESS' && (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        style={styles.CustomImg}
                        source={require('../../../../../android/statics/images/success.png')}
                      />
                      <View style={{height: 36}} />
                      <Text style={styles.styleLabelFail}>
                        OPEN SECTION SUCCEEDED
                      </Text>
                      <Text style={styles.styleLabel}>
                        You can check list of subjects you teach in MY SUBJECTS
                        page.
                      </Text>
                    </View>
                  )}
                  {statusReq !== null && statusReq === 'FAILURE' && (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        style={styles.CustomImg}
                        source={require('../../../../../android/statics/images/icon-failure.png')}
                      />
                      <View style={{height: 36}} />
                      <Text style={styles.styleLabelFail}>
                        OPEN SECTION FAILED
                      </Text>
                      <Text style={styles.styleLabel}>
                        Error: Could not handle the request.
                      </Text>
                    </View>
                  )}
                  <View style={{height: 16}} />
                  <TouchableHighlight
                    style={styles.btnReq}
                    onPress={() => {
                      this.setState({modalVisibleSubmit: !modalVisibleSubmit});
                      this.props.navigation.navigate('MySubject', {
                        token,
                      });
                    }}>
                    <Text style={{color: 'white'}}>OK</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <SettingSection
          setModalVisible={this.setModalVisible}
          modalVisible={modalVisible}
          handleSetting={this.handleSetting}
        />
        <View style={styles.container}>
          <View style={{display: 'flex', alignItems: 'flex-end'}}>
            <TouchableHighlight
              style={styles.btnLogout}
              onPress={() => this.handleLogout()}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.containerWrapper}>
            <Text style={styles.styleHeader}>OPEN SECTION</Text>
          </View>
          <Text style={(styles.styleLabel, {paddingLeft: 16})}>
                  YEAR / SEMESTER :{' '}{year} / {semester}
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
                  <Picker.Item label={'Select Subject'} />

                  {subjects !== null &&
                    subjects.map(s => (
                      <Picker.Item
                        label={`${s.subject_code} ${s.subject_name}`}
                        value={s.id}
                      />
                    ))}
                </Picker>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={{flex: 1, paddingBottom: 12}}>
                <Text style={styles.styleLabel}>LATE TIME (Minutes) :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Late Time"
                  onChangeText={late_time => this.setState({late_time})}
                />
              </View>
              <View style={{flex: 1, paddingBottom: 12}}>
                <Text style={styles.styleLabel}>ABSENT TIME (Minutes) :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Absent Time"
                  onChangeText={absent_time => this.setState({absent_time})}
                />
              </View>
              <View style={{flex: 1, paddingBottom: 12}}>
                <Text style={styles.styleLabel}>TOTAL MARK :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Total Mark"
                  onChangeText={total_mark => this.setState({total_mark})}
                />
              </View>
              <View style={{flex: 1, paddingBottom: 12}}>
                <Text style={styles.styleLabel}>SECTION NUMBER :</Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Section Number"
                    onChangeText={section_number =>
                      this.setState({section_number})
                    }
                  />
                  <Text>&nbsp;</Text>
                  <TouchableHighlight
                    style={styles.btnSetting}
                    onPress={() => this.setModalVisible()}>
                    <Text style={{color: '#FFFFFF', fontSize: 10}}>
                      SETTING
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>

          <View style={{display: 'flex', paddingLeft: 36, width: '100%'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={(styles.styleLabel, {flex: 1, alignSelf: 'center'})}>
                DETAIL :{' '}
              </Text>
              {fday !== null &&
                e_time !== 'null:undefined null' &&
                s_time !== 'null:undefined null' && (
                  <Text style={{flex: 3}}>
                    {fday} {s_time} - {e_time}
                  </Text>
                )}
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={(styles.styleLabel, {flex: 1, alignSelf: 'center'})}
              />
              {sday !== null &&
                e_time2 !== 'null:undefined null' &&
                s_time2 !== 'null:undefined null' && (
                  <Text style={{flex: 3}}>
                    {sday} {s_time2} - {e_time2}
                  </Text>
                )}
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <TouchableHighlight
              style={styles.btnCancel}
              onPress={() =>
                this.props.navigation.navigate('LecturerHomePage')
              }>
              <Text style={{color: '#949494'}}>CANCEL</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnReq}
              onPress={() => {
                this.handleSubmit();
                this.setModalSubmit();
              }}>
              <Text style={{color: 'white'}}>OPEN</Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              marginTop: 14,
            }}>
            <TouchableHighlight
              style={styles.buttonAddSubject}
              onPress={() =>
                this.props.navigation.navigate('CreateSubject', {token})
              }>
              <Text style={{textDecorationLine: 'underline', color: '#738497'}}>
                New Subject?
              </Text>
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
    subjects: state.subjectReducer,
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  GetCurrentYear,
  GetSubjectOpenSection,
  Logout,
  LecturerOpenSection,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenSection);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    fontFamily: 'Kanit',
    padding: 8,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  loadingWrapper: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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
  CustomImg: {
    width: 116,
    height: 116,
    top: 20,
  },
  styleLabelFail: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 21,
    display: 'flex',
    paddingLeft: 12,
    color: '#CA5353',
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
  btnSetting: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginRight: 8,
    borderWidth: 1,
    backgroundColor: '#006765',
    borderColor: '#006765',
    color: '#FFFFFF',
    width: 56,
    height: 40,
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
  buttonAddSubject: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 150,
    borderRadius: 30,
  },
});
