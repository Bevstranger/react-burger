import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';
import { useState, useMemo } from 'react';
import loading from '../../images/loading.svg';
import styles from './burger-constructor.module.css';
import ConstItem from './burger-constructor-item';
import { Modal } from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector } from '../hooks/useSel-useDis';
import { useAppDispatch, RootState } from '../../services/store';
import {
	addIngredient,
	reorderIngredients,
} from '../../services/constructSlice';
import { usePostOrderMutation } from '../../services/orderDetailsSlice';
import { useGetUserData } from '../hooks/useGetUserData';
import { useNavigate } from 'react-router-dom';

function BurgerIngredients() {
	const [postOrder, { data: order, isLoading, isError }] =
		usePostOrderMutation();
	const data = useGetUserData();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const dataIng = useSelector((state: RootState) => state.ing.data);
	const buns = useSelector((state: RootState) => state.construct.data.buns);
	const ingredients = useSelector(
		(state: RootState) => state.construct.data.ingredients
	);

	const priceIngredient = useMemo(
		() =>
			ingredients.reduce((total, ingredient) => {
				return total + ingredient.price;
			}, 0),
		[ingredients]
	);

	const priceBuns = buns[0]?.price ? buns[0].price * 2 : 0;

	const ingredientsIds = useMemo(
		() => ingredients.map((item) => item._id),
		[ingredients]
	);
	const bunsIds = useMemo(() => buns.map((item) => item._id), [buns]);
	const allIds = useMemo(
		() => [bunsIds[0], ...ingredientsIds, bunsIds[0]],
		[ingredientsIds, bunsIds]
	);

	const [, dropTarget] = useDrop({
		accept: 'ingredients',
		drop(item: { id: string }) {
			const dragElement = dataIng.find((el) => el._id === item.id);

			dispatch(addIngredient({ ...dragElement, id: uuid() }));
		},
	});

	const [showModal, setShowModal] = useState(false);

	const moveCard: (dragIndex: number, hoverIndex: number) => void = (
		dragIndex,
		hoverIndex
	) => {
		dispatch(
			reorderIngredients({
				from: dragIndex,
				to: hoverIndex,
			})
		);
	};

	return (
		<section>
			<div
				className={`pt-25 pb-10 pr-4 pl-4 ${styles.container}`}
				ref={dropTarget}>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={buns[0] ? `${buns[0].name} (верх)` : 'Перетащите булку'}
					price={buns[0]?.price}
					thumbnail={buns[0]?.image ? buns[0].image : loading}
					extraClass={styles.buns}
				/>
				{ingredients.length === 0 ? (
					<p className='text text_type_main-medium'>Выберите ингредиенты</p>
				) : (
					<div className={styles.listIngredients}>
						{ingredients.map(({ image, name, price, id }, index) => (
							<ConstItem
								id={id}
								key={id}
								image={image}
								name={name}
								price={price}
								moveCard={moveCard}
								index={index}
							/>
						))}
					</div>
				)}

				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={buns[0] ? `${buns[0].name} (низ)` : 'Перетащите булку'}
					price={buns[0]?.price}
					thumbnail={buns[0]?.image ? buns[0].image : loading}
				/>
			</div>
			<div className={`${styles.total} mr-4 mt-10`}>
				<div className='text text_type_digits-medium mr-2 mb-1'>
					{priceBuns + priceIngredient}
				</div>
				<div className={`${styles.total_icon} mr-10`}>
					<CurrencyIcon type='primary' />
				</div>

				{showModal && (
					<Modal open={showModal} onClose={setShowModal}>
						<OrderDetails
							data={order}
							isLoading={isLoading}
							isError={isError}
						/>
					</Modal>
				)}

				<Button
					disabled={ingredients.length === 0 || buns.length === 0 || isLoading}
					htmlType='button'
					type='primary'
					onClick={() => {
						setShowModal(true);
						if (data?.user) {
							postOrder(allIds)
								.unwrap()

								.catch((error) =>
									console.error('Failed to post order:', error)
								);
						} else {
							navigate('/login');
						}
					}}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
}

export default BurgerIngredients;
