import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DotsLoader, TextLoader} from 'react-native-indicator';
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
import {Logout, UserUpdateProfile, userGetProfile} from '../actions';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUpdate: '',
      firstnameUpdate: '',
      lastnameUpdate: '',
      mobileUpdate: '',
    };
  }

  componentDidMount() {
    const {token} = this.props.navigation.state.params;
    if (!token) {
      this.props.navigation.navigate('Login');
    }
    const {userGetProfile} = this.props;
    userGetProfile({
      token,
    });
  }

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  handleSubmit = () => {
    const {UserUpdateProfile} = this.props;
    const {
      idUpdate,
      firstnameUpdate,
      lastnameUpdate,
      mobileUpdate,
    } = this.state;
    const {
      profile: {
        profile: {email, id, firstname, lastname, mobile},
      },
    } = this.props;
    const {token} = this.props.navigation.state.params;
    const dataUser = {
      id: idUpdate === '' ? id : idUpdate,
      firstname: firstnameUpdate === '' ? firstname : firstnameUpdate,
      lastname: lastnameUpdate === '' ? lastname : lastnameUpdate,
      mobile: mobileUpdate === '' ? mobile : mobileUpdate,
      email,
    };
    UserUpdateProfile({
      dataUser,
      token,
    });
  };

  render() {
    const {
      profile: {fetching, profile},
    } = this.props;
    const {role} = this.props.navigation.state.params;

    if (fetching || !profile) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }
    const {
      profile: {
        profile: {email, firstname, id, lastname, mobile},
      },
    } = this.props;
  
    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <View style={styles.container}>
          <View style={styles.containerWrapper}>
            <Text style={styles.styleHeader}>UPDATE PROFILE</Text>
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
                onChangeText={idUpdate => this.setState({idUpdate})}
                defaultValue={id}
              />
            </View>
            <View style={styles.inputContainerGroup}>
              <View style={{paddingRight: 16, flex: 1}}>
                <Text style={styles.styleLabel}>FIRSTNAME :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Firstname"
                  onChangeText={firstnameUpdate =>
                    this.setState({firstnameUpdate})
                  }
                  defaultValue={firstname}
                />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.styleLabel}>LASTNAME :</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Lastname"
                  onChangeText={lastnameUpdate =>
                    this.setState({lastnameUpdate})
                  }
                  defaultValue={lastname}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>PHONE NUMBER :</Text>
              <TextInput
                style={styles.inputs}
                placeholder="Phone Number"
                onChangeText={mobileUpdate => this.setState({mobileUpdate})}
                defaultValue={mobile}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>EMAIL :</Text>
              <TextInput
                editable={false}
                style={styles.inputs}
                placeholder="Email"
                onChangeText={email => this.setState({email})}
                value={email}
              />
            </View>
            <View style={styles.btnWrapper}>
              <TouchableHighlight
                style={styles.btnCancel}
                onPress={() =>
                  {
                    if(role === 'PROFESSOR'){
                      this.props.navigation.navigate('Lecturer Home Page')
                    }
                    if(role === 'NISIT'){
                      this.props.navigation.navigate('Student Home Page')
                    }
                  }
                }>
                <Text style={{color: '#949494'}}>BACK</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.buttonContainer}
                onPress={() => this.handleSubmit()}>
                <Text style={{color: '#ffffff'}}>UPDATE</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    LoginReducer: state.loginReducer,
    profile: state.profileReducer,
  };
};

const mapDispatchToProps = {
  userGetProfile,
  UserUpdateProfile,
  Logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateProfile);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    fontFamily: 'Kanit',
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
  },
  containerWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 12,
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
    width: 96,
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
});
