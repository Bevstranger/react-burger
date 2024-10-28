import Modal from "../modal/modal";
import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";

function Item({ image, name, price, fat, calories, proteins, carbohydrates }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <Modal
          open={showModal}
          onClose={setShowModal}
          title={"Детали ингредиента"}
        >
          <IngredientDetails
            {...{ name, image, calories, proteins, fat, carbohydrates }}
          />
        </Modal>
      )}
      <div
        onClick={() => setShowModal(!showModal)}
        className={`text text_type_main-default mb-2 ${styles.item}`}
      >
        <Counter count={0} size="default" />
        <img className="ml-4 mr-4" src={image} alt={name} />
        <div className={`mt-1 mb-1 ${styles.price}`}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
      </div>
    </>
  );
}

Item.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
};

export default Item;
