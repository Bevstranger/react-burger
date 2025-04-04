import styles from '../burger-ingredients/burger-ingredients.module.css';
import { useSelector } from '../hooks/useSel-useDis';
import { useParams } from 'react-router-dom';
import { RootState } from '../../services/store';
export const IngredientDetails = () => {
	const { id } = useParams();
	const ing = useSelector((state: RootState) => state.ing.data);

	const ingredient = ing.find((item) => item._id === id);

	return (
		<div className={styles.modalItem}>
			<div className={styles.title}>
				<h2>Детали ингредиента</h2>
			</div>
			<img src={ingredient?.image_large} alt={ingredient?.name} />
			<p>{ingredient?.name}</p>
			<p>
				Калории: {ingredient?.calories} - Белки: {ingredient?.proteins} - Жиры:{' '}
				{ingredient?.fat} - Углеводы: {ingredient?.carbohydrates}
			</p>
		</div>
	);
};
