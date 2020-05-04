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
import {ScrollView} from 'react-native-gesture-handler';

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

export const hour = [
  {
    text: '1',
    value: '1',
  },
  {
    text: '2',
    value: '2',
  },
  {
    text: '3',
    value: '3',
  },
  {
    text: '4',
    value: '4',
  },
  {
    text: '5',
    value: '5',
  },
  {
    text: '6',
    value: '6',
  },
  {
    text: '7',
    value: '7',
  },
  {
    text: '8',
    value: '8',
  },
  {
    text: '9',
    value: '9',
  },
  {
    text: '10',
    value: '10',
  },
  {
    text: '11',
    value: '11',
  },
  {
    text: '12',
    value: '12',
  },
];

export const miniute = [
  {
    text: '00',
    value: '00',
  },
  {
    text: '01',
    value: '01',
  },
  {
    text: '02',
    value: '02',
  },
  {
    text: '03',
    value: '03',
  },
  {
    text: '04',
    value: '04',
  },
  {
    text: '05',
    value: '05',
  },
  {
    text: '06',
    value: '06',
  },
  {
    text: '07',
    value: '07',
  },
  {
    text: '08',
    value: '08',
  },
  {
    text: '09',
    value: '09',
  },
  {
    text: '10',
    value: '10',
  },
  {
    text: '11',
    value: '11',
  },
  {
    text: '12',
    value: '12',
  },
  {
    text: '13',
    value: '13',
  },
  {
    text: '14',
    value: '14',
  },
  {
    text: '15',
    value: '15',
  },

  {
    text: '16',
    value: '16',
  },
  {
    text: '17',
    value: '17',
  },

  {
    text: '18',
    value: '18',
  },
  {
    text: '19',
    value: '19',
  },
  {
    text: '20',
    value: '20',
  },
  {
    text: '21',
    value: '21',
  },

  {
    text: '22',
    value: '22',
  },
  {
    text: '23',
    value: '23',
  },
  {
    text: '24',
    value: '24',
  },
  {
    text: '25',
    value: '25',
  },
  {
    text: '26',
    value: '26',
  },

  {
    text: '27',
    value: '27',
  },
  {
    text: '28',
    value: '28',
  },
  {
    text: '29',
    value: '29',
  },
  {
    text: '30',
    value: '30',
  },
  {
    text: '31',
    value: '31',
  },
  {
    text: '32',
    value: '32',
  },

  {
    text: '33',
    value: '33',
  },
  {
    text: '34',
    value: '34',
  },
  {
    text: '35',
    value: '35',
  },
  {
    text: '36',
    value: '36',
  },
  {
    text: '37',
    value: '37',
  },

  {
    text: '38',
    value: '38',
  },
  {
    text: '39',
    value: '39',
  },

  {
    text: '40',
    value: '40',
  },
  {
    text: '41',
    value: '41',
  },
  {
    text: '42',
    value: '42',
  },
  {
    text: '43',
    value: '43',
  },

  {
    text: '44',
    value: '44',
  },
  {
    text: '45',
    value: '45',
  },
  {
    text: '46',
    value: '46',
  },
  {
    text: '47',
    value: '47',
  },
  {
    text: '48',
    value: '48',
  },
  {
    text: '49',
    value: '49',
  },
  {
    text: '50',
    value: '50',
  },

  {
    text: '51',
    value: '51',
  },
  {
    text: '52',
    value: '52',
  },
  {
    text: '53',
    value: '53',
  },
  {
    text: '54',
    value: '54',
  },
  {
    text: '55',
    value: '55',
  },
  {
    text: '56',
    value: '56',
  },
  {
    text: '57',
    value: '57',
  },
  {
    text: '58',
    value: '58',
  },
  {
    text: '59',
    value: '59',
  },
];
export const timeUnit = [
  {
    text: 'AM',
    value: 'AM',
  },
  {
    text: 'PM',
    value: 'PM',
  },
];

class SettingSection extends Component {
  state = {
    fday: null,
    sday: null,
    s_time: '1',
    e_time: '1',
    s_time2: '1',
    e_time2: '1',
    mStartTime: '00',
    mStartTime2: '00',
    mEndTime: '00',
    mEndTime2: '00',
    unitStartTime: null,
    unitEndTime: null,
    unitStartTime2: null,
    unitEndTime2: null,
    addDay: false,
  };

  handleAddDay = () => {
    const {addDay} = this.state;
    this.setState({
      addDay: !addDay,
    });
  };

  handleSelectStartTime = props => {
  };

