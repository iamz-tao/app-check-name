/**
 * @format
 */


import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { Provider } from 'react-redux'
import { name as appName } from './app.json';
import configureStore from './src/configureStore'

const store = configureStore();
const ReduxApp = () => (
    <Provider store={store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);
