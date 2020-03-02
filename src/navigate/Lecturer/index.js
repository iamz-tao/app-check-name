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
} from 'react-native';

class LecturerHomePage extends Component {
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
            <TouchableHighlight style={styles.btnLogout}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.containerWrapper}>
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
              Thanakit ABC
            </Text>
            <Text style={styles.styleText}>Lecturer</Text>

            <View style={{height: 24}} />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableHighlight
                style={styles.buttonMenu}
                onPress={() =>
                  this.props.navigation.navigate('OpenSection')
                }>
                <Text style={styles.LabelText}>OPEN SECTION</Text>
              </TouchableHighlight>
              <View style={{width: 16}} />
              <TouchableHighlight
                style={styles.buttonOpenClass}
                onPress={
                  () => this.props.navigation.navigate('OpenSection')
                }>
                <Text style={styles.LabelText}>OPEN CLASS</Text>
              </TouchableHighlight>
              <View style={{width: 16}} />
              <TouchableHighlight
                style={styles.buttonCloseClass}
                onPress={
                  () => {}
                  //   this.onClickListener('Student_subject_register')
                }>
                <Text style={styles.LabelText}>CLOSE CLASS</Text>
              </TouchableHighlight>
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableHighlight
                style={styles.buttonMySubject}
                onPress={() => {
                  //   this.onClickListener('Student_subject_register')
                }}>
                <Text style={styles.LabelText}>MY SUBJECT</Text>
              </TouchableHighlight>
              <View style={{width: 16}} />
              <TouchableHighlight
                style={styles.buttonBeacon}
                onPress={
                  () => {}
                  //   this.onClickListener('Student_subject_register')
                }>
                <Text style={styles.LabelText}>BEACON</Text>
              </TouchableHighlight>
              <View style={{width: 16}} />
              <TouchableHighlight
                style={styles.buttonStudentApprove}
                onPress={
                  () => {}
                  //   this.onClickListener('Student_subject_register')
                }>
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
  };
};

const mapDispatchToProps = {
  //   Login,
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
    borderColor: '#ECC7E6',
    backgroundColor: '#ECC7E6',
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
