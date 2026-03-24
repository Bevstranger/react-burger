module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: { node: 'current' },
				modules: 'commonjs', // Форсируем преобразование в CommonJS
			},
		],
		'@babel/preset-typescript',
		'@babel/preset-react', // Если используется JSX
	],
};
