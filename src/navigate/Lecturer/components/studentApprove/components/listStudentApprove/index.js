import React, {Component} from 'react';
import {Avatar, ButtonGroup, CheckBox} from 'react-native-elements';
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
  SafeAreaView,
  TouchableOpacity as TouchableOpacityNative,
  FlatList,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  TouchableOpacity,
} from 'react-native-table-component';

// import {GetCurrentYear, GetStudentApprove} from '../../../../../../actions';
import {
  Logout,
  GetStudentsApprove,
  ApproveStudent,
  RejectStudent,
} from '../../../../../../actions';

const Header = props => {
  const {handleApprove, handleReject} = props;

  return (
    <View style={{display: 'flex'}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox />
          <Text>Select 1 item(s)</Text>
        </View>
        <View
          style={
            (styles.customStatus,
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 8,
              flex: 1,
            })
          }>
          <TouchableHighlight
            style={styles.btnApprove}
            onPress={() => {
              handleApprove(s.request_id);
            }}>
            <Text style={{color: 'white', fontSize: 10}}>APPROVE</Text>
          </TouchableHighlight>
          <Text>&nbsp;</Text>
          <TouchableHighlight
            style={styles.btnDrop}
            onPress={() => {
              handleReject(s.request_id);
            }}>
            <Text style={{color: 'white', fontSize: 10}}>REJECT</Text>
          </TouchableHighlight>
        </View>
      </View>
      <>
        <View style={styles.Header}>
          <View style={styles.HeaderWrapper}>
            <Text>NAME</Text>
          </View>
          <View style={styles.HeaderWrapper}>
            <Text>STATUS</Text>
          </View>
          <View style={{width: '4%'}} />
        </View>
      </>
    </View>
  );
};

