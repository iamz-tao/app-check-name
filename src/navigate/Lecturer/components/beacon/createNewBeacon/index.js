import React, { Component } from 'react';
import { Avatar, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { DotsLoader, TextLoader } from 'react-native-indicator';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableHighlight,
  PermissionsAndroid,
  DeviceEventEmitter,
  Picker,
  Modal,
  Image,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  TouchableOpacity,
} from 'react-native-table-component';
// import {GetCurrentYear, GetStudentApprove} from '../../../../../../actions';
import { Logout, RegisterBeacon, GetAllBeacon } from '../../../../../actions'
import Beacons from 'react-native-beacons-manager';
import BluetoothState from 'react-native-bluetooth-state-manager';
import { checkLocationStatus } from '../../../../../AuthBeacon/func'
import beacon from '..';

//check Bluetooth
BluetoothState.requestToEnable();

const element = (data, index) => (
  <TouchableOpacity onPress={() => this._alertIndex(index)}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>button</Text>
    </View>
  </TouchableOpacity>
);

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This example app needs to access your location in order to use bluetooth beacons.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      // permission denied
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}


class CreateNewBeacon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValues: [],
      section: [],
      token: '',
      isScanning: false,
      beacon: [],
      uuid: '',
      major: '',
      minor: '',
      name: ''
    };
  }

  async componentDidMount() {

    this.beaconsDidRange = null;

    const { token } = this.props.navigation.state.params;
    const { GetAllBeacon } = this.props;
    if (!token) {
      this.props.navigation.navigate('Login');
    }
    GetAllBeacon({
      token,
    });

    const { beacons } = this.props.subjects;

    let beconFilter = beacons.map(beacon => { return beacon.uuid });

    const request_permission = await requestLocationPermission();
    checkLocationStatus();

    if (request_permission) {

      Beacons.detectIBeacons();

      // Print a log of the detected iBeacons (1 per second)
      this.beaconsDidRange = DeviceEventEmitter.addListener(
        'beaconsDidRange',
        (data) => {
          let filterBeacon = data.beacons.filter(f => {
            return !beconFilter.includes(f.uuid)
          })
          this.setState({ beacon: filterBeacon })
        }
      );
    }
  }

  componentWillUnmount() {
    this.beaconsDidRange = null;
    Beacons.stopRangingBeaconsInRegion('REGION');
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  scan = () => {
    const { beacon, isScanning } = this.state
    console.log("Scan")
    Beacons.startRangingBeaconsInRegion('REGION1').then((data) => {
      // console.log(data);
    })
      .catch((reason) => {
        console.log(reason);
      });
      
    setTimeout(() => {
      this.setState({
        isScanning: !isScanning
      })
      beacon.map((b) => {
        this.setState({
          uuid: b.uuid,
          major: b.major,
          minor: b.minor
        })
      })
    }, 2000);

  }


  handleNewBeacon = () => {
    const { uuid, major, minor, name } = this.state;
    const token = this.props.navigation.state.params;
    const payload = {
      uuid,
      major,
      minor,
      name
    }
    const { RegisterBeacon } = this.props
    RegisterBeacon(
      {
        token,
        payload
      }
    )
  }

  render() {
    const { pickerValues, section, token, uuid, major, minor, isScanning, beacon } = this.state;

    return (
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <View style={styles.container}>
          <View style={{ display: 'flex', alignItems: 'flex-end' }}>
            <TouchableHighlight style={styles.btnLogout}>
              <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.containerWrapper}>
            <View style={{ width: 200 }}>
              <Text style={styles.styleHeader}>NEW BEACON</Text>
            </View>
            <TouchableHighlight
              style={styles.btnScan}
              onPress={() => {
                this.scan();
              }
              }>
              <Text style={{ color: '#FFFFFF' }}>SCAN</Text>
            </TouchableHighlight>
          </View>
          <View style={{ height: 16 }} />
          <Text style={styles.styleLabel, { paddingLeft: 34 }}>BEACON NAME :</Text>
          <View style={{ flex: 1, paddingBottom: 12, width: '100%', display: 'flex', alignItems: 'center' }}>

            <TextInput
              style={styles.inputs}
              placeholder="Beacon Name"
              onChangeText={name => this.setState({ name })}
            />
          </View>

          {isScanning && beacon.length > 0 ? <View>
          <Text style={styles.styleLabel, { paddingLeft: 34 }}>UUID :{uuid}<Text></Text></Text>
          <Text style={styles.styleLabel, { paddingLeft: 34 }}>MAJOR :{major}<Text></Text></Text>
          <Text style={styles.styleLabel, { paddingLeft: 34 }}>MINOR :{minor}<Text></Text></Text>
          </View> : 
          <View>
            <Text style={styles.styleLabel, { paddingLeft: 34 }}> Beacon is exists or you are out of range of beacon</Text>
          </View>}
          <View style={styles.btnWrapper}>
            <TouchableHighlight
              style={styles.btnCancel}
              onPress={() =>
                this.props.navigation.navigate('Beacon')
              }>
              <Text style={{ color: '#949494' }}>BACK</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnReq}
              onPress={
                this.handleNewBeacon
                //    this.handleSubmit(token,section_id)
                //    this.setModalVisible(statusReq)
              }>
              <Text style={{ color: 'white' }}>ADD</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

//use to add reducer state to props
const mapStateToProps = state => {
  return {
    currentYear: state.yearReducer,
    subjects: state.subjectReducer,
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  // GetCurrentYear,
  // GetStudentApprove,
  Logout,
  RegisterBeacon,
  GetAllBeacon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewBeacon);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    fontFamily: 'Kanit',
    padding: 8,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  containerTest: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
  },
  head: { height: 40, backgroundColor: '#FFFFFF', borderWidth: 0.3, borderColor: '#D0CDCD' },// borderTopLeftRadius: 18, borderTopRightRadius: 18},
  text: { margin: 6, color: '#525252' },
  textHeader: { margin: 6, color: '#000000' },
  row: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderWidth: 0.3, borderTopWidth: 0, borderColor: '#D0CDCD' },
  btn: { width: 58, height: 18, backgroundColor: '#FFFFFF', borderRadius: 18 },
  btnText: { textAlign: 'center', color: 'black' },
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
  CustomImg: {
    width: 116,
    height: 116,
    top: 20,
  },
  ModalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  DetailModalWrapper: {
    width: 300,
    height: 300,
    backgroundColor: '#EBEAEA',
    borderRadius: 19,
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
  btnScan: {
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    backgroundColor: '#C9C9C9',
    borderColor: '#C9C9C9',
    color: '#FFFFFF',
    width: 68,
    height: 40,
    borderRadius: 21,
  },
  containerWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 8,
    width: '100%',
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
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  styleLabelFail: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 21,
    display: 'flex',
    paddingLeft: 12,
    color: '#CA5353',
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
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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