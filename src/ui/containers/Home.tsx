import React from 'react';
import { Component } from 'react';
import { Animated, Modal, StyleSheet, StatusBar, View } from 'react-native';
import Card from '../components/Card';
import Ready from '../containers/Ready';
import fiboArray from '../../util/FiboArray';
import byteArray from '../../util/ByteArray';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00478F',
    alignItems: 'center',
    paddingTop: 80,
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
  close: boolean;
  currentIndex: number;
}

const arrayMap: { [key: string]: Array<string> } = {
  Fibonacci: fiboArray,
  Byte: byteArray,
};

const typeArray: Array<string> = ['Fibonacci', 'Byte'];

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      point: '',
      opacity: new Animated.Value(1),
      close: false,
      currentIndex: 0,
    };
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  renderCards = () => {
    const cards: Array<JSX.Element> = [];
    const arrayType = typeArray[this.state.currentIndex % typeArray.length];
    arrayMap[arrayType].forEach(point => {
      cards.push(
        <Card
          point={point}
          onPress={this.onPressCard}
          key={point}
          opacity={this.state.opacity}
          resultClose={this.state.close}
        />,
      );
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
        <StatusBar barStyle="light-content" />
        <Animated.Text
          style={[styles.title, { opacity: this.state.opacity }]}
          onPress={() => {
            if (this.state.currentIndex === 100) {
              alert('congratulations!!!');
            }
            this.setState({ currentIndex: this.state.currentIndex + 1 });
          }}
        >
          {typeArray[this.state.currentIndex % typeArray.length]}
        </Animated.Text>
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
