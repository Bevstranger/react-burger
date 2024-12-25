import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.css';

export const OrderInfoPage = () => {
	return (
		<main className={styles.main_container}>
			<>
				<p
					className={`text text_type_digits-default mb-10 ${styles.number_order}`}>
					#123546
				</p>
				<p className={`text text_type_main-medium mb-3`}>Наименование заказа</p>
				<p
					className={`text text_type_main-default mb-10 ${styles.status_order}`}>
					Статус заказа
				</p>
				<p className='text text_type_main-medium mb-2'>Состав:</p>
				<section className={styles.fill_order}>
					<li className='mt-4 mr-6'>
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
									Наименование ингредиента
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
				</section>
				<section
					className={`text text_type_main-default mt-10 mb-6 ${styles.food_order}`}>
					<p className='text text_type_main-default text_color_inactive'>
						<FormattedDate
							date={new Date()}
							className='text text_type_main-default text_color_inactive'
						/>
					</p>

					<div className={styles.count_price}>
						<span className={`text text_type_digits-default mr-2`}>2303</span>
						<CurrencyIcon type='primary' />
					</div>
				</section>
			</>
		</main>
	);
};
