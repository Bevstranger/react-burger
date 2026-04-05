import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../api/supabase';
import {
	registerUser as registerUserApi,
	loginUser as loginUserApi,
	logoutUser as logoutUserApi,
	getCurrentUser as getCurrentUserApi,
} from '../../api/api';

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
		baseUrl: '',
		prepareHeaders,
	}),
	endpoints: (builder) => ({
		login: builder.mutation<TAuthResponse, { email: string; password: string }>(
			{
				queryFn: async ({ email, password }) => {
					try {
						const { data, error } = await loginUserApi(email, password);
						if (error) throw new Error(error.message);

						const accessToken = data.session?.access_token || email;
						localStorage.setItem('accessToken', accessToken);
						localStorage.setItem(
							'refreshToken',
							data.session?.refresh_token || ''
						);

						return {
							data: {
								success: true,
								accessToken,
								refreshToken: data.session?.refresh_token || '',
								user: {
									email: data.user?.email || email,
									name: data.user?.user_metadata?.name || '',
								},
							},
						};
					} catch (error) {
						return {
							error: {
								status: 500,
								data: (error as Error).message,
							},
						};
					}
				},
			}
		),
		register: builder.mutation<
			TAuthResponse,
			{ name: string; email: string; password: string }
		>({
			queryFn: async ({ name, email, password }) => {
				try {
					const { data, error } = await registerUserApi(email, password, name);
					if (error) throw new Error(error.message);

					const accessToken = data.session?.access_token || email;
					localStorage.setItem('accessToken', accessToken);
					localStorage.setItem(
						'refreshToken',
						data.session?.refresh_token || ''
					);

					return {
						data: {
							success: true,
							accessToken,
							refreshToken: data.session?.refresh_token || '',
							user: {
								email,
								name,
							},
						},
					};
				} catch (error) {
					return {
						error: {
							status: 500,
							data: (error as Error).message,
						},
					};
				}
			},
		}),
		logout: builder.mutation<TLogoutResponse, void>({
			queryFn: async () => {
				try {
					await logoutUserApi();
					localStorage.removeItem('refreshToken');
					localStorage.removeItem('accessToken');
					return { data: { success: true, message: 'Logged out' } };
				} catch (error) {
					return {
						error: {
							status: 500,
							data: (error as Error).message,
						},
					};
				}
			},
			invalidatesTags: ['User'],
		}),
		getUser: builder.query<{ email: string; name: string }, void>({
			queryFn: async () => {
				try {
					const user = await getCurrentUserApi();
					if (!user) {
						return { data: { email: '', name: '' } };
					}
					return {
						data: {
							email: user.email || '',
							name: (user.user_metadata as any)?.name || '',
						},
					};
				} catch (error) {
					return {
						error: {
							status: 500,
							data: (error as Error).message,
						},
					};
				}
			},
			providesTags: ['User'],
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useGetUserQuery,
} = authApi;
