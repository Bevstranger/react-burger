import styles from '../burger-constructor/burger-constructor.module.css';
import imgDone from '../../images/done.png';

import loading from '../../images/loading.svg';

import { IOrderInfo } from '../../services/orderDetailsSlice';
const OrderDetails: React.FC<{
	data?: IOrderInfo;
	isLoading: boolean;
	isError: boolean;
}> = ({ data, isLoading, isError }) => {
	return (
		<div className={styles.detailsModal}>
			{isLoading ? (
				<img src={loading} alt='loading' />
			) : isError ? (
				<p>Error</p>
			) : (
				<>
					<p className={'text text_type_digits-large pb-8 '}>
						{data?.order?.number}
					</p>
					<p className={'text text_type_main-medium pb-2'}>
						идентификатор заказа
					</p>
					<img src={imgDone} className='pt-15 pb-15' alt='weelDone' />
					<p className={'text text_type_main-default pb-2 '}>
						Ваш заказ начали готовить
					</p>
					<p className={'text text_type_main-small '}>
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
		</div>
	);
};

export default OrderDetails;
