import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../api/api';

export type TAuthResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	};
};

export type TLogoutResponse = {
	success: boolean;
	message: string;
};

export const prepareHeaders = (headers: Headers) => {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		headers.set('Authorization', `${accessToken}`);
	}
	headers.set('Content-Type', 'application/json');
	return headers;
};

export const authApi = createApi({
	tagTypes: ['User'],
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders,
	}),
	endpoints: (builder) => ({
		login: builder.mutation<TAuthResponse, { email: string; password: string }>(
			{
				query: (body) => ({
					url: '/auth/login',
					method: 'POST',
					body,
				}),
				transformResponse: (response: TAuthResponse): TAuthResponse => {
					const { refreshToken, accessToken, success } = response;
					if (success && refreshToken && accessToken) {
						localStorage.setItem('refreshToken', refreshToken);
						localStorage.setItem('accessToken', accessToken);
					} else {
						throw new Error(
							'Login failed: missing expected data, check your credentials'
						);
					}
					return response;
				},
			}
		),
		register: builder.mutation<
			TAuthResponse,
			{ name: string; email: string; password: string }
		>({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
			transformResponse: (response: TAuthResponse) => {
				const { refreshToken, accessToken, success } = response;
				if (success && refreshToken && accessToken) {
					localStorage.setItem('refreshToken', refreshToken);
					localStorage.setItem('accessToken', accessToken);
				}
				return response;
			},
		}),
		logout: builder.mutation<TLogoutResponse, { token: string }>({
			query: (body) => ({
				url: '/auth/logout',
				method: 'POST',
				body,
			}),
			transformResponse: (response: TLogoutResponse) => {
				const { success } = response;
				if (success) {
					localStorage.removeItem('refreshToken');
					localStorage.removeItem('accessToken');
				} else {
					console.error('Failed to logout:', response);
				}

				return response;
			},
			invalidatesTags: ['User'],
		}),
		refresh: builder.mutation({
			query: ({ token }) => {
				return {
					url: '/auth/token',
					method: 'POST',
					body: {
						token,
					},
				};
			},
		}),
		forgotPassword: builder.mutation({
			query: (body) => ({
				url: '/password-reset',
				method: 'POST',
				body,
			}),
		}),
		resetPassword: builder.mutation({
			query: (body) => ({
				url: '/password-reset/reset',
				method: 'POST',
				body,
			}),
		}),
		updateUser: builder.mutation({
			query: (body) => ({
				url: '/auth/user',
				method: 'PATCH',
				body,
			}),
		}),
		getUser: builder.query({
			query: () => ({
				url: '/auth/user',
				method: 'GET',
			}),
			providesTags: ['User'],
		}),
	}),
});

// {
// 	"status": 401,
// 	"data": {
// 	"success": false,
// 		"message": "You should be authorised"
// }
// }

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useRefreshMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useUpdateUserMutation,
	useGetUserQuery,
} = authApi;
