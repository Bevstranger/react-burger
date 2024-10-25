import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
  const [current, setCurrent] = useState("Булки");

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const fillingRef = useRef(null);

  const buns = data.filter((item) => item.type === "bun");
  const sauces = data.filter((item) => item.type === "sauce");
  const fillings = data.filter((item) => item.type === "main");

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
          {buns.map(({ image, name, price, _id }) => (
            <Item key={_id} image={image} name={name} price={price} />
          ))}
        </WrapperGroup>
        <WrapperGroup title={"Соусы"} ref={sauceRef}>
          {sauces.map(({ image, name, price, _id }) => (
            <Item key={_id} image={image} name={name} price={price} />
          ))}
        </WrapperGroup>
        <WrapperGroup title={"Начинки"} ref={fillingRef}>
          {fillings.map(({ image, name, price, _id }) => (
            <Item key={_id} image={image} name={name} price={price} />
          ))}
        </WrapperGroup>
      </div>
    </section>
  );
}
export default BurgerIngredients;

const WrapperGroup = React.forwardRef(({ title, children }, ref) => (
  <div ref={ref}>
    <div className="text text_type_main-medium">{title}</div>
    <div className={`mb-10 mt-6 ${styles.list}`}>{children}</div>
  </div>
));

function Item({ image, name, price }) {
  return (
    <div className={`text text_type_main-default mb-2 ${styles.item}`}>
      <Counter count={0} size="default" />
      <img className="ml-4 mr-4" src={image} alt={name} />
      <div className={`mt-1 mb-1 ${styles.price}`}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
    </div>
  );
}
