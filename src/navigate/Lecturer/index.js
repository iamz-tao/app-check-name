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

import {Logout, GetClass} from '../../actions';
class LecturerHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    const {token} = this.props.navigation.state.params
    const {
      GetClass,
    } = this.props;
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        console.log("Focus Lecturer Home Page")
        GetClass({token});
      }
    );
  }

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  render() {
    const {
      LoginReducer: {
        data: {token, user},
      },
      class: {openClass},
      LoginReducer: {fetching, displayName},
      LoginReducer,
    } = this.props;

    if (!LoginReducer || !openClass) {
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
            {/* <Avatar
              rounded
              size="xlarge"
              // showEditButton
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
            /> */}
            <Image
              source={require('../../../android/statics/images/19003-board-team.gif')}
              style={{width: 184, height: 184}}
            />
            <View style={{height: 8}} />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={(styles.styleText, {color: '#1D697C'})}>
                {displayName}{' '}
              </Text>
              <TouchableHighlight
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => {
                  this.props.navigation.navigate('Update Profile', {
                    token,
                    role: user.role,
                  });
                }}>
                <Image
                  style={styles.CustomImg}
                  source={require('../../../android/statics/images/edit.png')}
                />
              </TouchableHighlight>
            </View>
            <Text style={styles.styleText}>Lecturer</Text>

            <View style={{height: 24}} />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableHighlight
                style={styles.buttonMenu}
                onPress={() =>
                  this.props.navigation.navigate('Open Section', {
                    token,
                  })
                }>
                <Text style={styles.LabelText}>OPEN SECTION</Text>
              </TouchableHighlight>
              <View style={{width: 16}} />
              <TouchableHighlight
                style={styles.buttonOpenClass}
                onPress={() =>
                  this.props.navigation.navigate('Open Class', {
                    token,
                    openClass,
                  })
                }>
                <Text style={styles.LabelText}>OPEN CLASS</Text>
              </TouchableHighlight>
              <View style={{width: 16}} />
              <TouchableHighlight
                style={styles.buttonCloseClass}
                onPress={() => {
                  this.props.navigation.navigate('Close Class', {
                    token,
                  });
                }}>
                <Text style={styles.LabelText}>CLOSE CLASS</Text>
              </TouchableHighlight>
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableHighlight
                style={styles.buttonMySubject}
                onPress={() => {
                  this.props.navigation.navigate('My Subjects', {
                    token,
                    displayName,
                  });
                }}>
                <Text style={styles.LabelText}>MY SUBJECTS</Text>
              </TouchableHighlight>
              <View style={{width: 16}} />
              <TouchableHighlight
                style={styles.buttonBeacon}
                onPress={() => {
                  this.props.navigation.navigate('Beacons', {
                    token,
                  });
                }}>
                <Text style={styles.LabelText}>BEACONS</Text>
              </TouchableHighlight>
              <View style={{width: 16}} />
              <TouchableHighlight
                style={styles.buttonStudentApprove}
                onPress={() => {
                  this.props.navigation.navigate('Student Approve', {
                    token,
                  });
                }}>
                <Text style={styles.LabelText}>STUDENT APPROVE</Text>
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
    class: state.subjectReducer,
  };
};

const mapDispatchToProps = {
  GetClass,
  Logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LecturerHomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Kanit',
    fontStyle: 'normal',
  },
  CustomImg: {
    width: 12,
    height: 12,
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
    height: 96,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 96,
    borderWidth: 1,
    padding: 8,
    borderColor: '#F5B7B1',
    backgroundColor: '#F5B7B1',
    borderRadius: 18,
  },
  styleColor: {
    borderColor: '#F5B7B1',
    backgroundColor: '#F5B7B1',
  },
  buttonBeacon: {
    height: 96,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 96,
    padding: 8,
    borderWidth: 1,
    borderColor: '#FFCD89',
    backgroundColor: '#FFCD89',
    borderRadius: 18,
  },
  buttonMySubject: {
    height: 96,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 96,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ACCAB4',
    backgroundColor: '#ACCAB4',
    borderRadius: 18,
  },
  buttonOpenClass: {
    height: 96,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 96,
    padding: 8,
    borderWidth: 1,
    borderColor: '#85C4D1',
    backgroundColor: '#85C4D1',
    borderRadius: 18,
  },
  buttonCloseClass: {
    height: 96,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 96,
    padding: 8,
    borderWidth: 1,
    borderColor: '#B3A7FF',
    backgroundColor: '#B3A7FF',
    borderRadius: 18,
  },
  buttonStudentApprove: {
    height: 96,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 96,
    padding: 8,
    borderWidth: 1,
    borderColor: '#CA5353',
    backgroundColor: '#CA5353',
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
    fontSize: 16,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff',
  },
  styleText: {},
});
