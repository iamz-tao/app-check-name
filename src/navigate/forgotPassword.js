import React, {Component} from 'react';
import {Avatar, ButtonGroup} from 'react-native-elements';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableHighlight,
} from 'react-native';

import SuccessModal from '../components/successModal';


export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      modalVisible: false,
    };
  }


  Event_Register = async () => {
    // const response = await fetch(
    //   'https://us-central1-kpscheckin.cloudfunctions.net/api/register',
    //   {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       id: this.state.id,
    //       firstname: this.state.firstname,
    //       lastname: this.state.lastname,
    //       email: this.state.email,
    //       password: this.state.password,
    //       role: this.state.role,
    //       mobile: this.state.mobile,
    //     }),
    //   },
    // );
    // const responseJson = await response.json();
    // if (responseJson.Error === undefined) {
    //   // Alert.alert('ADD Success');
    //   this.props.navigation.navigate('Login');
    // } else {
    //   Alert.alert(`${responseJson.Error}`);
    // }
  };

  setModalVisible = () => {
    const {modalVisible} = this.state;
    this.setState({modalVisible: !modalVisible});
  };
  
  render() {
    const {modalVisible} = this.state
    const status = 'SUCCESS'
    console.log('xxx')
    return (
    //   <ScrollView>
          /* <SuccessModal
          msg={'Please check your E-mail.'}
          setModalVisible={this.setModalVisible}
          modalVisible={modalVisible}
          status={status}
          path={'Login'}
        /> */
        <View style={styles.container}>
          <View style={styles.containerWrapper}>
            <Text style={styles.styleHeader}>RETRIEVE PASSWORD</Text>
            <Text style={{fontSize: 12, color: '#525252', padding: 12}}>Enter your email adress and We’ll send you a link to reset your password.</Text>
          </View>
          <View style={styles.styleInputWrapper}>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>ENTER YOUR EMAIL :</Text>
              <TextInput
                style={styles.inputs}
                placeholder="example@xxx.com"
                onChangeText={email => this.setState({email})}
              />
            </View>
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={this.Event_Register}>
              <Text style={{color: '#ffffff'}}>SUBMIT</Text>
            </TouchableHighlight>
          </View>
        </View>
    //   </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    fontFamily: 'Kanit',
    padding: 14,
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  containerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // paddingRight: 8,
  },
  styleHeader: {
    display: 'flex',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 42,
    // paddingLeft: 16,
    width: 300,
  },
  styleLabel: {
    fontSize: 14,
    lineHeight: 21,
    display: 'flex',
    paddingLeft: 12,
  },
  styleInputWrapper: {
    display: 'flex',
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
    height: 66,
  },
  inputs: {
    height: '100%',
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
});
