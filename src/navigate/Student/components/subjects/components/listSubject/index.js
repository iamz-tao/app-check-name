import React from 'react';
import {connect} from 'react-redux';
import {DotsLoader, TextLoader} from 'react-native-indicator';
import NavigationServices from '../../../../../NavigationServices';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableHighlight,
  Picker,
  Modal,
  Image,
} from 'react-native';

const SubjectList = props => {
  return (
    <ScrollView style={{backgroundColor: '#ffffff'}}>
      <View style={styles.Column}>
        <View style={styles.Wrapper}>
          <View style={styles.Column}>
            <View style={styles.ItemWrapper}>
              <View style={styles.Row}>
                <View style={(styles.ListDetail, {flex: 2})}>
                  <Text View style={styles.ItemSpan}>
                    Digital Labolatory
                  </Text>
                </View>
                <View style={(styles.SubjectList, {flex: 1})}>
                  <Text View style={styles.ItemSpan}>
                    <Text style={{color: '#0038FF'}}> Pending </Text>
                  </Text>
                </View>
                <View
                  style={
                    (styles.SubjectList,
                    {flex: 1, alignItems: 'flex-end', paddingRight: 8})
                  }>
                  <TouchableHighlight
                    style={styles.btnDrop}
                    onPress={() => {
                      NavigationServices.navigate('StudentSubjectRegister');
                    }}>
                    <Text style={{color: 'white', fontSize: 10}}>DROP</Text>
                  </TouchableHighlight>
                  {/* <Text>xxxxx</Text> */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SubjectList;

const styles = StyleSheet.create({
  Wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '90%',
  },
  ItemWrapper: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D0CDCD',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  DeleteWrapper: {
    display: 'flex',
    width: 128,
    justifyContent: 'center',
  },
  Column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 6,
    width: '100%',
  },
  Row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 50,
    width: '100%',
    padding: 4,
  },
  ItemSpan: {
    fontSize: 14,
    fontFamily: 'kanit',
    fontWeight: '600',
    paddingLeft: 8,
  },
  OtherWrapper: {
    display: 'flex',
    lineHeight: 40,
    paddingLeft: 4,
  },
  btnDrop: {
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#CA5353',
    borderColor: '#CA5353',
    color: '#ffffff',
    width: 52,
    height: 22,
    borderRadius: 21,
  },
});
