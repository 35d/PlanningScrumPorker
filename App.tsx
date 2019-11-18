/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Home from './src/ui/containers/Home';
import Ready from './src/ui/containers/Ready';
import Result from './src/ui/containers/Result';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    Home,
    Ready,
    Result,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig: () => ({ screenInterpolator: () => null }),
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = function app() {
  return <AppContainer />;
};

export default App;
