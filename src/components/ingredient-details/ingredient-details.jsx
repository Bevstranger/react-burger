import PropTypes from "prop-types";
import styles from "../burger-ingredients/burger-ingredients.module.css";

const IngredientDetails = ({
  name,
  image,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
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

IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
};

export default IngredientDetails;
