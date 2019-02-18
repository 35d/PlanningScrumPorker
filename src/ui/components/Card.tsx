import React from 'react'
import { TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native'

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
  onPress: (point: string, modalVisible: boolean) => void
}

const Card = (props: CardProps) => (
  <TouchableWithoutFeedback
    onPress={() => {
      props.onPress(props.point, true)
    }}
    key={props.point}
  >
    <View style={styles.card}>
      <Text style={styles.text}>{props.point}</Text>
    </View>
  </TouchableWithoutFeedback>
)

export default Card
