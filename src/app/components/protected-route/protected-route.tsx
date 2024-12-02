import React, { useEffect, FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetUserQuery, useRefreshMutation } from '../../services/api/auth';

interface IProtectedRouteElement {
	element: React.ReactNode;
	onlyUnAuth?: boolean;
	exact?: boolean;
}

interface IError {
	data: {
		message: string;
	};
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({
	onlyUnAuth = false,
	element,
}) => {
	const location = useLocation();
	const accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');

	const [refreshTokenMutation, { data: refreshData }] = useRefreshMutation();

	const { data, error, refetch } = useGetUserQuery({
		skip: !accessToken,
	});

	const isAuthorized = Boolean(data?.user);

	useEffect(() => {
		if (
			(error as IError)?.data?.message === 'jwt expired' &&
			refreshToken &&
			!refreshData?.success
		) {
			refreshTokenMutation({ token: refreshToken })
				.then((res) => {
					if (res?.data?.success) {
						localStorage.setItem('refreshToken', res?.data.refreshToken);
						localStorage.setItem('accessToken', res?.data.accessToken);

						refetch();
					}
				})
				.catch((err) => console.error('Failed to refresh token:', err));
		}
	}, [
		error,
		refetch,
		refreshData?.success,
		refreshToken,
		refreshTokenMutation,
	]);

	if (!onlyUnAuth && !isAuthorized) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && isAuthorized) {
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return element;
};

export const OnlyAuth: FC<IProtectedRouteElement> = (props) => (
	<ProtectedRouteElement {...props} />
);
export const OnlyUnAuth: FC<IProtectedRouteElement> = (props) => (
	<ProtectedRouteElement onlyUnAuth {...props} />
);
