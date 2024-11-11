import styles from "../burger-ingredients/burger-ingredients.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const { name, image, calories, proteins, fat, carbohydrates } = useSelector(
    (state) => state.ingredientsDetails
  );
  return (
    <div className={styles.modalItem}>
      <img src={image} alt={name} />
      <p>{name}</p>
      <p>
        Калории: {calories} - Белки: {proteins} - Жиры: {fat} - Углеводы:{" "}
        {carbohydrates}
      </p>
    </div>
  );
};

export default IngredientDetails;
