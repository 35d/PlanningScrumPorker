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
var Ready_1 = __importDefault(require("../containers/Ready"));
var FiboArray_1 = __importDefault(require("../../util/FiboArray"));
var styles = react_native_1.StyleSheet.create({
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
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.renderCards = function () {
            var cards = [];
            FiboArray_1.default.forEach(function (item) {
                cards.push(Card_1.default({ point: item, onPress: _this.onPressCard }));
            });
            return cards;
        };
        _this.onPressCard = function (point, modalVisible) {
            _this.setState({
                modalVisible: modalVisible,
                point: point,
            });
        };
        _this.state = {
            modalVisible: false,
            point: '',
        };
        return _this;
    }
    Home.prototype.setModalVisible = function (visible) {
        this.setState({ modalVisible: visible });
    };
    Home.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.Text, { style: styles.title }, "Fibonacci"),
            react_1.default.createElement(react_native_1.View, { style: styles.body }, this.renderCards()),
            react_1.default.createElement(react_native_1.Modal, { animationType: "slide", transparent: false, visible: this.state.modalVisible, onRequestClose: function () { return console.log('close modal'); } },
                react_1.default.createElement(Ready_1.default, { navigator: this.props.navigator, onPress: function () { return _this.setModalVisible(false); }, point: this.state.point }))));
    };
    return Home;
}(react_2.Component));
exports.default = Home;
