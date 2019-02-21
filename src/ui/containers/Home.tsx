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
  opacity: Animated.Value;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      point: '',
      opacity: new Animated.Value(1),
      close: false,
    };
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  renderCards = () => {
    const cards: Array<JSX.Element> = [];
    fiboArray.forEach(point => {
      cards.push(<Card point={point} onPress={this.onPressCard} key={point} opacity={this.state.opacity} resultClose={this.state.close} />);
    });
    return cards;
  };

  onPressCard = (point: string, modalVisible: boolean) => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 400,
    }).start();
    setTimeout(() => {
      this.setState({
        modalVisible,
        point,
      });
    }, 370);
  };

  onPressResultCard = (modalVisible: boolean) => {
    this.setState({
      modalVisible,
      close: true,
    });
    setTimeout(() => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 400,
      }).start();
      this.setState({
        close: false,
      });
    }, 370);
  };


  render() {
    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.title, {opacity: this.state.opacity}]}>Fibonacci</Animated.Text>
        <View style={styles.body}>{this.renderCards()}</View>
        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('close modal')}
        >
          <Ready
            navigator={this.props.navigator}
            onPress={() => this.onPressResultCard(false)}
            point={this.state.point}
          />
        </Modal>
      </View>
    );
  }
}
