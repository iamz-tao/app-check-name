/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import AppNavigator from './navigate/AppNavigator';
import NavigationServices from './navigate/NavigationServices';

export default class App extends Component {
  render() {
    return (
      <AppNavigator
        ref={navigatorRef => {
          NavigationServices.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
