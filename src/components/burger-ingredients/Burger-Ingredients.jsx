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
import imgMeat1 from "../../images/meat-01.png";
import imgMeat2 from "../../images/meat-02.png";
import imgMeat3 from "../../images/meat-03.png";
import imgMeat4 from "../../images/meat-04.png";
import imgcheese1 from "../../images/cheese.png";
import imgCore from "../../images/core.png";
import imgMinerals from "../../images/mineral rings.png";
import imgSalad from "../../images/salad.png";
import imgSp from "../../images/sp 1.png";
import styles from "./burger-ingredients.module.css";

const buns = [
  { id: "1", image: imgBun2, name: "Краторная булка N-200i", price: "20" },
  {
    id: "2",
    image: imgBun1,
    name: "Флюоресцентная булка R2-D3 2",
    price: "20",
  },
];

const sauces = [
  { id: "1", image: imgSauce1, name: "Соус Spicy-X", price: "30" },
  {
    id: "2",
    image: imgSauce2,
    name: "Соус фирменный Space Sauce 2",
    price: "30",
  },
  {
    id: "3",
    image: imgSauce3,
    name: "Соус традиционный галактический",
    price: "30",
  },
  {
    id: "4",
    image: imgSauce4,
    name: "Соус с шипами Антарианского плоскоходца",
    price: "30",
  },
];

const fillings = [
  {
    id: "1",
    image: imgMeat1,
    name: "Филе Люминесцентного тетраодонтимформа",
    price: "300",
  },
  {
    id: "2",
    image: imgMeat2,
    name: "Мясо бессмертных моллюсков Protostomia",
    price: "300",
  },
  {
    id: "3",
    image: imgMeat3,
    name: "Говяжий метеорит (отбивная)",
    price: "300",
  },
  {
    id: "4",
    image: imgMeat4,
    name: "Биокотлета из марсианской Магнолии",
    price: "300",
  },
  {
    id: "5",
    image: imgcheese1,
    name: "Сыр с астероидной плесенью",
    price: "80",
  },
  {
    id: "6",
    image: imgCore,
    name: "Кристаллы марсианских альфа-сахаридов",
    price: "80",
  },
  {
    id: "7",
    image: imgMinerals,
    name: "Хрустящие минеральные кольца",
    price: "80",
  },
  { id: "8", image: imgSalad, name: "Мини-салат Экзо-Плантаго", price: "80" },
  { id: "9", image: imgSp, name: "Плоды фалленианского дерева", price: "80" },
];

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
          {buns.map(({ image, name, price, id }) => (
            <Item key={id} image={image} name={name} price={price} />
          ))}
        </WrapperGroup>
        <WrapperGroup title={"Соусы"} ref={sauceRef}>
          {sauces.map(({ image, name, price, id }) => (
            <Item key={id} image={image} name={name} price={price} />
          ))}
        </WrapperGroup>
        <WrapperGroup title={"Начинки"} ref={fillingRef}>
          {fillings.map(({ image, name, price, id }) => (
            <Item key={id} image={image} name={name} price={price} />
          ))}
        </WrapperGroup>
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
