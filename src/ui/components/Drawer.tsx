import React from 'react';
import { Component } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';

interface Props {
  visible: boolean;
  onPress: Function;
  position: Animated.Value;
  currentIndex: number;
  typeArray: Array<string>;
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    backgroundColor: '#FFF',
    width: Dimensions.get('window').width - 56,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
});

export default class Drawer extends Component<Props> {
  render() {
    return (
      <Animated.View style={[styles.container, { left: this.props.position }]}>
        <FlatList
          data={this.props.typeArray}
          keyExtractor={item => item}
          extraData={this.props.currentIndex}
          renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => this.props.onPress(index)}
              >
                <View
                  style={[
                    {
                      borderRadius: 8,
                      paddingVertical: 4,
                      paddingHorizontal: 16,
                      marginBottom: 16,
                    },
                    this.props.currentIndex === index && {
                      backgroundColor: '#00478F',
                    },
                  ]}
                >
                  <Text
                    style={[
                      { fontSize: 30, color: '#00478F' },
                      this.props.currentIndex === index && {
                        color: '#FFF',
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </Animated.View>
    );
  }
}
