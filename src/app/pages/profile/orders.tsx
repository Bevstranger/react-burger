import { OrderProfile } from '../../components/order-details/order-profile';
import { useGetOrdersQuery } from '../../services/api/ws';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

export const Orders = () => {
	const ingData = useSelector((state: RootState) => state.ing.data);
	const { data } = useGetOrdersQuery();
	return <OrderProfile data={data} ingData={ingData} />;
};
