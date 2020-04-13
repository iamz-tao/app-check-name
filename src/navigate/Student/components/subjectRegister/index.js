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
  Modal,
  Image,
} from 'react-native';

import {
  RegisterSubject,
  Logout,
  GetCurrentYear,
  StudentGetSubjectRegis,
} from '../../../../actions';

class StudentSubjectRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: [],
      section: [],
      subject_code: '',
      subject_name: '',
      token: '',
      modalVisible: false,
    };
  }

  componentDidMount() {
    const {
      LoginReducer: {
        data: {token},
      },
      // StudentGetSubjectRegis,
    } = this.props.navigation.state.params;
    const {StudentGetSubjectRegis, GetCurrentYear} = this.props;
    if (!token) {
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        token,
      });
      GetCurrentYear({
        token,
      });
      StudentGetSubjectRegis({
        token,
      });
    }
  }

  setModalVisible() {
      this.setState({modalVisible: true});
  }

  handleSelect = () => {
    const select = this.state.pickerValues;
    if (select === '') {
      alert('Please select!');
    }
    alert(select);
  };

  handleSubmit = (token, section_id) => {
    const {RegisterSubject} = this.props;
    RegisterSubject({
      token,
      section_id,
    });
  };

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  render() {
    const {pickerValues, section, token} = this.state;
    const {
      currentYear: {year, semester},
    } = this.props.currentYear;
    const {subjects} = this.props.Subjects;
    const statusReq = this.props.Subjects.status;
    const subjectsArr = [];
    const sectionArr = [];
    let teacher_name = '';
    let time = '';
    let day = '';
    let secondTime = '';
    let day2: '';
    let section_id: '';
    if (subjects !== null) {
      subjects.map((s, i) => {
        subjectsArr.push({
          label: `${s.Subject.subject_code} ${s.Subject.subject_name}`,
          value: s.Subject.subject_code,
        });
      });
    }
    if (pickerValues.length > 0 && subjects !== null) {
      const {section} = this.state;
      const index = subjects.findIndex(
        s => s.Subject.subject_code === pickerValues,
      );
      subjects[index].sections.map(sec => {
        sectionArr.push({
          label: sec.section_number,
          value: sec.section_number,
        });
      });
      const secIndex = subjects[index].sections.findIndex(
        s => s.section_number === section,
      );

      if (secIndex > -1) {
        section_id = subjects[index].sections[secIndex].id;
        teacher_name = subjects[index].sections[secIndex].teacher_name;
        time = `${subjects[index].sections[secIndex].Time[0].start_time} - ${
          subjects[index].sections[secIndex].Time[0].end_time
        }`;
        day = subjects[index].sections[secIndex].Time[0].day;
        if (subjects[index].sections[secIndex].Time.length > 1) {
          secondTime = `${
            subjects[index].sections[secIndex].Time[1].start_time
          } - ${subjects[index].sections[secIndex].Time[1].end_time}`;
          day2 = subjects[index].sections[secIndex].Time[1].day;
        }
      }
    }
    if (subjects === null || statusReq === null) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }
    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            presentationStyle="pageSheet">
            <View style={styles.ModalWrapper}>
              <View style={styles.DetailModalSuccessWrapper}>
                <View style={{width: '100%', alignItems: 'center'}}>
                  {statusReq === 'SUCCESS' && (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        style={styles.CustomImg}
                        source={require('../../../../../android/statics/images/success.png')}
                      />
                      <View style={{height: 36}} />
                      <Text style={styles.styleLabelFail}>
                        SUBJECT REGISTER SUCCESS
                      </Text>
                      <Text style={styles.styleLabel}>
                        You have permission to check name in this subject.
                      </Text>
                    </View>
                  )}
                  {statusReq === 'FAILURE' && (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        style={styles.CustomImg}
                        source={require('../../../../../android/statics/images/icon-failure.png')}
                      />
                      <View style={{height: 36}} />
                      <Text style={styles.styleLabelFail}>
                        SUBJECT REGISTER FAILED
                      </Text>
                      <Text style={styles.styleLabel}>
                        You have already registered with subject.
                      </Text>
                    </View>
                  )}
                  <View style={{height: 16}} />
                  <TouchableHighlight
                    style={styles.btnReq}
                    onPress={() => {
                      this.setState({modalVisible: !this.state.modalVisible});
                      if (statusReq === 'SUCCESS') {
                        this.props.navigation.navigate('StudentListSubject',{
                          token,
                        })
                      }
                    }}>
                    <Text style={{color: 'white'}}>OK</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
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
            <Text style={styles.styleHeader}>SUBJECT REGISTER</Text>
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
          <View style={{display: 'flex', paddingLeft: 16, width: 340}}>
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
            <View style={{flexDirection: 'row'}}>
              <Text style={(styles.styleLabel, {width: 116})} />

              <Text style={(styles.styleLabel, {flex: 1})}>
                {day2} {secondTime}
              </Text>
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <TouchableHighlight
              style={styles.btnCancel}
              onPress={() => this.props.navigation.navigate('StudentHomePage')}>
              <Text style={{color: '#949494'}}>CANCEL</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnReq}
              onPress={() => {
                this.handleSubmit(token, section_id);
                this.setModalVisible();
              }}>
              <Text style={{color: 'white'}}>REQUEST</Text>
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
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  GetCurrentYear,
  RegisterSubject,
  StudentGetSubjectRegis,
  Logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentSubjectRegister);

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
