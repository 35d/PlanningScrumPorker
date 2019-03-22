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
var Card_1 = __importDefault(require("../components/Card"));
var Drawer_1 = __importDefault(require("../components/Drawer"));
var Ready_1 = __importDefault(require("../containers/Ready"));
var FiboArray_1 = __importDefault(require("../../util/FiboArray"));
var ByteArray_1 = __importDefault(require("../../util/ByteArray"));
var SquaringArray_1 = __importDefault(require("../../util/SquaringArray"));
var TShirtArray_1 = __importDefault(require("../../util/TShirtArray"));
var styles = react_native_1.StyleSheet.create({
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
var arrayMap = {
    Fibonacci: FiboArray_1.default,
    Byte: ByteArray_1.default,
    Squaring: SquaringArray_1.default,
    TShirt: TShirtArray_1.default,
};
var typeArray = ['Fibonacci', 'Squaring', 'Byte', 'TShirt'];
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.renderCards = function () {
            var cards = [];
            var arrayType = typeArray[_this.state.currentIndex % typeArray.length];
            arrayMap[arrayType].forEach(function (point) {
                cards.push(react_1.default.createElement(Card_1.default, { point: point, onPress: _this.onPressCard, key: point, opacity: _this.state.opacity, resultClose: _this.state.close }));
            });
            return cards;
        };
        _this.onPressCard = function (point, modalVisible) {
            react_native_1.Animated.timing(_this.state.opacity, {
                toValue: 0,
                duration: 400,
            }).start();
            setTimeout(function () {
                _this.setState({
                    modalVisible: modalVisible,
                    point: point,
                });
            }, 370);
        };
        _this.onPressResultCard = function (modalVisible) {
            _this.setState({
                modalVisible: modalVisible,
                close: true,
            });
            setTimeout(function () {
                react_native_1.Animated.timing(_this.state.opacity, {
                    toValue: 1,
                    duration: 400,
                }).start();
                _this.setState({
                    close: false,
                });
            }, 370);
        };
        _this.onPressDrawerMenu = function (index) {
            _this.setState({ currentIndex: index, drawerVisible: false });
            react_native_1.Animated.timing(_this.state.drawerPosition, {
                duration: 200,
                toValue: -(react_native_1.Dimensions.get('window').width - 54),
            }).start();
        };
        _this.state = {
            modalVisible: false,
            point: '',
            opacity: new react_native_1.Animated.Value(1),
            close: false,
            currentIndex: 0,
            drawerVisible: false,
            drawerPosition: new react_native_1.Animated.Value(-(react_native_1.Dimensions.get('window').width - 54)),
        };
        return _this;
    }
    Home.prototype.setModalVisible = function (visible) {
        this.setState({ modalVisible: visible });
    };
    Home.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.StatusBar, { barStyle: "light-content" }),
            react_1.default.createElement(Drawer_1.default, { visible: this.state.drawerVisible, onPress: this.onPressDrawerMenu, position: this.state.drawerPosition, currentIndex: this.state.currentIndex, typeArray: typeArray }),
            react_1.default.createElement(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 60,
                    left: 24,
                    justifyContent: 'flex-start',
                } },
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () {
                        _this.setState({
                            drawerVisible: true,
                        });
                        react_native_1.Animated.timing(_this.state.drawerPosition, {
                            duration: 200,
                            toValue: 0,
                        }).start();
                    } },
                    react_1.default.createElement(react_native_1.View, { style: { width: 45, height: 45 } },
                        react_1.default.createElement(react_native_1.Image, { source: require('../../assets/menu.png'), style: { width: 30, height: 30 } })))),
            react_1.default.createElement(react_native_1.View, { style: [
                    styles.shadow,
                    !this.state.drawerVisible && { display: 'none' },
                ] }),
            react_1.default.createElement(react_native_1.Animated.Text, { style: [styles.title, { opacity: this.state.opacity }] }, typeArray[this.state.currentIndex % typeArray.length]),
            react_1.default.createElement(react_native_1.View, { style: styles.body }, this.renderCards()),
            react_1.default.createElement(react_native_1.Modal, { animationType: "none", transparent: false, visible: this.state.modalVisible, onRequestClose: function () { return console.log('close modal'); } },
                react_1.default.createElement(Ready_1.default, { navigator: this.props.navigator, onPress: function () { return _this.onPressResultCard(false); }, point: this.state.point }))));
    };
    return Home;
}(react_2.Component));
exports.default = Home;
