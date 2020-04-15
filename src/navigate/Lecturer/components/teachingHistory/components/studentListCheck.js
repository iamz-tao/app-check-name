import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DotsLoader, TextLoader} from 'react-native-indicator';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import {Logout, GetStudentChecknameInClass} from '../../../../../actions';

class StudentListCheck extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {token, class_id} = this.props.navigation.state.params;
    const {GetStudentChecknameInClass} = this.props;
    if (!token) {
      this.props.navigation.navigate('Login');
    }
    GetStudentChecknameInClass({
      token,
      class_id,
    });
  }

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  render() {
    const {subject_name, date, time} = this.props.navigation.state.params;
    const {fetching, stdInClass} = this.props.teachingHistory;
    if ((fetching, !stdInClass)) {
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
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.containerWrapper}>
            <Text style={styles.styleHeader}>LIST OF STUDENTS</Text>
          </View>
          <View style={{marginLeft: 16}}>
            <Text>SUBJECT NAME : {subject_name}</Text>
            <Text>DATE : {date}</Text>
              <Text>TIME : 
                {time.includes('OPENING') ? (
                  <Text style={{color: '#1AB433'}}>{' '}Opening</Text>
                ):(
                  <Text>{time}</Text>
                )}
                </Text>
            <Text>AMOUNT : {stdInClass.amount}</Text>
          </View>
          <View style={{height: 16}} />
          <View style={styles.StyleWrapper}>
            <View style={styles.ViewWrapper}>
              <View style={styles.ViewHeader}>
                <Text style={{flex: 1.5}}>ID</Text>
                <Text style={{flex: 2, paddingLeft: 3}}>NAME</Text>
                <Text style={{flex: 1, paddingLeft: 3}}>TIME</Text>
                <Text style={{flex: 1}}>STATUS</Text>
              </View>
              {stdInClass.students !== null &&
                stdInClass.students.length === 0 && (
                  <View style={(styles.StyleRow, {alignItems: 'center'})}>
                    <Text>There're no student checked name in this class.</Text>
                  </View>
                )}
              {stdInClass.students !== null &&
                stdInClass.students.length > 0 &&
                stdInClass.students.map(s => (
                  <View style={styles.StyleRow}>
                    <Text style={{flex: 1.5}}>{s.id}</Text>
                    <Text style={{flex: 2, paddingLeft: 3, overflow: 'hidden'}} numberOfLines={1}>
                      {s.firstname} {s.lastname}
                    </Text>
                    <Text style={{flex: 1, paddingLeft: 3}}>{s.time}</Text>
                    {s.status === 'ONTIME' && (
                      <Text style={{flex: 1, color: '#1AB433'}}>On Time</Text>
                    )}
                    {s.status === 'LATE' && (
                      <Text style={{flex: 1, color: '#0029FF'}}>Late</Text>
                    )}
                    {s.status === 'ABSENT' && (
                      <Text style={{flex: 1, color: '#FF0000'}}>Absent</Text>
                    )}
                  </View>
                ))}
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <TouchableHighlight
              style={styles.btnCancel}
              onPress={() => this.props.navigation.navigate('TeachingHistory')}>
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
    teachingHistory: state.teachHistoryReducer,
    currentYear: state.yearReducer,
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  GetStudentChecknameInClass,
  Logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentListCheck);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    fontFamily: 'Kanit',
    padding: 8,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  btnDrop: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#CA5353',
    borderColor: '#CA5353',
    color: '#ffffff',
    width: 46,
    height: 22,
    borderRadius: 21,
  },
  ViewWrapper: {
    width: 312,
    minHeight: 300,
    padding: 8,
    borderWidth: 1,
    borderRadius: 18,
    display: 'flex',
    alignItems: 'center',
    borderColor: '#D0CDCD',
  },
  StyleRow: {
    width: 300,
    height: 20,
    padding: 2,
    flexDirection: 'row',
    marginBottom: 4,
  },
  StyleWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  ViewHeader: {
    width: 300,
    height: 32,
    padding: 4,
    borderBottomWidth: 1,
    marginBottom: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D0CDCD',
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
    justifyContent: 'center',
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
  },
  btnReq: {
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 8,
    borderWidth: 1,
    backgroundColor: '#006765',
    borderColor: '#006765',
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
