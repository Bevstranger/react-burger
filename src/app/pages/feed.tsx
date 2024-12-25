import styles from './feed.module.css';
import { OrderProfile } from '../components/order-details/order-profile';
import { OrderStatus } from '../components/order-details/order-status';
// import { useGetOrdersAllQuery } from '../services/api/ws-all-feed';
import { useGetOrdersAllQuery } from '../services/api/ws';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';

export const Feed = () => {
	const { data, isLoading, error } = useGetOrdersAllQuery();
	const ingData = useSelector((state: RootState) => state.ing.data);
	console.log(ingData, 'Ingdata');
	return (
		<div className='feed'>
			<main className={styles.content}>
				<section className={styles.left_section}>
					<p className='text text_type_main-large mt-6'>Лента заказов</p>
					<OrderProfile data={data} isReverse ingData={ingData} />
				</section>
				<section className={styles.right_section}>
					<OrderStatus data={data} />
				</section>
			</main>
		</div>
	);
};
