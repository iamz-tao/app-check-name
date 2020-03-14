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
    pickerValues: '',
  };


  render() {
const {pickerValues} = this.state
    // console.log('value',pickerValues)
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}
          presentationStyle="pageSheet">
          <View style={styles.ModalWrapper}>
            <View style={styles.DetailModalWrapper}>
              <View style={{width: '100%', alignItems: 'center'}}>
                <View style={{height: 16}} />
                <View style={{}}>
                    <View style={{height: 40 }}>
                  <Text style={styles.styleHeader}>SETTING SECTION</Text>
                  </View>
                  <Text style={styles.styleLabel}>SELECT DAY :</Text>
                  <View style={styles.stylePicker}>
                  <Picker
                    style={{height: 45}}
                    selectedValue={pickerValues}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        pickerValues: itemValue,
                      })
                    }>
                    {day.map(d => (
                      <Picker.Item label={d.text} value={d.value} />
                    ))}
                  </Picker>
                </View>
                <TouchableHighlight
                style={styles.btnReq}
                onPress={() => {
                //   setModalVisible();
                }}>
                <Text style={{color: 'white'}}>OK</Text>
              </TouchableHighlight>
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
    height: 346,
    // backgroundColor: '#F7F7F7',
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
  stylePicker: {
    width: 246,
    borderWidth: 1,
    height: 45,
    borderColor: 'rgba(36, 52, 69, 0.5)',
    borderRadius: 21,
    color: 'black',
    backgroundColor: '#FFFFFF',
  },
});
