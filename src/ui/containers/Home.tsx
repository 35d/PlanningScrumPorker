import React from 'react'
import { Component } from 'react'
import {
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Card from '../components/Card'
import Ready from '../containers/Ready'
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

interface Props {
  navigator: any
}

interface State {
  modalVisible: boolean
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible })
  }

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
        <TouchableWithoutFeedback
          onPress={() => {
            this.setModalVisible(true)
          }}
        >
          <View style={styles.body}>{this.renderCards()}</View>
        </TouchableWithoutFeedback>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('close modal')}
        >
          <Ready onPress={() => this.setModalVisible(false)} />
        </Modal>
      </View>
    )
  }
}
