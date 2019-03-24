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
  translateX: Animated.Value;
  currentIndex: number;
  data: Array<string>;
}

const drawerWidth = Dimensions.get('window').width - 54;

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    backgroundColor: '#FFF',
    width: drawerWidth,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: -drawerWidth,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
});

export default class Drawer extends Component<Props> {
  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX: this.props.translateX }] },
        ]}
      >
        <FlatList
          data={this.props.data}
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
