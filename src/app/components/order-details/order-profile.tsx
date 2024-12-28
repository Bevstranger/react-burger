import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-profile.module.css';

import { Link, useLocation } from 'react-router-dom';
import { TOrdersResponse } from '../../services/api/ws';
import { IDataItem } from '../../services/ingredientsSlice';

export const OrderProfile: React.FC<{
	data?: TOrdersResponse;
	isReverse?: boolean;
	ingData?: IDataItem[];
}> = ({ data, isReverse, ingData }) => {
	const location = useLocation();

	if (!data) {
		return <p>Loading...</p>;
	}

	return (
		<section className={!isReverse ? styles.scrollReverse : styles.scroll}>
			{data?.orders.map((el) => (
				<Link
					key={el.number}
					to={`${location.pathname}/${el.number}`}
					state={{ background: location }}
					className={styles.link}>
					<div className={styles.wrapOrder}>
						<div className='m-6'>
							<div className={styles.order_header}>
								<p className='text text_type_digits-default'>#{el.number}</p>
								<FormattedDate
									date={new Date(el.createdAt)}
									className='text text_type_main-default text_color_inactive'
								/>
							</div>
						</div>
						<p className={`${styles.title_order} text text_type_main-medium`}>
							{el.name}
						</p>

						<p
							className={`${styles.status_order}  text text_type_main-default`}>
							{el.status === 'created'
								? 'Создан'
								: el.status === 'pending'
								? 'Готовится'
								: 'Выполнен'}
						</p>

						<div className={styles.filling}>
							<div className={styles.images_selection}>
								{el.ingredients.length > 4 && (
									<li className={styles.image_fill}>
										<img
											style={{ opacity: 1 }}
											src=''
											alt=''
											className={styles.image_position}
										/>
										<span
											className={`${styles.count_hidden} text text_type_main-default`}>
											{`+${el.ingredients.length - 4}`}
										</span>
									</li>
								)}

								{el.ingredients
									.slice(0, 4)
									.reverse()
									.map((item, index) => {
										return (
											<li key={index} className={styles.image_fill}>
												<img
													src={ingData?.find((i) => i._id === item)?.image}
													alt=''
													className={styles.image_position}
												/>
											</li>
										);
									})}
							</div>

							<div className={styles.price}>
								<span className={'text text_type_digits-default'}>
									{el.ingredients
										.map((item) => {
											return ingData?.find((i) => i._id === item)?.price;
										})
										.filter((item) => item !== undefined)
										.reduce((acc, curr) => acc + curr, 0)}
								</span>

								<CurrencyIcon type='primary' />
							</div>
						</div>
					</div>
				</Link>
			))}
		</section>
	);
};
