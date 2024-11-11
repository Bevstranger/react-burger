import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";
import React, { useState } from "react";
import loading from "../../images/loading.svg";
import styles from "./burger-constructor.module.css";
import ConstItem from "../burger-constructor/burger-constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector, useDispatch } from "react-redux";
import { addIngredient } from "../../services/constructSlice";
import { reorderIngredients } from "../../services/constructSlice";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const dataIng = useSelector((state) => state.ing.data);
  const data = useSelector((state) => state.construct.data);
  const buns = data.filter((item) => item.type === "bun");
  const price = data.reduce((total, ingredient) => {
    if (ingredient.type === "bun") {
      return total + ingredient.price * 2;
    }
    return total + ingredient.price;
  }, 0);

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      const dragElement = dataIng.find((el) => el._id === item.id);

      dispatch(addIngredient({ ...dragElement, _id: uuid() }));
    },
  });

  const [showModal, setShowModal] = useState(false);
  const ingredients = data.filter((item) => item.type !== "bun");
  console.log(ingredients);

  const moveCard = (dragIndex, hoverIndex) => {
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
        ref={dropTarget}
      >
        <ConstructorElement
          type="top"
          isLocked={true}
          text={buns[0]?.name ? buns[0].name : "Перетащите булку"}
          price={buns[0]?.price}
          thumbnail={buns[0]?.image ? buns[0].image : loading}
          extraClass={styles.buns}
        />
        {data.length === 0 ? (
          <p className="text text_type_main-medium">Выберите ингредиенты</p>
        ) : (
          <div className={styles.listIngredients}>
            {ingredients.map(({ image, name, price, _id }, index) => (
              <ConstItem
                id={_id}
                key={_id + index}
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
          type="bottom"
          isLocked={true}
          text={buns[0]?.name}
          price={buns[0]?.price}
          thumbnail={buns[0]?.image ? buns[0].image : loading}
        />
      </div>
      <div className={`${styles.total} mr-4 mt-10`}>
        <div className="text text_type_digits-medium mr-2 mb-1">{price}</div>
        <div className={`${styles.total_icon} mr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        {showModal && (
          <Modal open={showModal} onClose={setShowModal}>
            <OrderDetails />
          </Modal>
        )}

        <Button
          htmlType="button"
          type="primary"
          onClick={() => setShowModal(!showModal)}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerIngredients;
