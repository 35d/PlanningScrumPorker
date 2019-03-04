/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Home from './build/src/ui/containers/Home';
import { NavigatorIOS } from 'react-native';

const App = function app() {
  return (
    <NavigatorIOS
      initialRoute={{
        component: Home,
        title: '',
        navigationBarHidden: true,
      }}
      style={{ flex: 1 }}
    />
  );
};

export default App;
