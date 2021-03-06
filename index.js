import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/store/Store';
import React from 'react';
const store = configureStore();

const TaskManagerApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => TaskManagerApp);
