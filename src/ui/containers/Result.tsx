import React from 'react';
import { Component } from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  GestureResponderEvent,
} from 'react-native';
import BigCard from '../components/BigCard';

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
  onPress: (event: GestureResponderEvent) => void;
  point: string;
}

export default class Result extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View>
            <BigCard point={this.props.point} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
