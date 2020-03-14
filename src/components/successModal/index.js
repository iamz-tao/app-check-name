import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,
  Image,
} from 'react-native';

const SuccessModal = ({ msg, setModalVisible, modalVisible, status}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        presentationStyle="pageSheet">
        <View style={styles.ModalWrapper}>
          <View style={styles.DetailModalWrapper}>
            <View style={{width: '100%', alignItems: 'center'}}>
              {status === 'SUCCESS' && (
                <Image
                  style={styles.CustomImg}
                  source={require('../../../android/statics/images/success.png')}
                />
              )}
              {status === 'FAILURE' && (
                <Image
                  style={styles.CustomImg}
                  source={require('../../../android/statics/images/icon-failure.png')}
                />
              )}

              <View style={{height: 36}} />
              {status === 'SUCCESS' && (
                              <Text style={styles.styleLabelFail}>SUCCESS
</Text>
              )}
              {status === 'FAILURE' && (
                <Text style={styles.styleLabelFail}>FAILURE
                </Text>
              )}
              <Text style={styles.styleLabel}>{msg}</Text>
              <View style={{height: 26}} />
              <TouchableHighlight
                style={styles.btnReq}
                onPress={() => {
                  setModalVisible();
                }}>
                <Text style={{color: 'white'}}>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
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
    backgroundColor: '#F7F7F7',
    borderRadius: 19,
    borderColor: '#EBEAEA',
    borderWidth: 1,
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
});