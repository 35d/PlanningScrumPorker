"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var ox = (react_native_1.Dimensions.get('window').width - 307) / 2;
var oy = (react_native_1.Dimensions.get('window').height - 20 - 307) / 2;
var styles = react_native_1.StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        height: 77,
        width: 77,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 17,
        marginBottom: 34,
    },
    text: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#00478F',
    },
});
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(props) {
        var _this = _super.call(this, props) || this;
        _this.cardRef = react_1.createRef();
        _this.expandCard = function () {
            _this.setState({
                isExpanded: true,
            });
            if (_this.cardRef.current) {
                _this.cardRef.current.measure(function (x, y) {
                    react_native_1.Animated.timing(_this.state.width, {
                        toValue: 307,
                        duration: 400,
                    }).start();
                    react_native_1.Animated.timing(_this.state.height, {
                        toValue: 307,
                        duration: 400,
                    }).start();
                    react_native_1.Animated.timing(_this.state.x, {
                        toValue: -x + ox - 17,
                        duration: 400,
                    }).start();
                    react_native_1.Animated.timing(_this.state.y, {
                        toValue: -y + oy - 145,
                        duration: 400,
                    }).start();
                    react_native_1.Animated.timing(_this.state.borderRadius, {
                        toValue: 38,
                        duration: 400,
                    }).start();
                });
            }
        };
        _this.state = {
            width: new react_native_1.Animated.Value(77),
            height: new react_native_1.Animated.Value(77),
            isExpanded: false,
            x: new react_native_1.Animated.Value(0),
            y: new react_native_1.Animated.Value(0),
            borderRadius: new react_native_1.Animated.Value(8),
            opacity: new react_native_1.Animated.Value(1),
        };
        return _this;
    }
    Card.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.state.isExpanded === true && this.props.resultClose === true) {
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(this.state.width, {
                    toValue: 77,
                    duration: 400,
                }),
                react_native_1.Animated.timing(this.state.height, {
                    toValue: 77,
                    duration: 400,
                }),
                react_native_1.Animated.timing(this.state.x, {
                    toValue: 0,
                    duration: 400,
                }),
                react_native_1.Animated.timing(this.state.y, {
                    toValue: 0,
                    duration: 400,
                }),
                react_native_1.Animated.timing(this.state.borderRadius, {
                    toValue: 8,
                    duration: 400,
                }),
            ]).start(function () {
                _this.setState({
                    isExpanded: false,
                });
            });
        }
    };
    Card.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_native_1.View, { ref: this.cardRef, style: { zIndex: this.state.isExpanded ? 1000 : 0 } },
            react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () {
                    _this.props.onPress(_this.props.point, true);
                    _this.expandCard();
                } },
                react_1.default.createElement(react_native_1.Animated.View, { style: [
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
                    ] },
                    react_1.default.createElement(react_native_1.Text, { style: styles.text }, this.state.isExpanded ? '' : this.props.point))),
            this.state.isExpanded ? (react_1.default.createElement(react_native_1.Animated.View, { style: [styles.card, { opacity: this.props.opacity }] },
                react_1.default.createElement(react_native_1.Text, { style: styles.text }, this.props.point))) : null));
    };
    return Card;
}(react_1.Component));
exports.default = Card;
