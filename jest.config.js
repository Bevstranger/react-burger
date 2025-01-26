module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': [
			'babel-jest',
			{ configFile: './babel.config.js' },
		],
	},
	transformIgnorePatterns: [
		'node_modules/(?!fetch-mock/esm)', // Транспилируем только ESM-версию
	],
	globals: {
		'ts-jest': {
			babelConfig: true,
		},
	},
};
