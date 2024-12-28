import { Link, useLocation } from 'react-router-dom';
import styles from './order-status.module.css';
import { TOrdersResponse } from '../../services/api/ws';

export const OrderStatus = ({ data }: { data?: TOrdersResponse }) => {
	const location = useLocation();
	const doneOrders = data?.orders?.filter((order) => order?.status === 'done');
	const readyOrders = data?.orders?.filter(
		(order) => order?.status === 'pending' || order?.status === 'created'
	);
	return (
		<>
			<div className={styles.list_orders}>
				<section className={styles.ready_section}>
					<p className='text text_type_main-medium'>Готовы:</p>
					<div
						className={`${styles.list_number_orders} ${styles.ready_orders}`}>
						<ul className={styles.ul_orders}>
							<li className='mt-2 mr-8'>
								<div
									className='text text_type_digits-default'
									style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
									{doneOrders?.slice(0, 14).map((order) => (
										<Link
											key={order?.number}
											to={`/feeds/${order?.number}`}
											state={{ background: location }}
											className={styles.ready_order}>
											<span>{order?.number}</span>
										</Link>
									))}
								</div>
							</li>
						</ul>
					</div>
				</section>
				<section className={styles.ready_section}>
					<p className='text text_type_main-medium'>В работе:</p>
					<div className={styles.list_number_orders}>
						<ul className={styles.ul_orders}>
							<li className='mt-2 mr-8'>
								<div
									className='text text_type_digits-default'
									style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
									{readyOrders?.slice(0, 14).map((order) => (
										<Link
											key={order?.number}
											to={`/feeds/${order?.number}`}
											state={{ background: location }}
											className={styles.ready_order}>
											<span>{order?.number}</span>
										</Link>
									))}
								</div>
							</li>
						</ul>
					</div>
				</section>
			</div>
			<section>
				<p className='text text_type_main-medium'>Выполнено за все время:</p>
				<p className={`${styles.text_sh} text text_type_digits-large pb-8`}>
					{data?.total}
				</p>
			</section>
			<section>
				<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
				<p className={`${styles.text_sh} text text_type_digits-large pb-8`}>
					{data?.totalToday}
				</p>
			</section>
		</>
	);
};
