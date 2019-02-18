import React from 'react'
import { Component } from 'react'
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
} from 'react-native'
import BigCard from '../components/BigCard'
import Result from '../containers/Result'
import { NavigatorIOS } from 'react-native'

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

interface Props {
  point: string
  navigator?: any
  onPress: (modalVisible: boolean) => void
}

class ReadyComponent extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigator.push({
              component: Result,
              passProps: {
                onPress: this.props.onPress,
                point: this.props.point,
              },
              navigationBarHidden: true,
            })
          }
        >
          <View>
            <BigCard point={'READY!'} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default class Ready extends Component<Props> {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ReadyComponent,
          title: '',
          passProps: {
            onPress: this.props.onPress,
            point: this.props.point,
          },
          navigationBarHidden: true,
        }}
        style={{ flex: 1 }}
      />
    )
  }
}
