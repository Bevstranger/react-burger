import {
  Button,
  ConstructorElement,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import imgBun1 from "../../images/bun-01.png";
import imgBun2 from "../../images/bun-02.png";
import imgSauce1 from "../../images/sauce-01.png";
import imgSauce2 from "../../images/sauce-02.png";
import imgSauce3 from "../../images/sauce-03.png";
import imgSauce4 from "../../images/sauce-04.png";

function BurgerInredients() {
  const [current, setCurrent] = useState("Булки");

  return (
    <main
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "center",
        marginTop: 40,
      }}
    >
      <section style={{ marginRight: 40 }}>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div style={{ display: "flex" }}>
          <Tab
            value="Булки"
            active={current === "Булки"}
            onClick={() => setCurrent("Булки")}
          >
            Булки
          </Tab>
          <Tab
            value="Соусы"
            active={current === "Соусы"}
            onClick={() => setCurrent("Соусы")}
          >
            Соусы
          </Tab>
          <Tab
            value="Начинки"
            active={current === "Начинки"}
            onClick={() => setCurrent("Начинки")}
          >
            Начинки
          </Tab>
        </div>
        <div
          className="mb-10"
          style={{
            width: 600,
            height: 500,
            overflow: "auto",
          }}
        >
          <WrapperGroup title={"Булки"}>
            <ul style={{ display: "flex", flexWrap: "wrap" }}>
              <li
                className="text text_type_main-default mb-2"
                style={{ listStyle: "none", width: 272, height: 208 }}
              >
                <img className="ml-4 mr-4" src={imgBun2} alt="bun2" />
                <div
                  className="text text_type_main-small"
                  style={{ textAlign: "center" }}
                >
                  20
                </div>
                <p
                  className="text text_type_main-default"
                  style={{ textAlign: "center" }}
                >
                  Булка 1
                </p>
              </li>
              <li
                className="text text_type_main-default mb-2"
                style={{ listStyle: "none", width: 272, height: 208 }}
              >
                <img className="ml-4 mr-4" src={imgBun1} alt="bun1" />
                <div
                  className="text text_type_main-small"
                  style={{ textAlign: "center" }}
                >
                  40
                </div>
                <p
                  className="text text_type_main-default"
                  style={{ textAlign: "center" }}
                >
                  Булка 2
                </p>
              </li>
            </ul>
          </WrapperGroup>
          <WrapperGroup title={"Соусы"}>
            <ul style={{ display: "flex", flexWrap: "wrap" }}>
              <li
                className="text text_type_main-default mb-2"
                style={{ listStyle: "none", width: 272, height: 208 }}
              >
                <img className="ml-4 mr-4" src={imgSauce1} alt="sauce1" />
                <div
                  className="text text_type_main-small"
                  style={{ textAlign: "center" }}
                >
                  20
                </div>
                <p
                  className="text text_type_main-default"
                  style={{ textAlign: "center" }}
                >
                  Соус 1
                </p>
              </li>
              <li
                className="text text_type_main-default mb-2"
                style={{ listStyle: "none", width: 272, height: 208 }}
              >
                <img className="ml-4 mr-4" src={imgSauce2} alt="sauce2" />
                <div
                  className="text text_type_main-small"
                  style={{ textAlign: "center" }}
                >
                  40
                </div>
                <p
                  className="text text_type_main-default"
                  style={{ textAlign: "center" }}
                >
                  Соус 2
                </p>
              </li>
              <li
                className="text text_type_main-default mb-2"
                style={{ listStyle: "none", width: 272, height: 208 }}
              >
                <img className="ml-4 mr-4" src={imgSauce3} alt="sauce3" />
                <div
                  className="text text_type_main-small"
                  style={{ textAlign: "center" }}
                >
                  40
                </div>
                <p
                  className="text text_type_main-default"
                  style={{ textAlign: "center" }}
                >
                  Соус 3
                </p>
              </li>
              <li
                className="text text_type_main-default mb-2"
                style={{ listStyle: "none", width: 272, height: 208 }}
              >
                <img className="ml-4 mr-4" src={imgSauce4} alt="sauce4" />
                <div
                  className="text text_type_main-small"
                  style={{ textAlign: "center" }}
                >
                  40
                </div>
                <p
                  className="text text_type_main-default"
                  style={{ textAlign: "center" }}
                >
                  Соус 4
                </p>
              </li>
            </ul>
          </WrapperGroup>
          <WrapperGroup title={"Начинки"} />
        </div>

        <Button type="primary" size="large">
          Собрать бургер
        </Button>
      </section>
      <section>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: 600,
          }}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={imgBun1}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={imgBun1}
          />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={imgBun2}
          />
        </div>
      </section>
    </main>
  );
}

export default BurgerInredients;

function WrapperGroup({ title, children }) {
  return (
    <>
      <div className="text text_type_main-medium">{title}</div>
      <div className="mb-10 mt-10">{children}</div>
    </>
  );
}
