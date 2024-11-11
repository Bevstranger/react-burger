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
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

function ConstItem({ image, name, price, id, index, moveCard }) {
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item) {
      const { index: dragIndex } = item;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",

    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <>
      <div
        className={`text text_type_main-default`}
        style={{ display: "flex", alignItems: "center", opacity }}
        ref={ref}
        data-handler-id={handlerId}
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
