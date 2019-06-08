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
import { Size } from '../../util/Size';

interface Props {
  visible: boolean;
  onPress: Function;
  currentIndex: number;
  data: Array<string>;
  styleObj: Object;
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    backgroundColor: '#FFF',
    width: Size.drawerWidth,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: -Size.drawerWidth,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
});

export default class Drawer extends Component<Props> {
  render() {
    return (
      <Animated.View style={[styles.container, this.props.styleObj]}>
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
