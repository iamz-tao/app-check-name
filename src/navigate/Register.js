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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      role: '',
      firstname: '',
      lastname: '',
      mobile: '',
      email: '',
      password: '',
      selectedIndex: 0,
    };
  }

  updateIndex = selectedIndex => {
    if (selectedIndex === 1) {
      this.setState({
        role: 'STUDENT',
        selectedIndex,
      });
    } else {
      this.setState({
        role: 'PROFESSOR',
        selectedIndex,
      });
    }
  };

  Event_Register = async () => {
    const {email, firstname, id, lastname, mobile, password, role} = this.state;
    // console.log(this.state)
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/register',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          firstname,
          lastname,
          email,
          password,
          role,
          mobile,
        }),
      },
    );
    const responseJson = await response.json();
    // console.log(responseJson)
    if (responseJson.status.dataStatus === 'SUCCESS') {
      Alert.alert('Registration Succeeded.');
      this.props.navigation.navigate('Login');
    } else {
      Alert.alert(`${responseJson.message}`);
    }
  };
  render() {
    const user_type = ['LECTURER', 'STUDENT'];
    const {selectedIndex,role} = this.state;
    console.log(role)

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerWrapper}>
            <Text style={styles.styleHeader}>REGISTER</Text>
            {/* <Avatar
              rounded
              size="large"
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              showEditButton
            /> */}
          </View>
          <View style={styles.styleInputWrapper}>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>STUDENT ID / LECTURER ID :</Text>
              <TextInput
                style={styles.inputs}
                placeholder="Student ID / Lecturer ID"
                onChangeText={id => this.setState({id})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>USER TYPE :</Text>
              <ButtonGroup
                containerStyle={{
                  borderColor: 'rgba(36, 52, 69, 0.5)',
                  borderRadius: 21,
                  height: 45,
                  width: 200,
                }}
                selectedButtonStyle={{
                  backgroundColor: '#CA5353',
                }}
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={user_type}
              />
            </View>
            <View style={styles.inputContainerGroup}>
              <View style={{paddingRight: 16, flex: 1}}>
                <Text style={styles.styleLabel}>FIRSTNAME :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Firstname"
                  onChangeText={firstname => this.setState({firstname})}
                />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.styleLabel}>LASTNAME :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Lastname"
                  onChangeText={lastname => this.setState({lastname})}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>PHONE NUMBER :</Text>
              <TextInput
                style={styles.inputs}
                placeholder="Phone Number"
                onChangeText={mobile => this.setState({mobile})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>EMAIL :</Text>
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                onChangeText={email => this.setState({email})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>PASSWORD :</Text>
              <TextInput
                style={styles.inputs}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={password => this.setState({password})}
              />
            </View>
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={this.Event_Register}>
              <Text style={{color: '#ffffff'}}>REGISTER</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: '#ffffff',
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
});
