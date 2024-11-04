import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React, { useState } from "react";
import imgBun2 from "../../images/bun-02.png";
import styles from "./burger-constructor.module.css";
import ConstItem from "../burger-constructor/burger-constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerIngredients({ data }) {
  const [showModal, setShowModal] = useState(false);
  const ingredients = data.filter((item) => item.type !== "bun");
  return (
    <section>
      <div className={`pt-25 pb-10 pr-4 pl-4 ${styles.container}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={20}
          thumbnail={imgBun2}
        />
        <div className={styles.listIngredients}>
          {ingredients.map(({ image, name, price, _id }) => (
            <ConstItem key={_id} image={image} name={name} price={price} />
          ))}
        </div>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={20}
          thumbnail={imgBun2}
        />
      </div>
      <div className={`${styles.total} mr-4 mt-10`}>
        <div className="text text_type_digits-medium mr-2 mb-1">610</div>
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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;
