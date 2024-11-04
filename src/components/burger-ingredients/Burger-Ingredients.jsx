import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import Item from "./burger-ingredients-item";
import PropTypes from "prop-types";


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
          {buns.map(({ ...data }) => (
            <Item key={data._id} {...data} />
          ))}
        </WrapperGroup>
        <WrapperGroup title={"Соусы"} ref={sauceRef}>
          {sauces.map(
            ({
              image,
              name,
              price,
              _id,
              fat,
              calories,
              proteins,
              carbohydrates,
            }) => (
              <Item
                key={_id}
                image={image}
                name={name}
                price={price}
                fat={fat}
                calories={calories}
                proteins={proteins}
                carbohydrates={carbohydrates}
              />
            )
          )}
        </WrapperGroup>
        <WrapperGroup title={"Начинки"} ref={fillingRef}>
          {fillings.map(
            ({
              image,
              name,
              price,
              _id,
              fat,
              calories,
              proteins,
              carbohydrates,
            }) => (
              <Item
                key={_id}
                image={image}
                name={name}
                price={price}
                fat={fat}
                calories={calories}
                proteins={proteins}
                carbohydrates={carbohydrates}
              />
            )
          )}
        </WrapperGroup>
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

const WrapperGroup = React.forwardRef(({ title, children }, ref) => (
  <div ref={ref}>
    <div className="text text_type_main-medium">{title}</div>
    <div className={`mb-10 mt-6 ${styles.list}`}>{children}</div>
  </div>
));

