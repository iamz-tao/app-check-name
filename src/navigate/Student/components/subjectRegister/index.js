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
  Picker,
} from 'react-native';


export default class StudentSubjectRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: '',
    };
  }

  componentDidMount() {
    const {
      LoginReducer: {data: {token}},
      StudentGetSubjectRegis,
    } = this.props.navigation.state.params;
    // console.log(token)
    // console.log('thisss pors',this.props)
    // if (!token) {
      // this.props.navigation.navigate('Login');
    // } else {
      StudentGetSubjectRegis({
        token,
      })
    // }
    // fetch('https://us-central1-kpscheckin.cloudfunctions.net/api/getSubjectByStudent', {
    //      method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       token,
    //     },
    //   })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //      console.log(responseJson);
    //      this.setState({
    //         data: responseJson
    //      })
    //   })
    //   .catch((error) => {
    //      console.error(error);
    //   });
 
  }

  handleSelect = () => {
    const select = this.state.pickerValues;
    if (select === '') {
      alert('Please select!');
    }
    alert(select);
  };

  //   Event_Register = async () => {
  //     const response = await fetch(
  //       'https://us-central1-kpscheckin.cloudfunctions.net/api/register',
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           id: this.state.id,
  //           firstname: this.state.firstname,
  //           lastname: this.state.lastname,
  //           email: this.state.email,
  //           password: this.state.password,
  //           role: this.state.role,
  //           mobile: this.state.mobile,
  //         }),
  //       },
  //     );
  //     const responseJson = await response.json();
  //     if (responseJson.Error === undefined) {
  //       Alert.alert('ADD Success');
  //       this.props.navigation.navigate('Home');
  //     } else {
  //       Alert.alert(`${responseJson.Error}`);
  //     }
  //   };

  render() {
    const {pickerValues} = this.state;
    // console.log('propss>>',this.props.navigation.state.params)
    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <View style={styles.container}>
          <View style={{display: 'flex', alignItems: 'flex-end'}}>
            <TouchableHighlight style={styles.btnLogout}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.containerWrapper}>
            <Text style={styles.styleHeader}>SUBJECT REGISTER</Text>
          </View>
          <Text style={(styles.styleLabel, {paddingLeft: 16})}>
            YEAR / SEMESTER : 2563 / 1
          </Text>
          <View style={styles.styleInputWrapper}>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>SELECT SUBJECT :</Text>
              <View style={styles.stylePicker}>
                <Picker
                  style={{height: 45}}
                  selectedValue={pickerValues}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      pickerValues: itemValue,
                    })
                  }>
                  <Picker.Item label="Select Subject" value="" />
                  <Picker.Item label="Html" value="Html" />
                  <Picker.Item label="Java" value="Java" />
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.styleInputWrapper}>
            <View style={styles.inputContainer}>
              <Text style={styles.styleLabel}>SELECT SECTION :</Text>
              <View style={styles.stylePicker}>
                <Picker
                  style={{height: 45}}
                  selectedValue={pickerValues}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      pickerValues: itemValue,
                    })
                  }>
                  <Picker.Item label="Select Section" value="" />
                  <Picker.Item label="Html" value="Html" />
                  <Picker.Item label="Java" value="Java" />
                </Picker>
              </View>
            </View>
          </View>
          <View style={{display: 'flex', paddingLeft: 16, width: 340}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={(styles.styleLabel, {flex: 1, alignSelf: 'center'})}>
                Lecturer Name :{' '}
              </Text>
              <Text style={{flex: 1}}>Phiyada Srikhenkan</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={(styles.styleLabel, {flex: 1})}>Date/Time :</Text>
              <Text style={(styles.styleLabel, {flex: 1})}>
                Th 09.00 AM - 10.30 AM
              </Text>
            </View>
          </View>
            <View style={styles.btnWrapper}>
              <TouchableHighlight
                style={styles.btnCancel}
                onPress={() => this.props.navigation.navigate('StudentHomePage')}
                >
                <Text style={{color: '#949494'}}>CANCEL</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.btnReq}>
                <Text style={{color: 'white'}}>REQUEST</Text>
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
});
