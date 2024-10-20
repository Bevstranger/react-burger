import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import imgBun1 from "../../images/bun-01.png";
import imgBun2 from "../../images/bun-02.png";
import imgSauce1 from "../../images/sauce-01.png";
import imgSauce2 from "../../images/sauce-02.png";
import imgSauce3 from "../../images/sauce-03.png";
import imgSauce4 from "../../images/sauce-04.png";
import styles from "./burger-ingredients.module.css";

function BurgerInredients() {
  const [current, setCurrent] = useState("Булки");
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const fillingRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={() => {
            setCurrent("Булки");
            scrollToSection(bunRef);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={() => {
            setCurrent("Соусы");
            scrollToSection(sauceRef);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={() => {
            setCurrent("Начинки");
            scrollToSection(fillingRef);
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={`mt-10 ${styles.ingredients}`}>
        <WrapperGroup title={"Булки"} ref={bunRef}>
          <Item image={imgBun1} name={"Краторная булка N-200i"} price={"20"} />
          <Item
            image={imgBun2}
            name={"Флюоресцентная булка R2-D3 2"}
            price={"20"}
          />
        </WrapperGroup>
        <WrapperGroup title={"Соусы"} ref={sauceRef}>
          <Item image={imgSauce1} name={"Соус Spicy-X"} price={"30"} />
          <Item
            image={imgSauce2}
            name={"Соус фирменный Space Sauce 2"}
            price={"30"}
          />
          <Item
            image={imgSauce3}
            name={"Соус традиционный галактический"}
            price={"30"}
          />
          <Item image={imgSauce4} name={"Соус 4"} price={"30"} />
        </WrapperGroup>
        <WrapperGroup title={"Начинки"} ref={fillingRef} />
      </div>
    </section>
  );
}
export default BurgerInredients;
const WrapperGroup = React.forwardRef(({ title, children }, ref) => (
  <div ref={ref}>
    <div className="text text_type_main-medium">{title}</div>
    <div className={`mb-10 mt-6 ${styles.list}`}>{children}</div>
  </div>
));

function Item({ image, name, price }) {
  return (
    <div className={`text text_type_main-default mb-2 ${styles.item}`}>
      <Counter count={1} size="default" />
      <img className="ml-4 mr-4" src={image} alt={name} />
      <div className={`mt-1 mb-1 ${styles.price}`}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
    </div>
  );
}
