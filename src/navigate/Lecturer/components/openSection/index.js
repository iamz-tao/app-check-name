import React, {Component} from 'react';
import {Avatar, ButtonGroup} from 'react-native-elements';
import {connect} from 'react-redux';
import {DotsLoader, TextLoader} from 'react-native-indicator';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableHighlight,
  Picker,
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
    const {GetSubjectOpenSection} = this.props;
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

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  setModalVisible = () => {
    const {modalVisible} = this.state;
    this.setState({modalVisible: !modalVisible});
  };

  handleSetting = (data) => {
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
    const students = this.props.subjects.subjects;
    const {token} = this.props.navigation.state.params;
    const {LecturerOpenSection} = this.props
    const Subject = students.filter(s => s.id === pickerValues);
    const Time = [];
    if (s_time2 !== null && e_time2 !== null) {
      Time.push([
        {
          day: fday,
          start_time: s_time,
          end_time: e_time,
        },
      ]);
    } else {
      Time.push([
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
      ]);
    }

    const payload = {
      Subject,
      section_number,
      Time,
      time_late: late_time,
      time_absent: absent_time,
      total_mark,
    };
    // LecturerOpenSection({
    //   token,
    //   payload,
    // })
  }

  render() {
    const {pickerValues, modalVisible} = this.state;
    const {token} = this.props.navigation.state.params;
    const subjects = this.props.subjects.subjects;
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

    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
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
                  onChangeText={firstname => this.setState({firstname})}
                />
              </View>
              <View style={{flex: 1, paddingBottom: 12}}>
                <Text style={styles.styleLabel}>ABSENT TIME (Minutes) :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Absent Time"
                  onChangeText={firstname => this.setState({firstname})}
                />
              </View>
              <View style={{flex: 1, paddingBottom: 12}}>
                <Text style={styles.styleLabel}>TOTAL MARK :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Total Mark"
                  onChangeText={firstname => this.setState({firstname})}
                />
              </View>
              <View style={{flex: 1, paddingBottom: 12}}>
                <Text style={styles.styleLabel}>SECTION NUMBER :</Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Section Number"
                    onChangeText={firstname => this.setState({firstname})}
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
              <Text style={{flex: 2}}>Th 09.00 AM - 10.30 AM</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={(styles.styleLabel, {flex: 1, alignSelf: 'center'})}
              />
              <Text style={{flex: 2}}>Tue 10.30 AM - 12.00 PM</Text>
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
            <TouchableHighlight style={styles.btnReq}>
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
