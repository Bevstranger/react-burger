import { useGetUserQuery } from '../../services/api/auth';

export const useGetUserData = () => {
	console.log('useGetUserData');
	const accessToken = localStorage.getItem('accessToken');
	const { data } = useGetUserQuery(undefined, {
		skip: !accessToken,
	});
	return data;
};
