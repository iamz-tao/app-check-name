import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DotsLoader, TextLoader} from 'react-native-indicator';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
} from 'react-native-table-component';
// import {GetCurrentYear, GetStudentApprove} from '../../../../../../actions';
import {Logout, GetCurrentYear, GetSubjectsApprove} from '../../../../actions';

class ListMySubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: [],
      section: [],
      subject_code: '',
      subject_name: '',
      token: '',
      tableHead: ['SUBJECT', '', 'SECTION'],
    };
  }

  componentDidMount() {
    const {token} = this.props.navigation.state.params;
    if (!token) {
      this.props.navigation.navigate('Login');
    }
    const {GetCurrentYear, GetSubjectsApprove} = this.props;
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
    const state = this.state;
    const {
      data: {
        user: {displayName},
      },
    } = this.props.user;
    const subjects = this.props.subjects.subjectsApprove;
    if (this.props.currentYear === [] || !subjects) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }

    const {
      currentYear: {year, semester},
    } = this.props.currentYear;
    // console.log('subjects',subjects)
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
            <Text style={styles.styleHeader}>MY SUBJECT</Text>
          </View>
          <Text style={(styles.styleLabel, {paddingLeft: 16})}>
            YEAR : &nbsp; &nbsp; {year} / {semester}
          </Text>

          <Text style={(styles.styleLabel, {paddingLeft: 16})}>
            LECTURER NAME : &nbsp; &nbsp; {displayName}
          </Text>

          {subjects !== null && subjects.lenght === 0 ? (
            <View style={styles.NotFound}>
              <Image
                style={styles.CustomImg}
                source={require('../../../../../android/statics/images/nodata.png')}
              />
              <Text>There are no students in this class.</Text>
            </View>
          ) : (
            <View style={styles.containerTest}>
              <Table>
                <Row
                  data={state.tableHead}
                  style={styles.head}
                  textStyle={styles.textHeader}
                />
                {subjects.map((s, index) => (
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
                          {s.Subject.subject_code} {s.Subject.subject_name}
                        </Text>
                      </View>
                      <View style={{width: 76}}>
                        {s.sections.map(sec => (
                          <Text>{sec.section_number}</Text>
                        ))}
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
                this.props.navigation.navigate('LecturerHomePage')
              }>
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
    user: state.loginReducer,
    subjects: state.subjectReducer,
    currentYear: state.yearReducer,
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  GetCurrentYear,
  Logout,
  GetSubjectsApprove,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMySubject);

const styles = StyleSheet.create({
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
  btn: {
    width: 58,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
  },
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