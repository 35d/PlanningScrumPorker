import React from 'react';
import { Component } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Card from '../components/Card';
import Drawer from '../components/Drawer';
import Ready from '../containers/Ready';
import fiboArray from '../../util/FiboArray';
import byteArray from '../../util/ByteArray';
import squaringArray from '../../util/SquaringArray';
import tShirtArray from '../../util/TShirtArray';

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
  shadow: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000055',
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
  drawerVisible: boolean;
  drawerPosition: Animated.Value;
}

const arrayMap: { [key: string]: Array<string> } = {
  Fibonacci: fiboArray,
  Byte: byteArray,
  Squaring: squaringArray,
  TShirt: tShirtArray,
};

const typeArray: Array<string> = ['Fibonacci', 'Squaring', 'Byte', 'TShirt'];

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      point: '',
      opacity: new Animated.Value(1),
      close: false,
      currentIndex: 0,
      drawerVisible: false,
      drawerPosition: new Animated.Value(
        -(Dimensions.get('window').width - 54),
      ),
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

  onPressDrawerMenu = (index: number) => {
    this.setState({ currentIndex: index, drawerVisible: false });
    Animated.timing(this.state.drawerPosition, {
      duration: 200,
      toValue: -(Dimensions.get('window').width - 54),
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Drawer
          visible={this.state.drawerVisible}
          onPress={this.onPressDrawerMenu}
          position={this.state.drawerPosition}
          currentIndex={this.state.currentIndex}
          typeArray={typeArray}
        />
        <View
          style={{
            position: 'absolute',
            top: 60,
            left: 24,
            justifyContent: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({
                drawerVisible: true,
              });
              Animated.timing(this.state.drawerPosition, {
                duration: 200,
                toValue: 0,
              }).start();
            }}
          >
            <View style={{ width: 45, height: 45 }}>
              <Image
                source={require('../../assets/menu.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.shadow,
            !this.state.drawerVisible && { display: 'none' },
          ]}
        />
        <Animated.Text style={[styles.title, { opacity: this.state.opacity }]}>
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