const StudentList = props => {
  const {
    students,
    handleReject,
    handleApprove,
    handleChecked,
    checkedArr,
  } = props;
  // console.log('students', students);
  return (
    // <ScrollView style={{backgroundColor: '#ffffff'}}>
    <View style={styles.Column}>
      <View style={styles.Wrapper}>
        <View style={styles.Column}>
          <View style={styles.ItemWrapper}>
            {checkedArr !== null &&
              checkedArr.length > 0 &&
              checkedArr.map((s, i) => (
                <View style={styles.Row}>
                  <View style={styles.ListDetail}>
                    <CheckBox
                      checked={s.checked}
                      onPress={() => {
                        handleChecked(i, s.id);
                      }}
                      size={16}
                      textStyle={{fontWeight: '100'}}
                      checkedIcon="check"
                      checkedColor="blue"
                      containerStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FFFFFF',
                        width: '56%',
                      }}
                      // uncheckedColor="blue"
                      title={`${s.firstname} ${s.lastname}`}
                    />
                    {s.status === 'APPROVE' && (
                      <View style={styles.customStatus}>
                        <Text style={{color: '#1AB433'}}>APPROVE</Text>
                      </View>
                    )}
                    {s.status === 'PENDING' && (
                      <View style={styles.customStatus}>
                        <TouchableHighlight
                          style={styles.btnApprove}
                          onPress={() => {
                            handleApprove(s.request_id);
                          }}>
                          <Text style={{color: 'white', fontSize: 10}}>
                            APPROVE
                          </Text>
                        </TouchableHighlight>
                        <Text>&nbsp;</Text>
                        <TouchableHighlight
                          style={styles.btnDrop}
                          onPress={() => {
                            handleReject(s.request_id);
                          }}>
                          <Text style={{color: 'white', fontSize: 10}}>
                            REJECT
                          </Text>
                        </TouchableHighlight>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            <View style={styles.Row}>
              <View style={styles.ListDetail}>
                <CheckBox
                  checked={false}
                  size={16}
                  textStyle={{fontWeight: '100'}}
                  checkedIcon="check"
                  containerStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    width: '56%',
                  }}
                  uncheckedColor="blue"
                  checkedColor="red"
                  title={'Phiyada Srikhenkan'}
                />
                <View style={styles.customStatus}>
                  <TouchableHighlight
                    style={styles.btnApprove}
                    onPress={() => {
                      handleApprove(s.request_id);
                    }}>
                    <Text style={{color: 'white', fontSize: 10}}>APPROVE</Text>
                  </TouchableHighlight>
                  <Text>&nbsp;</Text>
                  <TouchableHighlight
                    style={styles.btnDrop}
                    onPress={() => {
                      handleReject(s.request_id);
                    }}>
                    <Text style={{color: 'white', fontSize: 10}}>REJECT</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
    // </ScrollView>
  );
};

class ListStudentApprove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: [],
      section: [],
      subject_code: '',
      subject_name: '',
      token: '',
      tableHead: ['', 'NAME', '', 'STATUS'],
      checked: [],
      checkedArr: [],
      check: [],
    };
  }

  componentDidMount() {
    const {token, id} = this.props.navigation.state.params;
    const {GetCurrentYear, GetStudentsApprove} = this.props;
    if (!token) {
      this.props.navigation.navigate('Login');
    }
    // GetCurrentYear({
    //   token,
    // });
    GetStudentsApprove({
      token,
      id,
    });
  }

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  handleSubmit = (token, section_id) => {
    // const {RegisterSubject} = this.props
    // RegisterSubject({
    //   token,
    //   section_id,
    // })
  };
  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  handleApprove = idStd => {
    const {token} = this.props.navigation.state.params;
    const {ApproveStudent} = this.props;
    const id = [idStd];
    ApproveStudent({
      id,
      token,
    });
  };

  handleReject = idStd => {
    const {token} = this.props.navigation.state.params;
    const {RejectStudent} = this.props;
    const id = [idStd];
    RejectStudent({
      id,
      token,
    });
  };

  handleChecked = (index, id) => {
    console.log('handleChecked', index, id);
    const {checkedArr} = this.state;
    const newStatus = {checked: !checkedArr[index].checked}
   const test = Object.assign(checkedArr[index],newStatus)
    console.log('test>>',test);
    // this.setState({
    //   checkedArr: [test],
    // });
  };


  render() {
    const students = this.props.subjects.studentsInSection;
    const {checked, checkedArr, check} = this.state;
    if (!students) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }

    const subject = students === null ? '-' : students.subject_name;
    const section = students === null ? '-' : students.section_number;
    // let ss = []
    students.students.map((s, i) => {
      checkedArr[i] = {
        id: s.request_id,
        status: s.status,
        checked: false,
        firstname: s.firstname,
        lastname: s.lastname,
      };
    });
    //  students.students.map((s,i) => {
    //    this.setState({
    //    checkedArr = checkedArr[index] === false
    //  })

    // console.log('check',check)
    console.log('checkedArr', checkedArr);
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
            <Text style={styles.styleHeader}>STUDENTS LIST</Text>
          </View>
          <Text style={(styles.styleLabel, {paddingLeft: 16})}>
            SUBJECT : &nbsp; &nbsp; <Text>{subject}</Text>
          </Text>

          <Text style={(styles.styleLabel, {paddingLeft: 16})}>
            SECTION : &nbsp; &nbsp; <Text>{section}</Text>
          </Text>

          {students.students !== null && students.students.size === 0 ? (
            <View style={styles.NotFound}>
              <Image
                style={styles.CustomImg}
                source={require('../../../../../../../android/statics/images/nodata.png')}
              />
              <Text>There are no students in this class.</Text>
            </View>
          ) : (
            <View style={styles.containerTest}>
              <View style={styles.btnWrapper}>
                <Header
                  handleReject={this.handleReject}
                  handleApprove={this.handleApprove}
                  handleChecked={this.handleChecked}
                  check={check}
                  checkedArr={checkedArr}
                />
              </View>
              <View style={{height: 8}} />
              <StudentList
                students={students.students}
                handleReject={this.handleReject}
                handleApprove={this.handleApprove}
                handleChecked={this.handleChecked}
                check={check}
                checkedArr={checkedArr}
              />
            </View>
          )}
          <View style={styles.btnWrapper}>
            <TouchableHighlight
              style={styles.btnCancel}
              onPress={() => this.props.navigation.navigate('StudentApprove')}>
              <Text style={{color: '#949494'}}>BACK</Text>
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
  // GetCurrentYear,
  ApproveStudent,
  RejectStudent,
  GetStudentsApprove,
  Logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentApprove);

const styles = StyleSheet.create({
  Wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  ItemWrapper: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D0CDCD',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    position: 'relative',
    display: 'flex',
    fontFamily: 'Kanit',
    padding: 8,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  customStatus: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  ListDetail: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  Row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // minHeight: 16,
    width: '100%',
    padding: 4,
  },
  SubjectList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTest: {
    flex: 1,
    padding: 8,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  Column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 6,
    width: '100%',
  },
  head: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.3,
    borderColor: '#D0CDCD',
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
  HeaderWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  Header: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {width: 58, height: 18, backgroundColor: '#FFFFFF', borderRadius: 18},
  btnText: {textAlign: 'center', color: 'black'},
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
  },
  NotFound: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 26,
  },
  ModalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  btnApprove: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C9644',
    borderColor: '#2C9644',
    borderWidth: 1,
    color: '#ffffff',
    width: 54,
    height: 24,
    borderRadius: 21,
  },
  btnDrop: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AA3D3D',
    borderColor: '#AA3D3D',
    borderWidth: 1,
    color: '#ffffff',
    width: 52,
    height: 24,
    borderRadius: 21,
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
