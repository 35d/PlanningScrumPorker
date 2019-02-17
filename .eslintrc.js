module.exports = {
	"env": {
		"es6": true,
		"node": true
	},
	"extends": "airbnb",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"react-native",
	],
	"rules": {
		// "no-use-before-define": ["error"]
		// "resolve": {
		// 	"extensions": ['', '.js', '.jsx', '.ts', '.tsx'],
		// 	"src": path.resolve(__dirname, './src')
		// }
	}
};