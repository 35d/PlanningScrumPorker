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
  title: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 45,
  },
  body: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
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

class ReadyComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      textOpacity: new Animated.Value(1),
    };
  }

  onPressReadyCard = () => {
    Animated.timing(this.state.textOpacity, {
      toValue: 0,
      duration: 150,
    }).start();
    setTimeout(() => {
      this.props.navigator.replace({
        component: Result,
        passProps: {
          onPress: this.props.onPress,
          point: this.props.point,
        },
        navigationBarHidden: true,
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

export default class Ready extends Component<Props> {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ReadyComponent,
          title: '',
          passProps: {
            onPress: this.props.onPress,
            point: this.props.point,
          },
          navigationBarHidden: true,
        }}
        style={{ flex: 1 }}
      />
    );
  }
}
