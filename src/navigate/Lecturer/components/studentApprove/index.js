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
} from 'react-native';

import {GetCurrentYear, GetSubjectsApprove, Logout} from '../../../../actions';

class StudentApprove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: '',
      section: '',
      subject_code: '',
      subject_name: '',
    };
  }

  componentDidMount() {
    const {token} = this.props.navigation.state.params;
    const {GetCurrentYear, GetSubjectsApprove} = this.props;
    if (!token) {
      this.props.navigation.navigate('Login');
    }
    GetCurrentYear({
      token,
    });
    GetSubjectsApprove({
      token,
    });
  }

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };


  render() {
    const {pickerValues, section} = this.state;
    const {token} = this.props.navigation.state.params;
    const {
      currentYear: {year, semester},
    } = this.props.currentYear;
    const subjects = this.props.subjects.subjectsApprove;
    const {fetching} = this.props.subjects;
    const subjectsArr = [];
    const sectionArr = [];
    const sem = semester === 'SECOND' ? 2 : semester === 'FIRST' ? 1 : 'SUMMER';
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
        .filter(s => s.Subject.subject_code === pickerValues)[0].
        sections.map((sec, i) => {
          sectionArr.push({
            label: sec.section_number,
            value: sec.id,
          });
        });
    }

    if (fetching || !subjects) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }
   
    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <View style={styles.container}>
          <View style={{display: 'flex', alignItems: 'flex-end'}}>
            <TouchableHighlight
              style={styles.btnLogout}
              onPress={() => {
                this.handleLogout();
              }}>
              <Text style={{color: 'white' }}>Logout</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.containerWrapper}>
            <Text style={styles.styleHeader}>STUDENT APPROVE</Text>
          </View>
          <Text style={(styles.styleLabel, {paddingLeft: 16})}>
            YEAR / SEMESTER : {year} / {sem}
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
          <View style={styles.btnWrapper}>
            <TouchableHighlight
              style={styles.btnCancel}
              onPress={() =>
                this.props.navigation.navigate('Lecturer Home Page')
              }>
              <Text style={{color: '#949494'}}>BACK</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnReq}
              disabled={pickerValues === '' || section === ''}
              onPress={() => {
                this.props.navigation.navigate('List of Students',{
                  id: section,
                  token,
                });
              }}>
              <Text style={{color: 'white'}}>OK</Text>
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
  GetSubjectsApprove,
  Logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentApprove);

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
