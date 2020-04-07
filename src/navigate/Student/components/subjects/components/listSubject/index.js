import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import NavigationServices from '../../../../../NavigationServices';

const SubjectList = props => {
  const {subjects, handleDrop, token} = props;
  // console.log('subjects', subjects);
  return (
    <ScrollView style={{backgroundColor: '#ffffff'}}>
      <View style={styles.Column}>
        <View style={styles.Wrapper}>
          {subjects !== null &&
            subjects.registrations.length > 0 &&
            subjects.registrations.map(s => (
              <View style={styles.Column}>
                <View style={styles.ItemWrapper}>
                  <View style={styles.Row}>
                    <View style={(styles.ListDetail, {flex: 2})}>
                      <Text View style={styles.ItemSpan}>
                        {s.subject_name}
                      </Text>
                    </View>
                    <View style={(styles.ListDetail, {width: 66})}>
                      <Text
                        // View
                        style={styles.ItemSpan}>
                        {s.section_number}
                      </Text>
                    </View>
                    <View style={styles.ListDetail}>
                      {/* <Text View style={styles.ItemSpan}> */}
                      {/* {s.status === 'APPROVE' && ( */}
                      <TouchableHighlight
                        style={{textDecorationLine: 'underline'}}
                        onPress={() => {
                          NavigationServices.navigate('StudentListCheckName', {
                            token,
                            subject_name: s.subject_name,
                            section_number: s.section_number,
                          });
                        }}>
                        <Text
                          style={{
                            color: '#1AB433',
                            textDecorationLine: 'underline',
                          }}>
                          history
                        </Text>
                      </TouchableHighlight>
                      {/* )}
                        {s.status === 'PENDING' && (
                          <Text style={{color: '#0038FF'}}> Pending </Text>
                        )}
                        {s.status === 'DROP' && (
                          <Text style={{color: '#FF0000'}}> Drop </Text>
                        )} */}
                      {/* </Text> */}
                    </View>
                    <View
                      style={
                        (styles.SubjectList,
                        {width: 56, alignItems: 'flex-end', paddingRight: 8})
                      }>
                      {s.status !== 'DROP' && (
                        <TouchableHighlight
                          style={styles.btnDrop}
                          onPress={() => {
                            handleDrop(s.request_id);
                          }}>
                          <Text style={{color: 'white', fontSize: 10}}>
                            DROP
                          </Text>
                        </TouchableHighlight>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ))}
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
  ListDetail: {
    display: 'flex',
    flex: 1,
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
    minHeight: 42,
    width: '100%',
    padding: 4,
  },
  ItemSpan: {
    fontSize: 12,
    fontFamily: 'kanit',
    fontWeight: '600',
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
    width: 42,
    height: 22,
    borderRadius: 21,
  },
});
