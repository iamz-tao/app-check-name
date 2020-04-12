import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {DotsLoader, TextLoader} from 'react-native-indicator';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import {StudentGetSubjectRegis, Logout} from '../../actions';

class StudentHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {}

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  render() {
    const {
      LoginReducer: {
        data: {token},
        fetching,
      },
      LoginReducer,
      StudentGetSubjectRegis,
    } = this.props;

    const {displayName} = this.props.LoginReducer;

    if (fetching) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }
    return (
      <ScrollView>
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
            {/* <View style={{height: 18}} /> */}
            <Avatar
              rounded
              size="xlarge"
              // showEditButton
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
            />
            <View style={{height: 8}} />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={(styles.styleText, {color: '#1D697C'})}>
                {displayName}{' '}
              </Text>
              <TouchableHighlight
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => {
                  this.props.navigation.navigate('UpdateProfile', {
                    token,
                  });
                }}>
                <Image
                  style={styles.CustomImg}
                  source={require('../../../android/statics/images/edit.png')}
                />
              </TouchableHighlight>
            </View>
            <Text style={styles.styleText}>STUDENT</Text>

            <View style={{height: 24}} />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableHighlight
                style={styles.buttonMenu}
                onPress={() =>
                  this.props.navigation.navigate('StudentSubjectRegister', {
                    LoginReducer,
                    StudentGetSubjectRegis,
                  })
                }>
                <Text style={styles.LabelText}>SUBJECT REGISTER</Text>
              </TouchableHighlight>
              <View style={{width: 20}} />
              <TouchableHighlight
                style={styles.buttonCheckIn}
                onPress={() => {
                  this.props.navigation.navigate('StudentCheckName', {
                    token,
                    LoginReducer,
                  });
                }}>
                <Text style={styles.LabelText}>ATTEND CLASS</Text>
              </TouchableHighlight>
            </View>

            <TouchableHighlight
              style={styles.buttonMySubject}
              onPress={() => {
                this.props.navigation.navigate('StudentListSubject', {token});
              }}>
              <Text style={styles.LabelText}>MY SUBJECT</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    LoginReducer: state.loginReducer,
  };
};

const mapDispatchToProps = {
  StudentGetSubjectRegis,
  Logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentHomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Kanit',
    fontStyle: 'normal',
  },
  loadingWrapper: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  containerWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    padding: 16,
  },
  btnLogout: {
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'center',
    marginTop: 16,
    marginRight: 16,
    borderWidth: 1,
    backgroundColor: '#CA5353',
    borderColor: '#CA5353',
    color: '#ffffff',
    width: 68,
    height: 36,
    borderRadius: 21,
  },
  buttonMenu: {
    height: 116,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 116,
    borderWidth: 1,
    padding: 8,
    borderColor: '#F5B7B1',
    backgroundColor: '#F5B7B1',
    borderRadius: 18,
  },
  buttonCheckIn: {
    height: 116,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 116,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ECC7E6',
    backgroundColor: '#ECC7E6',
    borderRadius: 18,
  },
  buttonMySubject: {
    height: 116,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 116,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F4CD98',
    backgroundColor: '#F4CD98',
    borderRadius: 18,
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
    width: '100%',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff',
  },
  styleText: {},
  CustomImg: {
    width: 12,
    height: 12,
  },
});
