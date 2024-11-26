import styles from "../burger-ingredients/burger-ingredients.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import React from "react";

export const IngredientDetails = () => {
  const { id } = useParams();
  const ing = useSelector((state) => state.ing.data);

  const ingredient = ing.find((item) => item._id === id);

  return (
    <div className={styles.modalItem}>
      <img src={ingredient?.image} alt={ingredient?.name} />
      <p>{ingredient?.name}</p>
      <p>
        Калории: {ingredient?.calories} - Белки: {ingredient?.proteins} - Жиры:{" "}
        {ingredient?.fat} - Углеводы: {ingredient?.carbohydrates}
      </p>
    </div>
  );
};
