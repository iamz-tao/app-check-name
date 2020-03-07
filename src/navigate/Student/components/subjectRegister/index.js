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

class StudentSubjectRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: [],
      section: [],
      subject_code: '',
      subject_name: '',
    };
  }

  componentDidMount() {
    const {
      LoginReducer: {
        data: {token},
      },
      StudentGetSubjectRegis,
    } = this.props.navigation.state.params;
    if (!token) {
      this.props.navigation.navigate('Login');
    } else {
      StudentGetSubjectRegis({
        token,
      });
    }
  }

  handleSelect = () => {
    const select = this.state.pickerValues;
    if (select === '') {
      alert('Please select!');
    }
    alert(select);
  };

  render() {
    const {pickerValues, section} = this.state;
    const subjects = this.props.Subjects.data;
    const subjectsArr = [];
    const sectionArr = [];
    let teacher_name = '';
    let time = '';
    let day = '';
    let secondTime = '';
    let day2: '';
    if (subjects !== undefined) {
      subjects.map((s, i) => {
        subjectsArr.push({
          label: `${s.Subject.subject_code} ${s.Subject.subject_name}`,
          value: s.Subject.subject_code,
        });
      });
    }
    if (pickerValues.length > 0 && subjects !== undefined) {
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

      // console.log(subjects[index].sections.findIndex(s=> s.section_number === section));
    }
    if (subjects === undefined) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }
    // console.log('subject', subjectsArr);
    // console.log('subjectsArr', sectionArr);
    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <View style={styles.container}>
          <View style={{display: 'flex', alignItems: 'flex-end'}}>
            <TouchableHighlight style={styles.btnLogout}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.containerWrapper}>
            <Text style={styles.styleHeader}>SUBJECT REGISTER</Text>
          </View>
          <Text style={(styles.styleLabel, {paddingLeft: 16})}>
            YEAR / SEMESTER : 2563 / 1
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
                  {subjectsArr.length > 0 &&
                    subjectsArr.map(s => (
                      <Picker.Item label={s.label} value={s.value} />
                    ))}
                  {subjectsArr.length === 0 && (
                    <Picker.Item label="Select Section" value="" />
                  )}
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
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      section: itemValue,
                    })
                  }>
                  {sectionArr.length > 0 &&
                    sectionArr.map(sec => (
                      <Picker.Item label={sec.label} value={sec.value} />
                    ))}
                  {sectionArr.length === 0 && (
                    <Picker.Item label="Select Section" value="" />
                  )}
                </Picker>
              </View>
            </View>
          </View>
          <View style={{display: 'flex', paddingLeft: 16, width: 340}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={(styles.styleLabel, {width: 116, alignSelf: 'center'})}>
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
              <Text style={(styles.styleLabel, {width: 116})}/>
              
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
            <TouchableHighlight style={styles.btnReq}>
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
    Subjects: state.subjectReducer,
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  // Login,
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
