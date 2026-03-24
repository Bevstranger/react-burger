export const mockFetch = jest.fn();
global.fetch = mockFetch as jest.Mock;

jest.mock('../services/api/auth', () => ({
	getAccessToken: () => 'test-token',
}));
