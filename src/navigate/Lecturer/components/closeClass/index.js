import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DotsLoader, TextLoader} from 'react-native-indicator';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import SuccessModal from '../../../../components/successModal';
import {GetClass, CloseClass, Logout} from '../../../../actions';

class LecturerCloseClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    const {token} = this.props.navigation.state.params;
    if (!token) {
      this.props.navigation.navigate('Login');
    }
    const {GetClass} = this.props;
    GetClass({token});
  }

  setModalVisible = () => {
    const {modalVisible} = this.state;
    this.setState({modalVisible: !modalVisible});
  };

  handleSubmit = id => {
    const {CloseClass} = this.props;
    const {token} = this.props.navigation.state.params;
    CloseClass({
      token,
      id,
    });
    // this.setModalVisible();
  };

  handleLogout = () => {
    const {Logout} = this.props;
    Logout({});
  };

  render() {
    const {modalVisible} = this.state;
    const {status, fetching, openClass} = this.props.class;
    if (fetching || !openClass) {
      return (
        <View style={styles.loadingWrapper}>
          <DotsLoader color="#CA5353" />
          <TextLoader text="Loading" />
        </View>
      );
    }

    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <SuccessModal
          msg={'Close Class Complete!.'}
          setModalVisible={this.setModalVisible}
          modalVisible={modalVisible}
          status={status}
          path={'LecturerHomePage'}
        />
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
            <Text style={styles.styleHeader}>CLOSE CLASS</Text>
          </View>
          <View style={styles.styleInputWrapper}>
            {openClass !== null && openClass.length === 0 ? (
              <Text style={{color: '#525252'}}>
                {' '}
                There aren't any classes openings.
              </Text>
            ) : (
              <View style={styles.inputContainer}>
                <View style={{flex: 1, paddingBottom: 8}}>
                  <Text style={styles.styleLabel}>
                    SUBJECT :{' '}
                    <Text style={{color: '#525252'}}>
                      {' '}
                      {openClass[0].subject_code} {openClass[0].subject_name}
                    </Text>
                  </Text>
                </View>
                {/* <View style={{flex: 1, paddingBottom: 8}}>
                  <Text style={styles.styleLabel}>
                    SUBJECT NAME :{' '}
                    <Text style={{color: '#525252'}}>
                      {' '}
                      {openClass[0].subject_name}{' '}
                    </Text>
                  </Text>
                </View> */}
                <View style={{flex: 1, paddingBottom: 8}}>
                  <Text style={styles.styleLabel}>
                    SECTION :{' '}
                    <Text style={{color: '#525252'}}>
                      {' '}
                      {openClass[0].section_number}{' '}
                    </Text>
                  </Text>
                </View>
                <View style={{flex: 1, paddingBottom: 8}}>
                  <Text style={styles.styleLabel}>
                    TIME :{' '}
                    <Text style={{color: '#525252'}}>
                      {' '}
                      {openClass[0].Time[0].day}{' '}
                      {openClass[0].Time[0].start_time} -{' '}
                      {openClass[0].Time[0].end_time}{' '}
                    </Text>
                  </Text>
                  {openClass[0].Time.legth === 2 && (
                    <View style={{flex: 1, paddingBottom: 8}}>
                      <Text style={(styles.styleLabel, {color: '#525252'})}>
                        {' '}
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{' '}
                        {openClass[0].Time[1].day}{' '}
                        {openClass[0].Time[1].start_time} -{' '}
                        {openClass[0].Time[1].end_time}{' '}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>

          <View style={styles.btnWrapper}>
            <TouchableHighlight
              style={styles.btnCancel}
              onPress={() =>
                this.props.navigation.navigate('LecturerHomePage')
              }>
              <Text style={{color: '#949494'}}>BACK</Text>
            </TouchableHighlight>
            {openClass !== null && openClass.length > 0 && (
              <TouchableHighlight
                style={styles.btnReq}
                onPress={() => {
                  this.handleSubmit(openClass[0].class_id);
                  this.setModalVisible();
                }}>
                <Text style={{color: 'white'}}>CLOSE</Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

//use to add reducer state to props
const mapStateToProps = state => {
  return {
    class: state.subjectReducer,
  };
};

//use to add action(dispatch) to props
const mapDispatchToProps = {
  CloseClass,
  GetClass,
  Logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LecturerCloseClass);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    fontFamily: 'Kanit',
    padding: 8,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  loadingWrapper: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonAddSubject: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 150,
    borderRadius: 30,
  },
});
