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
  Table,
  TableWrapper,
  Row,
  Cell,
  TouchableOpacity,
} from 'react-native-table-component';
// import {GetCurrentYear, GetStudentApprove} from '../../../../../../actions';
import {Logout, GetStudentsApprove} from '../../../../../../actions';

const element = (data, index) => (
  <TouchableOpacity onPress={() => this._alertIndex(index)}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>button</Text>
    </View>
  </TouchableOpacity>
);

class ListStudentApprove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: [],
      section: [],
      subject_code: '',
      subject_name: '',
      token: '',
      tableHead: ['NAME', 'STATUS'],
      tableData: [
        ['Phiyada Srikhenkan', 'APPROVE'],
        ['Pensri Wang', 'WAIT'],
        ['Krittaphas Wisessing', 'REJECT'],
        ['Chutimon Khem', 'APPROVE'],
      ],
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

  render() {
    const students = this.props.subjects.studentsInSection;

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
    const studentArr = [];
    // students.students.map(s => {
    //   studentArr.push
    // })
    const state = this.state;

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
          <View style={styles.containerTest}>
            <Table>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.textHeader}
              />
              {students.students.map((s, index) => (
                <TableWrapper style={styles.row}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      margin: 6,
                      width: '100%',
                    }}>
                    <View style={{flex: 1}}>
                      <Text>
                        {s.firstname} {s.lastname}
                      </Text>
                    </View>
                    <View>
                      {s.status === 'APPROVE' ? (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flex: 1,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{color: '#1AB433'}}>{s.status}</Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flex: 1,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TouchableHighlight
                            style={styles.btnApprove}
                            onPress={() => {
                              // NavigationServices.navigate('StudentSubjectRegister');
                            }}>
                            <Text style={{color: 'white', fontSize: 10}}>
                              APPROVE
                            </Text>
                          </TouchableHighlight>
                          <Text>&nbsp;</Text>
                          <TouchableHighlight
                            style={styles.btnDrop}
                            onPress={() => {
                              // NavigationServices.navigate('StudentSubjectRegister');
                            }}>
                            <Text style={{color: 'white', fontSize: 10}}>
                              REJECT
                            </Text>
                          </TouchableHighlight>
                        </View>
                      )}
                    </View>
                  </View>
                </TableWrapper>
                // <TableWrapper key={index} style={styles.row}>
                //   <Text>xxxxx</Text>
                //   {/* {rowData.map((cellData, cellIndex) => (
                //     <Cell
                //       key={cellIndex}
                //       data={cellData}
                //       textStyle={styles.text}
                //     />
                //   ))} */}
                // </TableWrapper>
              ))}
            </Table>
          </View>

          <View style={styles.btnWrapper}>
            <TouchableHighlight
              style={styles.btnCancel}
              onPress={() => this.props.navigation.navigate('StudentApprove')}>
              <Text style={{color: '#949494'}}>BACK</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnReq}
              onPress={() => {
                this.props.navigation.navigate('ListStudentApprove');
                //    this.handleSubmit(token,section_id)
                //    this.setModalVisible(statusReq)
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
  // GetCurrentYear,
  GetStudentsApprove,
  Logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStudentApprove);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    fontFamily: 'Kanit',
    padding: 8,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  containerTest: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
  },
  head: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.3,
    borderColor: '#D0CDCD',
  }, // borderTopLeftRadius: 18, borderTopRightRadius: 18},
  text: {margin: 6, color: '#525252'},
  textHeader: {margin: 6, color: '#000000'},
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.3,
    borderTopWidth: 0,
    borderColor: '#D0CDCD',
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
    top: 20,
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
    height: 22,
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
    height: 22,
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
