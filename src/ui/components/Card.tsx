import React, { Component } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  Dimensions,
  LayoutAnimation,
} from 'react-native';

const ox = (Dimensions.get('window').width - 307) / 2;
const oy = (Dimensions.get('window').height - 40 - 307) / 2;

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
});

interface Props {
  point: string;
  onPress: (point: string, modalVisible: boolean) => void;
}

interface State {
  width: Animated.Value;
  height: Animated.Value;
  isExpanded: boolean;
  x: Animated.Value;
  y: Animated.Value;
  borderRadius: Animated.Value;
}

export default class Card extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      width: new Animated.Value(77),
      height: new Animated.Value(77),
      isExpanded: false,
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      borderRadius: new Animated.Value(8),
    };
    this.cardRef = React.createRef();
  }

  expandCard = () => {
    this.setState({
      isExpanded: true,
    });
    this.cardRef.current.measure((x, y) => {
      Animated.timing(this.state.width, {
        toValue: 307,
        duration: 400,
      }).start();
      Animated.timing(this.state.height, {
        toValue: 307,
        duration: 400,
      }).start();
      Animated.timing(this.state.x, {
        toValue: -x + ox - 17,
        duration: 400,
      }).start();
      Animated.timing(this.state.y, {
        toValue: -y + oy - 145,
        duration: 400,
      }).start();
      Animated.timing(this.state.borderRadius, {
        toValue: 20,
        duration: 400,
      }).start();
    });
  };

  render() {
    return (
      <View
        ref={this.cardRef}
        style={{ zIndex: this.state.isExpanded ? 1000 : 0 }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.onPress(this.props.point, true);
            this.expandCard();
          }}
        >
          <Animated.View
            style={[
              styles.card,
              {
                width: this.state.width,
                height: this.state.height,
                position: this.state.isExpanded ? 'absolute' : 'relative',
                // top: this.state.isExpanded
                //   ? this.state.y
                //   : this.state.y,
                // left: this.state.isExpanded
                //   ? this.state.x
                //   : this.state.x,
                top: this.state.y,
                left: this.state.x,
                borderRadius: this.state.borderRadius,
                // transform: [
                //   { translateX: this.state.isExpanded ? -this.state.x + ox - 17 : 0 },
                //   { translateY: this.state.isExpanded ? -this.state.y + oy - 128 :0 },
                // ],
                zIndex: 100,
              },
            ]}
          >
            <Text style={styles.text}>{this.state.isExpanded ? '' : this.props.point}</Text>
            {/*{true && (<Text style={styles.text}>{this.props.point}</Text>)}*/}
          </Animated.View>
        </TouchableWithoutFeedback>
        {this.state.isExpanded ? (
          <View style={[styles.card]} >
            <Text style={styles.text}>{this.props.point}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
