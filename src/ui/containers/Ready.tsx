import React from 'react'
import { Component } from 'react'
import { TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native'

export default class Ready extends Component {
  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <View>
          <Text>Hello World!</Text>
          <TouchableWithoutFeedback onPress={this.props.onPress}>
            <Text>Hide Modal</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}
