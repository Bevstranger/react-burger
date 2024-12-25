import React from 'react';
import { OrderInfoPage } from '../../components/order-details/order-info';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useGetOrdersAllQuery, useGetOrdersQuery } from '../../services/api/ws';
import { useLocation } from 'react-router-dom';

const OrderInfo: React.FC = () => {
	const location = useLocation();

	const ingData = useSelector((state: RootState) => state.ing.data);
	const { data } = useGetOrdersQuery();
	const { data: dataAll } = useGetOrdersAllQuery();
	const checkUrl = (url: string) => {
		return url.includes('feeds');
	};

	return (
		<OrderInfoPage
			data={checkUrl(location.pathname) ? dataAll : data}
			ingData={ingData}
		/>
	);
};

export default OrderInfo;
