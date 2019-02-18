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
        flex: 1,
        backgroundColor: '#00478F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#FFF',
        height: 30,
        width: 30,
    },
});
var Card = function (props) { return (react_1.default.createElement(react_native_1.View, { style: styles.card },
    react_1.default.createElement(react_native_1.Text, null, props.point))); };
var fiboArray = [
    '0',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '21',
    '34',
    '55',
    '89',
    '144',
    '？',
    '∞',
    '☕',
];
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderCards = function () {
            var cards = [];
            fiboArray.forEach(function (item) {
                cards.push(Card({ point: item }));
            });
            return cards;
        };
        return _this;
    }
    Home.prototype.render = function () {
        return react_1.default.createElement(react_native_1.View, { style: styles.container }, this.renderCards());
    };
    return Home;
}(react_2.Component));
exports.default = Home;
