import '@testing-library/jest-dom';
import 'whatwg-fetch';

process.on('unhandledRejection', (reason) => {
	console.error('Unhandled Rejection:', reason);
	process.exit(1);
});
