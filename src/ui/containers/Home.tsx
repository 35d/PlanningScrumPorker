import React from 'react';
import { Component } from 'react';
import { Animated, Modal, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import Ready from '../containers/Ready';
import fiboArray from '../../util/FiboArray';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

interface Props {
  navigator: any;
}

interface State {
  modalVisible: boolean;
  point: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      point: '',
    };
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  renderCards = () => {
    const cards: Array<JSX.Element> = [];
    fiboArray.forEach(point => {
      cards.push(<Card point={point} onPress={this.onPressCard} key={point} />);
    });
    return cards;
  };

  onPressCard = (point: string, modalVisible: boolean) => {
    setTimeout(() => {
      this.setState({
        modalVisible,
        point,
      });
    }, 370);
  };

  render() {
    return (
      <Animated.View style={styles.container}>
        <Text style={styles.title}>Fibonacci</Text>
        <View style={styles.body}>{this.renderCards()}</View>
        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('close modal')}
        >
          <Ready
            navigator={this.props.navigator}
            onPress={() => this.setModalVisible(false)}
            point={this.state.point}
          />
        </Modal>
      </Animated.View>
    );
  }
}