  render() {
    const {
      addDay,
      fday,
      sday,
      e_time,
      s_time,
      e_time2,
      s_time2,
      mStartTime,
      mStartTime2,
      mEndTime,
      mEndTime2,
      unitStartTime,
      unitEndTime,
      unitStartTime2,
      unitEndTime2,
    } = this.state;
    const {setModalVisible, modalVisible, handleSetting} = this.props;
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
                      style={{height: 40}}
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
                  <Text style={styles.styleLabel}>START TIME :</Text>
                  <View style={styles.stylePickerTime}>
                    <Picker
                      style={{height: 40, width: 86}}
                      selectedValue={s_time}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          s_time: itemValue,
                        })
                      }>
                      {hour.map(s => (
                        <Picker.Item label={s.text} value={s.value} />
                      ))}
                    </Picker>
                    <Picker
                      style={{height: 40, width: 86}}
                      selectedValue={mStartTime}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          mStartTime: itemValue,
                        })
                      }>
                      {miniute.map(s => (
                        <Picker.Item label={s.text} value={s.value} />
                      ))}
                    </Picker>
                    <Picker
                      style={{height: 40, width: 100}}
                      selectedValue={unitStartTime}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          unitStartTime: itemValue,
                        })
                      }>
                      <Picker.Item label={'Unit Time'} />
                      {timeUnit.map(s => (
                        <Picker.Item label={s.text} value={s.value} />
                      ))}
                    </Picker>
                  </View>
                  {/* <DatePicker
                      mode="time"
                      style={{height: 42, width: 156, fontSize: 10}}
                      textColor="#006765"
                      onChange={this.handleSelectStartTime()}
                    />
                    <DatePicker
                      mode="time"
                      style={{height: 42, width: 146}}
                      textColor="#CA5353"
                    /> */}
                  {/* </View> */}
                  <View style={{height: 8}} />
                  <Text style={styles.styleLabel}>END TIME :</Text>
                  <View style={styles.stylePickerTime}>
                    <Picker
                      style={{height: 40, width: 86}}
                      selectedValue={e_time}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          e_time: itemValue,
                        })
                      }>
                      {hour.map(s => (
                        <Picker.Item label={s.text} value={s.value} />
                      ))}
                    </Picker>
                    <Picker
                      style={{height: 40, width: 86}}
                      selectedValue={mEndTime}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          mEndTime: itemValue,
                        })
                      }>
                      {miniute.map(s => (
                        <Picker.Item label={s.text} value={s.value} />
                      ))}
                    </Picker>
                    <Picker
                      style={{height: 40, width: 100}}
                      selectedValue={unitEndTime}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          unitEndTime: itemValue,
                        })
                      }>
                      <Picker.Item label={'Unit Time'} />
                      {timeUnit.map(s => (
                        <Picker.Item label={s.text} value={s.value} />
                      ))}
                    </Picker>
                  </View>
                  {addDay ? (
                    <View style={{marginTop: 8}}>
                      <Text style={styles.styleLabel}>SELECT DAY2 :</Text>
                      <View style={styles.stylePicker}>
                        <Picker
                          style={{height: 40}}
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
                      <Text style={styles.styleLabel}>START TIME :</Text>
                      <View style={styles.stylePickerTime}>
                        <Picker
                          style={{height: 40, width: 86}}
                          selectedValue={s_time2}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({
                              s_time2: itemValue,
                            })
                          }>
                          {hour.map(s => (
                            <Picker.Item label={s.text} value={s.value} />
                          ))}
                        </Picker>
                        <Picker
                          style={{height: 40, width: 86}}
                          selectedValue={mStartTime2}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({
                              mStartTime2: itemValue,
                            })
                          }>
                          {miniute.map(s => (
                            <Picker.Item label={s.text} value={s.value} />
                          ))}
                        </Picker>
                        <Picker
                          style={{height: 40, width: 100}}
                          selectedValue={unitStartTime2}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({
                              unitStartTime2: itemValue,
                            })
                          }>
                          <Picker.Item label={'Unit'} />

                          {timeUnit.map(s => (
                            <Picker.Item label={s.text} value={s.value} />
                          ))}
                        </Picker>
                      </View>
                      <Text style={styles.styleLabel}>END TIME :</Text>
                      <View style={styles.stylePickerTime}>
                        <Picker
                          style={{height: 40, width: 86}}
                          selectedValue={e_time2}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({
                              e_time2: itemValue,
                            })
                          }>
                          {hour.map(s => (
                            <Picker.Item label={s.text} value={s.value} />
                          ))}
                        </Picker>
                        <Picker
                          style={{height: 40, width: 86}}
                          selectedValue={mEndTime2}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({
                              mEndTime2: itemValue,
                            })
                          }>
                          {miniute.map(s => (
                            <Picker.Item label={s.text} value={s.value} />
                          ))}
                        </Picker>
                        <Picker
                          style={{height: 40, width: 100}}
                          selectedValue={unitEndTime2}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({
                              unitEndTime2: itemValue,
                            })
                          }>
                          <Picker.Item label={'Unit'} />
                          {timeUnit.map(s => (
                            <Picker.Item label={s.text} value={s.value} />
                          ))}
                        </Picker>
                      </View>
                      {/* <View style={styles.styleTime}>
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
                      </View> */}
                    </View>
                  ) : (
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
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

                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: 8,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginBottom: 16,
                    }}>
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
                          s_time: `${s_time}:${mStartTime} ${unitStartTime}`,
                          e_time: `${e_time}:${mEndTime} ${unitEndTime}`,
                          s_time2:
                            s_time2 === null
                              ? null
                              : `${s_time2}:${mStartTime2} ${unitStartTime2}`,
                          e_time2:
                            e_time2 === null
                              ? null
                              : `${e_time2}:${mEndTime2} ${unitEndTime2}`,
                        };
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
  stylePickerTime: {
    width: 272,
    borderWidth: 1,
    height: 40,
    borderColor: 'rgba(36, 52, 69, 0.5)',
    borderRadius: 21,
    color: 'black',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
  },
  stylePicker: {
    width: 272,
    borderWidth: 1,
    height: 40,
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
