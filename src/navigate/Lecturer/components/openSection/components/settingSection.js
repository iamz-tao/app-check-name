import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,
  Image,
  Picker,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

export const day = [
  {
    key: 0,
    value: 'Sunday',
    text: 'Sunday',
  },
  {
    key: 1,
    value: 'Monday',
    text: 'Monday',
  },
  {
    key: 2,
    value: 'Tuesday',
    text: 'Tuesday',
  },
  {
    key: 3,
    value: 'Wednesday',
    text: 'Wednesday',
  },
  {
    key: 4,
    value: 'Thursday',
    text: 'Thursday',
  },
  {
    key: 5,
    value: 'Friday',
    text: 'Friday',
  },
  {
    key: 6,
    value: 'Saturday',
    text: 'Saturday',
  },
];

class SettingSection extends Component {
  state = {
    fday: null,
    sday: null,
    s_time: null,
    e_time: null,
    s_time2: null,
    e_time2: null,
    addDay: false,
  };

  handleAddDay = () => {
    const {addDay} = this.state;
    this.setState({
      addDay: !addDay,
    });
  };

  handleSelectStartTime = (props) => {
// console.log('prop>>',props)
  }

  

  

  render() {
    const {pickerValues, addDay, fday, sday, date,e_time, s_time, e_time2, s_time2} = this.state;
    const {setModalVisible, modalVisible, handleSetting} = this.props;
    // console.log('value',this.props)
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          presentationStyle="pageSheet">
          <View style={styles.ModalWrapper}>
            <View style={styles.DetailModalWrapper}>
              <View style={{width: '100%', alignItems: 'center'}}>
                <View style={{height: 24}} />
                <View style={{}}>
                  <View style={{height: 40}}>
                    <Text style={styles.styleHeader}>SETTING SECTION</Text>
                  </View>
                  <Text style={styles.styleLabel}>SELECT DAY :</Text>
                  <View style={styles.stylePicker}>
                    <Picker
                      style={{height: 45}}
                      selectedValue={fday}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          fday: itemValue,
                        })
                      }>
                      {day.map(d => (
                        <Picker.Item label={d.text} value={d.value} />
                      ))}
                    </Picker>
                  </View>
                  <View style={{height: 8}} />
                  <Text style={styles.styleLabel}>START TIME - END TIME :</Text>
                  <View style={styles.styleTime}>
                    <DatePicker
                      mode="time"
                      style={{height: 42, width: 146, fontSize: 10}}
                      textColor="#006765"
                      onChange={this.handleSelectStartTime()}
                    />
                    <DatePicker
                      mode="time"
                      style={{height: 42, width: 146}}
                      textColor="#CA5353"
                    />
                  </View>
                  <View style={{height: 8}} />
                  {addDay ? (
                    <View>
                      <Text style={styles.styleLabel}>SELECT DAY2 :</Text>
                      <View style={styles.stylePicker}>
                        <Picker
                          style={{height: 45}}
                          selectedValue={sday}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({
                              sday: itemValue,
                            })
                          }>
                          {day.map(d => (
                            <Picker.Item label={d.text} value={d.value} />
                          ))}
                        </Picker>
                      </View>
                      <View style={{height: 8}} />
                      <Text style={styles.styleLabel}>
                        START TIME - END TIME :
                      </Text>
                      <View style={styles.styleTime}>
                        <DatePicker
                          mode="time"
                          style={{height: 42, width: 146, fontSize: 10}}
                          textColor="#006765"
                        />
                        <DatePicker
                          mode="time"
                          style={{height: 42, width: 146}}
                          textColor="#CA5353"
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <Text>Add Day &nbsp;</Text>
                      <TouchableHighlight
                        style={styles.btnAdd}
                        onPress={() => {
                          this.handleAddDay();
                        }}>
                        <Text
                          style={{
                            color: '#949494',
                            fontSize: 30,
                            paddingBottom: 4,
                          }}>
                          +
                        </Text>
                      </TouchableHighlight>
                    </View>
                  )}

                  <View style={{display: 'flex', alignItems: 'center', marginTop: 8, flexDirection: 'row',justifyContent: 'center'}}>
                  <TouchableHighlight
                      style={styles.btnCancel}
                      onPress={() => {
                        setModalVisible();
                      }}>
                      <Text style={{color: '#949494'}}>CANCEL</Text>
                    </TouchableHighlight>                  
                    <TouchableHighlight
                      style={styles.btnReq}
                      onPress={() => {
                        const data = {
                          fday,
                          sday,
                          s_time: '09:00 AM',
                          e_time: '10:30 AM',
                          s_time2,
                          e_time2,
                        }
                        handleSetting(data);
                      }}>
                      <Text style={{color: 'white'}}>SAVE</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SettingSection;

const styles = StyleSheet.create({
  ModalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  DetailModalWrapper: {
    width: 300,
    height: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    borderColor: '#EBEAEA',
    borderWidth: 1,
  },
  styleHeader: {
    display: 'flex',
    flex: 1,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
  },
  styleLabel: {
    fontSize: 14,
    lineHeight: 21,
    display: 'flex',
    paddingLeft: 12,
  },
  styleLabelFail: {
    fontSize: 21,
    fontWeight: '500',
    lineHeight: 21,
    display: 'flex',
    paddingLeft: 12,
    color: '#CA5353',
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
  btnAdd: {
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 8,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#949494',
    color: '#949494',
    width: 36,
    height: 36,
    borderRadius: 14,
  },
  stylePicker: {
    width: 246,
    borderWidth: 1,
    height: 45,
    borderColor: 'rgba(36, 52, 69, 0.5)',
    borderRadius: 21,
    color: 'black',
    backgroundColor: '#FFFFFF',
  },
  styleTime: {
    borderWidth: 1,
    borderColor: 'rgba(36, 52, 69, 0.5)',
    borderRadius: 21,
    color: 'black',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
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
