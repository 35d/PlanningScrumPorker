/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Home from './src/ui/containers/Home';
import Ready from './src/ui/containers/Ready';
import Result from './src/ui/containers/Result';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class Hello extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  didFocusSubscription = this.props.navigation.addListener(
    'willBlur',
    payload => {
      console.log('@@@@@@@@@@@ willBlur');
    },
  );

  render() {
    return (
      <View>
        <Text>Heloooooooo</Text>
        <Text
          style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}
          onPress={() => {
            this.props.navigation.push('Detail');
            this.didFocusSubscription.remove();
          }}
        >
          to Detail
        </Text>
      </View>
    );
  }
}

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
