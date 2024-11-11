import { useState } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import imgSauce3 from "../../images/sauce-03.png";
import styles from "./burger-constructor.module.css";
import { deleteIngredient } from "../../services/constructSlice";
import { useDispatch } from "react-redux";

function ConstItem({ image, name, price, id }) {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`text text_type_main-default`}
        style={{ display: "flex", alignItems: "center" }}
      >
        <span className={styles.draggable}>
          <DragIcon type="primary" />
        </span>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => {
            dispatch(deleteIngredient(id));
          }}
        />
      </div>
    </>
  );
}

ConstItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ConstItem;
