import React, {Component} from 'react';
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
import {connect} from 'react-redux';
import Login from '../actions';
// import ku_logo from './android/statics/images/ku_logo.png'

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  Event_login = async () => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      },
    );
    const responseJson = await response.json();
    if (responseJson.message !== 'PASS') {
      Alert.alert(`${responseJson.message}`);
    } else {
      Alert.alert('Login Success');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          style={styles.CustomImg}
          source={require('./android/statics/images/ku_logo.png')}
        /> */}
        <View style={{height: 16}} />
        <Text style={styles.LabelTitle}>CHECK NAME</Text>
        <View style={{height: 12}} />
        <Text style={styles.LabelText}>YOUR EMAIL :</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({email})}
          />
        </View>
        <Text style={styles.LabelText}>PASSWORD :</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
        </View>

        <TouchableHighlight
          style={styles.buttonForget}
          onPress={() => this.onClickListener('restore_password')}>
          <Text style={{textDecorationLine: 'underline'}}>
            Forgot your password?
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.Event_login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text>Register</Text>
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
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#949AA0',
    borderWidth: 1,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
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

const mapStateToProps = state => ({
  LoginReducer: state.LoginReducer,
});

const mapDispatchToProps = {
  Login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
