import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationServices from './NavigationServices'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';
// import ku_logo from '../../android/'

import {Login} from '../actions';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const props = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.CustomImg}
          source={require('../../android/statics/images/ku_logo.png')}
        />
        <View style={{height: 24}} />
        <Text style={styles.LabelTitle}>CHECK NAME</Text>
        <View style={{height: 12}} />
        <Text style={styles.LabelText}>YOUR EMAIL :</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => {
              this.setState({email});
            }}
          />
        </View>
        <Text style={styles.LabelText}>PASSWORD :</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => {
              this.setState({password});
            }}
          />
        </View>

        <TouchableHighlight
          style={styles.buttonForget}
          onPress={() => this.onClickListener('restore_password')}>
          <Text style={{textDecorationLine: 'underline' }}>
            Forgot your password?
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            const {email, password} = this.state;
            props.Login({email: email, password: password});
            // this.props.navigation.navigate('StudentHomePage')
            // this.props.navigation.navigate('LecturerHomePage')
            NavigationServices.navigate('StudentHomePage')
          }}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{textDecorationLine: 'underline', color: '#738497' }}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Kanit',
    fontStyle: 'normal',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 300,
    height: 45,
    marginBottom: 12,
    flexDirection: 'row',
    borderColor: '#949AA0',
    borderWidth: 1,
  },
  inputs: {
    height: 45,
    marginLeft: 14,
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 150,
    borderRadius: 30,
  },
  buttonForget: {
    height: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
  },
  loginButton: {
    backgroundColor: '#CA5353',
  },
  loginText: {
    color: 'white',
  },
  CustomImg: {
    width: 90,
    height: 116,
    top: 20,
  },
  LabelTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 42,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.67)',
  },
  LabelText: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 250,
  },
});

//use to add reducer state to props
const mapStateToProps = state => ({
  LoginReducer: state.LoginReducer,
});

//use to add action(dispatch) to props
const mapDispatchToProps = {
  Login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
