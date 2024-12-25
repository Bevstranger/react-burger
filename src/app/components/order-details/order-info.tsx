import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { TOrdersResponse, useGetOrdersQuery } from '../../services/api/ws';
import { IDataItem } from '../../services/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const OrderInfoPage: React.FC<{
	data?: TOrdersResponse;
	ingData?: IDataItem[];
}> = ({ data, ingData }) => {
	const { id } = useParams();

	const ingredient = data?.orders
		.filter((item) => item.number.toString() === id)
		.map((el) => {
			return el.ingredients.map((item) => {
				return ingData?.find((i) => i._id === item);
			});
		});

	const order = data?.orders?.find((item) => item.number.toString() === id);
	return (
		<main className={styles.main_container}>
			<>
				<p
					className={`text text_type_digits-default mb-10 ${styles.number_order}`}>
					#{order?.number}
				</p>
				<p className={`text text_type_main-medium mb-3`}>{order?.name}</p>
				<p
					className={`text text_type_main-default mb-10 ${styles.status_order}`}>
					{order?.status === 'created'
						? 'Создан'
						: order?.status === 'pending'
						? 'Готовится'
						: 'Выполнен'}
				</p>
				<p className='text text_type_main-medium mb-2'>Состав:</p>
				<section className={styles.fill_order}>
					{ingredient?.map((el) => {
						return el?.map((item, index) => {
							return (
								<li className='mt-4' key={index}>
									<div className={styles.row_fill}>
										<div className={styles.image_name}>
											<div className={styles.image_fill}>
												<img src={item?.image} alt={''} />
											</div>
											<p
												className={`text text_type_main-default ml-4 ${styles.pname}`}>
												{item?.name}
											</p>
										</div>
										<div className={styles.count_price}>
											<span className='text text_type_digits-default mr-2'>
												1х300
											</span>
											<CurrencyIcon type='primary' />
										</div>
									</div>
								</li>
							);
						});
					})}
					{/* <li className='mt-4'>
						<div className={styles.row_fill}>
							<div className={styles.image_name}>
								<div className={styles.image_fill}>
									<img
										src={'https://code.s3.yandex.net/react/code/bun-02.png'}
										alt={''}
									/>
								</div>
								<p
									className={`text text_type_main-default ml-4 ${styles.pname}`}>
									{Item?.name}
								</p>
							</div>
							<div className={styles.count_price}>
								<span className='text text_type_digits-default mr-2'>
									1х300
								</span>
								<CurrencyIcon type='primary' />
							</div>
						</div>
					</li> */}
				</section>
				<section
					className={`text text_type_main-default mt-10 mb-6 ${styles.food_order}`}>
					{order?.createdAt && (
						<p className='text text_type_main-default text_color_inactive'>
							<FormattedDate
								date={new Date(order.createdAt)}
								className='text text_type_main-default text_color_inactive'
							/>
						</p>
					)}

					<div className={styles.count_price}>
						<span className={`text text_type_digits-default mr-2`}>2303</span>
						<CurrencyIcon type='primary' />
					</div>
				</section>
			</>
		</main>
	);
};
