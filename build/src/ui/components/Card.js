"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
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
        fontSize: 38,
        fontWeight: 'bold',
        color: '#00478F',
    },
});
var Card = function (props) { return (react_1.default.createElement(react_native_1.View, { style: styles.card, key: props.point },
    react_1.default.createElement(react_native_1.Text, { style: styles.text }, props.point))); };
exports.default = Card;
