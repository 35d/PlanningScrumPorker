"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var styles = react_native_1.StyleSheet.create({
    bigCard: {
        backgroundColor: '#FFF',
        height: 307,
        width: 307,
        borderRadius: 38,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 17,
        marginBottom: 34,
    },
    text: {
        fontSize: 59,
        fontWeight: 'bold',
        color: '#00478F',
    },
});
var BigCard = function (props) { return (react_1.default.createElement(react_native_1.View, { style: styles.bigCard },
    react_1.default.createElement(react_native_1.Animated.Text, { style: [
            styles.text,
            {
                opacity: props.textOpacity,
                fontSize: props.fontSize ? props.fontSize : 59,
            },
        ] }, props.point))); };
exports.default = BigCard;
