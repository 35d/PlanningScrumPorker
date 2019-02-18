import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    height: 77,
    width: 77,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 17, // TODO 画面サイズからカードのwidth * 3を引いた値から計算する
    marginBottom: 34,
  },
  text: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#00478F',
  },
})

interface CardProps {
  point: string
}

const Card = (props: CardProps) => (
  <View style={styles.card} key={props.point}>
    <Text style={styles.text}>{props.point}</Text>
  </View>
)

export default Card
