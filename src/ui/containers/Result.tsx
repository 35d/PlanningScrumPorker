import React from 'react';
import { Component } from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  GestureResponderEvent,
  Animated,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import BigCard from '../components/BigCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#00478F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  point: string;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  textOpacity: Animated.Value;
}

export default class Result extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      textOpacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.textOpacity, {
      toValue: 1,
      duration: 150,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={this.props.navigation.getParam('onPress', null)}
        >
          <View>
            <BigCard
              point={this.props.navigation.getParam('point', null)}
              fontSize={140}
              textOpacity={this.state.textOpacity}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
