import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://norma.nomoreparties.space/api';

const prepareHeaders = (headers) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    headers.set('Authorization', `${accessToken}`);
  }
  headers.set('Content-Type', 'application/json');
  return headers;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
    
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => {
        const { refreshToken, accessToken, success } = response;
        if (success && refreshToken && accessToken) {
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('accessToken', accessToken);
        } else {
          throw new Error('Login failed: missing expected data');
        }
        return response;
      },
    }),
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => {
        const { refreshToken, accessToken, success } = response;
        if (success && refreshToken && accessToken) {
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('accessToken', accessToken);
        }
        return response;
      },
    }),
    logout: builder.mutation({
      query: (body) => ({
        url: '/auth/logout',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => {
        const { success } = response;
        if (success) {
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
        } else {
          console.error('Failed to logout:', response);
        }
        return response;
      },
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
    }),
  }),
});

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
