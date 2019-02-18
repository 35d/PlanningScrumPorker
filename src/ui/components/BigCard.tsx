import React from 'react'
import { StyleSheet, Text, View, GestureResponderEvent } from 'react-native'

const styles = StyleSheet.create({
  bigCard: {
    backgroundColor: '#FFF',
    height: 307,
    width: 307,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 17, // TODO 画面サイズからカードのwidth * 3を引いた値から計算する
    marginBottom: 34,
  },
  text: {
    fontSize: 59,
    fontWeight: 'bold',
    color: '#00478F',
  },
})

// TODO 共通化
interface Card {
  point: string
}

const BigCard = (props: Card) => (
  <View style={styles.bigCard}>
    <Text style={styles.text}>{props.point}</Text>
  </View>
)

export default BigCard
