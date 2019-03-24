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
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import Card from '../components/Card';
import Drawer from '../components/Drawer';
import Ready from '../containers/Ready';
import fiboArray from '../../util/FiboArray';
import byteArray from '../../util/ByteArray';
import squaringArray from '../../util/SquaringArray';
import tShirtArray from '../../util/TShirtArray';

const drawerWidth = Dimensions.get('window').width - 54;

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
  drawerShadow: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000055',
  },
  drawerIcon: {
    position: 'absolute',
    top: 75,
    left: 24,
    justifyContent: 'flex-start',
  },
  iconWrapper: {
    width: 45,
    height: 45,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#FFF',
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
  drawerTranslateX: Animated.Value;
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
      drawerTranslateX: new Animated.Value(0),
    };
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        let dx = gestureState.dx;
        let dy = gestureState.dy;
        if (dx > 0 && (dy <= 10 && dy >= -10)) {
          this.openDrawer();
        } else if (dx < 0 && (dy <= 10 && dy >= -10)) {
          this.closeDrawer();
        }
      },
    });
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
    this.setState({ currentIndex: index });
    this.closeDrawer();
  };

  openDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
    Animated.timing(this.state.drawerTranslateX, {
      duration: 200,
      toValue: drawerWidth,
      useNativeDriver: true,
    }).start();
  };

  closeDrawer = () => {
    this.setState({ drawerVisible: false });
    Animated.timing(this.state.drawerTranslateX, {
      duration: 200,
      toValue: -drawerWidth,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        <StatusBar barStyle="light-content" />
        <Drawer
          visible={this.state.drawerVisible}
          onPress={this.onPressDrawerMenu}
          translateX={this.state.drawerTranslateX}
          currentIndex={this.state.currentIndex}
          data={typeArray}
        />
        <Animated.View
          style={[styles.drawerIcon, { opacity: this.state.opacity }]}
        >
          <TouchableOpacity onPress={this.openDrawer}>
            <View style={styles.iconWrapper}>
              <Image
                source={require('../../assets/menu.png')}
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
        <TouchableWithoutFeedback onPress={this.closeDrawer}>
          <View
            style={[
              styles.drawerShadow,
              !this.state.drawerVisible && { display: 'none' },
            ]}
          />
        </TouchableWithoutFeedback>
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
