import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Avatar, ButtonGroup} from 'react-native-elements';

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

import SuccessModal from '../../../../components/successModal';
import {CreateSubject, Logout} from '../../../../actions';
class LecturerCreateSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_code: '',
      subject_name: '',
      modalVisible: false,
    };
  }

  componentDidMount() {
    const {token} = this.props.navigation.state.params;
    if (!token) {
      this.props.navigation.navigate('Login');
    }
  }

  setModalVisible = () => {
    const {modalVisible} = this.state;
    this.setState({modalVisible: !modalVisible});
  };

  handleSubmit = () => {
    const {CreateSubject} = this.props;
    const {token} = this.props.navigation.state.params;
    const {subject_code, subject_name} = this.state;
    CreateSubject({
      token,
      subject_name,
      subject_code,
    });
    this.setModalVisible();
    this.setState({
      subject_code: '',
      subject_name: '',
    });
  };

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  render() {
    const {modalVisible} = this.state;
    const {status} = this.props.createSubject;
    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <SuccessModal
          msg={'Create new subject complete.'}
          setModalVisible={this.setModalVisible}
          modalVisible={modalVisible}
          status={status}
          path={'Open Section'}
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
            <Text style={styles.styleHeader}>CREATE SUBJECT</Text>
          </View>
          <View style={styles.styleInputWrapper}>
            <View style={styles.inputContainer}>
              <View style={{flex: 1, paddingBottom: 12}}>
                <Text style={styles.styleLabel}>SUBJECT CODE :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Subject Code"
                  onChangeText={subject_code => this.setState({subject_code})}
                />
              </View>
              <View style={{flex: 1, paddingBottom: 12}}>
                <Text style={styles.styleLabel}>SUBJECT NAME :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Subject Name"
                  onChangeText={subject_name => this.setState({subject_name})}
                />
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
              onPress={() => this.handleSubmit()}>
              <Text style={{color: 'white'}}>CREATE</Text>
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
    createSubject: state.subjectReducer,
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  CreateSubject,
  Logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LecturerCreateSubject);

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
