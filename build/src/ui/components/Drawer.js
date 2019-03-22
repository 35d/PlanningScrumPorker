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
var styles = react_native_1.StyleSheet.create({
    container: {
        zIndex: 100,
        backgroundColor: '#FFF',
        width: react_native_1.Dimensions.get('window').width - 56,
        height: react_native_1.Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        paddingTop: 80,
        paddingHorizontal: 24,
    },
});
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Drawer.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_native_1.Animated.View, { style: [styles.container, { left: this.props.position }] },
            react_1.default.createElement(react_native_1.FlatList, { data: this.props.typeArray, keyExtractor: function (item) { return item; }, extraData: this.props.currentIndex, renderItem: function (_a) {
                    var item = _a.item, index = _a.index;
                    return (react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () { return _this.props.onPress(index); } },
                        react_1.default.createElement(react_native_1.View, { style: [
                                {
                                    borderRadius: 8,
                                    paddingVertical: 4,
                                    paddingHorizontal: 16,
                                    marginBottom: 16,
                                },
                                _this.props.currentIndex === index && {
                                    backgroundColor: '#00478F',
                                },
                            ] },
                            react_1.default.createElement(react_native_1.Text, { style: [
                                    { fontSize: 30, color: '#00478F' },
                                    _this.props.currentIndex === index && {
                                        color: '#FFF',
                                        fontWeight: 'bold',
                                    },
                                ] }, item))));
                } })));
    };
    return Drawer;
}(react_2.Component));
exports.default = Drawer;
