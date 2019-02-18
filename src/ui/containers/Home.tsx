import React from 'react'
import { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00478F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    height: 30,
    width: 30,
  },
})

interface CardProps {
  point: string
}

const Card = (props: CardProps) => (
  <View style={styles.card}>
    <Text>{props.point}</Text>
  </View>
)

const fiboArray = [
  '0',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '21',
  '34',
  '55',
  '89',
  '144',
  '？',
  '∞',
  '☕',
]

export default class Home extends Component {
  renderCards = () => {
    const cards: Array<JSX.Element> = []
    fiboArray.forEach(item => {
      cards.push(Card({ point: item }))
    })
    return cards
  }
  render() {
    return <View style={styles.container}>{this.renderCards()}</View>
  }
}
