import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import Item from "./burger-ingredients-item";

import { useSelector } from "react-redux";

function BurgerIngredients() {
  const data = useSelector((state) => state.ing.data);
  const dataIng = useSelector((state) => state.construct.data);

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
          {buns.map(({ ...data }) => (
            <Item
              key={data._id}
              {...data}
              id={data._id}
              count={
                dataIng?.filter((item) => item?.name === data.name).length === 1
                  ? 2
                  : 0
              }
            />
          ))}
        </WrapperGroup>
        <WrapperGroup title={"Соусы"} ref={sauceRef}>
          {sauces.map(({ name, _id, ...data }) => (
            <Item
              count={dataIng?.filter((item) => item?.name === name).length}
              key={_id}
              name={name}
              id={_id}
              {...data}
            />
          ))}
        </WrapperGroup>
        <WrapperGroup title={"Начинки"} ref={fillingRef}>
          {fillings.map(({ name, _id, ...data }) => (
            <Item
              key={_id}
              name={name}
              id={_id}
              {...data}
              count={dataIng?.filter((item) => item?.name === name).length}
            />
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
