import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';

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
});

// TODO 共通化
interface Card {
  point: string;
  textOpacity: Animated.Value;
}

const BigCard = (props: Card) => (
  <View style={styles.bigCard}>
    <Animated.Text style={[styles.text, {opacity: props.textOpacity}]}>{props.point}</Animated.Text>
  </View>
);

export default BigCard;
