import React, { Component, createRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { isIPhoneSe } from '../../util/DisplaySize';

const ox = (Dimensions.get('window').width - 307) / 2;
const oy = isIPhoneSe() ?
    (Dimensions.get('window').height + 40 - 307) / 2 : (Dimensions.get('window').height - 20 - 307) / 2;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    height: isIPhoneSe() ? 66 : 77,
    width: isIPhoneSe() ? 66 : 77,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 17, // TODO 画面サイズからカードのwidth * 3を引いた値から計算する
    marginBottom: isIPhoneSe() ? 20 : 34,
  },
  text: {
    fontSize: isIPhoneSe() ? 24 : 34,
    fontWeight: 'bold',
    color: '#00478F',
  },
});

interface Props {
  point: string;
  onPress: (point: string, modalVisible: boolean) => void;
  opacity: Animated.Value;
  resultClose: boolean;
}

interface State {
  width: Animated.Value;
  height: Animated.Value;
  isExpanded: boolean;
  x: Animated.Value;
  y: Animated.Value;
  borderRadius: Animated.Value;
  opacity: Animated.Value;
}

export default class Card extends Component<Props, State> {
  private cardRef = createRef<View>();

  constructor(props: Props) {
    super(props);
    this.state = {
      width: new Animated.Value(isIPhoneSe() ? 66 : 77),
      height: new Animated.Value(isIPhoneSe() ? 66 : 77),
      isExpanded: false,
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      borderRadius: new Animated.Value(8),
      opacity: new Animated.Value(1),
    };
  }

  componentDidUpdate() {
    if (this.state.isExpanded === true && this.props.resultClose === true) {
      Animated.parallel([
        Animated.timing(this.state.width, {
          toValue: isIPhoneSe() ? 66 : 77,
          duration: 400,
        }),
        Animated.timing(this.state.height, {
          toValue: isIPhoneSe() ? 66 : 77,
          duration: 400,
        }),
        Animated.timing(this.state.x, {
          toValue: 0,
          duration: 400,
        }),
        Animated.timing(this.state.y, {
          toValue: 0,
          duration: 400,
        }),
        Animated.timing(this.state.borderRadius, {
          toValue: 8,
          duration: 400,
        }),
      ]).start(() => {
        this.setState({
          isExpanded: false,
        });
      });
    }
  }

  expandCard = () => {
    this.setState({
      isExpanded: true,
    });
    if (this.cardRef.current) {
      this.cardRef.current.measure((x: number, y: number) => {
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
          toValue: 38,
          duration: 400,
        }).start();
      });
    }
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
                top: this.state.y,
                left: this.state.x,
                borderRadius: this.state.borderRadius,
                zIndex: 100,
                opacity: this.state.isExpanded ? 1 : this.props.opacity,
              },
            ]}
          >
            <Text style={styles.text}>
              {this.state.isExpanded ? '' : this.props.point}
            </Text>
            {/*{true && (<Text style={styles.text}>{this.props.point}</Text>)}*/}
          </Animated.View>
        </TouchableWithoutFeedback>
        {this.state.isExpanded ? (
          <Animated.View style={[styles.card, { opacity: this.props.opacity }]}>
            <Text style={styles.text}>{this.props.point}</Text>
          </Animated.View>
        ) : null}
      </View>
    );
  }
}
