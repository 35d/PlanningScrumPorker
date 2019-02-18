import React from 'react'
import { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card'
import fiboArray from '../../util/FiboArray'

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
})

export default class Home extends Component {
  renderCards = () => {
    const cards: Array<JSX.Element> = []
    fiboArray.forEach(item => {
      cards.push(Card({ point: item }))
    })
    return cards
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fibonacci</Text>
        <View style={styles.body}>{this.renderCards()}</View>
      </View>
    )
  }
}
