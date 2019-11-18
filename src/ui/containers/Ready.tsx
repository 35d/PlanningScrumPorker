import React from 'react';
import { Component } from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import BigCard from '../components/BigCard';
import Result from '../containers/Result';
import { NavigatorIOS } from 'react-native';

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
  point: string;
  navigator?: any;
  onPress: (modalVisible: boolean) => void;
}

interface State {
  textOpacity: Animated.Value;
}

export default class ReadyComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      textOpacity: new Animated.Value(1),
    };
    console.log('=== Ready ===');
    console.log(props);
    const onPress = this.props.navigation.getParam('onPress', null);
    console.log(onPress);
    const point = this.props.navigation.getParam('point', null);
    console.log(point);
  }

  onPressReadyCard = () => {
    Animated.timing(this.state.textOpacity, {
      toValue: 0,
      duration: 150,
    }).start();
    setTimeout(() => {
      this.props.navigation.push('Result', {
        onPress: this.props.navigation.getParam('onPress', null),
        point: this.props.navigation.getParam('point', null),
      });
    }, 150);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.onPressReadyCard();
          }}
        >
          <View>
            <BigCard point={'READY!'} textOpacity={this.state.textOpacity} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
