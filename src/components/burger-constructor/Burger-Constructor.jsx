import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import imgBun1 from "../../images/bun-01.png";
import imgBun2 from "../../images/bun-02.png";
import imgSauce3 from "../../images/sauce-03.png";
import styles from "./Burger-Constructor.module.css";

function BurgerInredients() {
  const [current, setCurrent] = useState("Булки");

  return (
    <section>
      <div className={`pt-25 pb-10 pr-4 pl-4 ${styles.container}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={20}
          thumbnail={imgBun1}
        />
        <div className={styles.listIngredients}>
          <span className={styles.draggable}>
            <DragIcon type="primary" />
          </span>
          <ConstructorElement
            text="Соус традиционный галактический"
            price={30}
            thumbnail={imgSauce3}
          />
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
        <Button htmlType="button" type="primary">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerInredients;
