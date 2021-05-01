import 'react-native-gesture-handler';
import React from 'react';
import MainScreen from './src/screens/MainScreen';
import {NavigationContainer} from '@react-navigation/native';

export const App = () => {
  return <NavigationContainer>{<MainScreen />}</NavigationContainer>;
};
