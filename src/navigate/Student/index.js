import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {DotsLoader, TextLoader} from 'react-native-indicator';
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

class StudentHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    // const {
    //   LoginReducer: {token},
    // } = this.props;
    // if (!token) {
    //   this.props.navigation.navigate('Login');
    // }
  }

  render() {
    const {
      LoginReducer: {
        data: {token},
      },
    } = this.props;
    const {
      LoginReducer: {fetching},
    } = this.props;
    
    if (fetching) {
      return (
        <View>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{display: 'flex', alignItems: 'flex-end'}}>
            <TouchableHighlight style={styles.btnLogout}>
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
            <Text style={(styles.styleText, {color: '#1D697C'})}>
              Phiyada Srikhenkan
            </Text>
            <Text style={styles.styleText}>STUDENT</Text>

            <View style={{height: 24}} />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableHighlight
                style={styles.buttonMenu}
                onPress={() =>
                  this.props.navigation.navigate('StudentSubjectRegister')
                }>
                <Text style={styles.LabelText}>SUBJECT REGISTER</Text>
              </TouchableHighlight>
              <View style={{width: 20}} />
              <TouchableHighlight
                style={styles.buttonCheckIn}
                onPress={() => {}
                //   this.onClickListener('Student_subject_register')
                }>
                <Text style={styles.LabelText}>ATTEND CLASS</Text>
              </TouchableHighlight>
            </View>

            <TouchableHighlight
              style={styles.buttonMySubject}
              onPress={() =>{
                //   this.onClickListener('Student_subject_register')
              }}
              >
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
  //   Login,
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
});
