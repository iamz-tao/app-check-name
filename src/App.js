/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableHighlight
} from 'react-native';

import AppNavigator from './navigate/AppNavigator'

export default class App extends Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}


