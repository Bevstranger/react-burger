import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";
import React, { useState, useMemo } from "react";
import loading from "../../images/loading.svg";
import styles from "./burger-constructor.module.css";
import ConstItem from "../burger-constructor/burger-constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector, useDispatch } from "react-redux";
import { addIngredient } from "../../services/constructSlice";
import { reorderIngredients } from "../../services/constructSlice";
import { postOrder } from "../../services/orderDetailsSlice";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const dataIng = useSelector((state) => state.ing.data);
  const buns = useSelector((state) => state.construct.data.buns);
  const ingredients = useSelector((state) => state.construct.data.ingredients);

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

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      const dragElement = dataIng.find((el) => el._id === item.id);

      dispatch(addIngredient({ ...dragElement, id: uuid() }));
    },
  });

  const [showModal, setShowModal] = useState(false);

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
        {ingredients.length === 0 ? (
          <p className="text text_type_main-medium">Выберите ингредиенты</p>
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
          type="bottom"
          isLocked={true}
          text={buns[0]?.name}
          price={buns[0]?.price}
          thumbnail={buns[0]?.image ? buns[0].image : loading}
        />
      </div>
      <div className={`${styles.total} mr-4 mt-10`}>
        <div className="text text_type_digits-medium mr-2 mb-1">
          {priceBuns + priceIngredient}
        </div>
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
          onClick={() => {
            dispatch(postOrder(ingredientsIds));

            setShowModal(!showModal);
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerIngredients;
