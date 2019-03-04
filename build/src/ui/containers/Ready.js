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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var react_native_1 = require("react-native");
var BigCard_1 = __importDefault(require("../components/BigCard"));
var Result_1 = __importDefault(require("../containers/Result"));
var react_native_2 = require("react-native");
var styles = react_native_1.StyleSheet.create({
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
});
var ReadyComponent = /** @class */ (function (_super) {
    __extends(ReadyComponent, _super);
    function ReadyComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.onPressReadyCard = function () {
            react_native_1.Animated.timing(_this.state.textOpacity, {
                toValue: 0,
                duration: 150,
            }).start();
            setTimeout(function () {
                _this.props.navigator.replace({
                    component: Result_1.default,
                    passProps: {
                        onPress: _this.props.onPress,
                        point: _this.props.point,
                    },
                    navigationBarHidden: true,
                });
            }, 150);
        };
        _this.state = {
            textOpacity: new react_native_1.Animated.Value(1),
        };
        return _this;
    }
    ReadyComponent.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () {
                    _this.onPressReadyCard();
                } },
                react_1.default.createElement(react_native_1.View, null,
                    react_1.default.createElement(BigCard_1.default, { point: 'READY!', textOpacity: this.state.textOpacity })))));
    };
    return ReadyComponent;
}(react_2.Component));
var Ready = /** @class */ (function (_super) {
    __extends(Ready, _super);
    function Ready() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ready.prototype.render = function () {
        return (react_1.default.createElement(react_native_2.NavigatorIOS, { initialRoute: {
                component: ReadyComponent,
                title: '',
                passProps: {
                    onPress: this.props.onPress,
                    point: this.props.point,
                },
                navigationBarHidden: true,
            }, style: { flex: 1 } }));
    };
    return Ready;
}(react_2.Component));
exports.default = Ready;
