import React from 'react'
import { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class Home extends Component {
  sum = (num1: number, num2: number) => {
    return num1 + num2
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up Home.js to start working on your app!</Text>
        <Text>{this.sum(1, 2)}</Text>
      </View>
    )
  }
}
