import React from 'react';
import { Component } from 'react';
import {
    Animated,
    Modal,
    StyleSheet,
    StatusBar,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    PanResponder,
    PanResponderInstance, Dimensions,
} from 'react-native';
import Card from '../components/Card';
import Drawer from '../components/Drawer';
import Ready from '../containers/Ready';
import { CardArray } from '../../util/CardArray';
import { Size } from '../../util/Size';
import { isIPhoneSE } from '../../util/DisplaySize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00478F',
    alignItems: 'center',
    paddingTop: isIPhoneSE() ? 40 : 80,
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
    top: isIPhoneSE() ? 35 : 75,
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
  drawerPan: Animated.ValueXY;
}

const arrayMap: { [key: string]: Array<string> } = {
  Fibonacci: CardArray.fibonacci,
  Byte: CardArray.byte,
  Squaring: CardArray.squaring,
  TShirt: CardArray.tShirt,
};

const typeArray: Array<string> = ['Fibonacci', 'Squaring', 'Byte', 'TShirt'];

export default class Home extends Component<Props, State> {
  panResponder: PanResponderInstance = PanResponder.create({});

  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      point: '',
      opacity: new Animated.Value(1),
      close: false,
      currentIndex: 0,
      drawerVisible: false,
      drawerPan: new Animated.ValueXY(),
    };
    this.state.drawerPan.setValue({ x: -Size.drawerWidth, y: 0 });
    this.setPanResponder();
  }

  setPanResponder = () => {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        gestureState.dx !== 0 && gestureState.dy !== 0,
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (this.canNotMoveDrawer(gestureState.dx)) {
          return;
        }
        this.state.drawerPan.setValue({
          x: this.state.drawerVisible
            ? gestureState.dx
            : gestureState.dx - Size.drawerWidth,
          y: 0,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.state.drawerVisible) {
          if (gestureState.dx < -80) {
            this.closeDrawer();
          } else {
            this.openDrawer();
          }
        } else {
          if (gestureState.dx > 80) {
            this.openDrawer();
          } else {
            this.closeDrawer();
          }
        }
      },
    });
  };

  canNotMoveDrawer = (dx: number) => {
    // 限界を超えて「ドロワーを開く」 or 「閉じようとしている」場合に false を返す
    return (
      (this.state.drawerVisible && dx > 0) ||
      (!this.state.drawerVisible && dx < 0)
    );
  };

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
    this.panResponder = PanResponder.create({}); // readyとresultにpanResponderが引き継がれるのを防ぐ
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
    this.setPanResponder();
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
    Animated.spring(this.state.drawerPan, {
      toValue: { x: 0, y: 0 },
      friction: 10,
      tension: 90,
    }).start();
  };

  closeDrawer = () => {
    this.setState({ drawerVisible: false });
    Animated.spring(this.state.drawerPan, {
      toValue: { x: -Size.drawerWidth, y: 0 },
      friction: 10,
      tension: 90,
    }).start();
  };

  render() {
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        <StatusBar barStyle="light-content" />
        <Drawer
          visible={this.state.drawerVisible}
          onPress={this.onPressDrawerMenu}
          currentIndex={this.state.currentIndex}
          data={typeArray}
          styleObj={this.state.drawerPan.getLayout()}
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
