import AppHeader from "./components/app-header/App-Header";
import Bur from "./components/burger-ingredients/Burger-Ingredients";
import Constructor from "./components/burger-constructor/Burger-Constructor";
import styles from "./app.module.css";
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const URL = "https://norma.nomoreparties.space/api/ingredients";
const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function App() {
  const [showModal, setShowModal] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [ingredients, setIngredients] = React.useState([]);
  React.useEffect(() => {
    getData(URL)
      .then((data) => setIngredients(data.data))
      .catch(() => {
        setError("При получении данных произошла ошибка!");
      });
  }, []);

  console.log(ingredients);

  // if (error) {
  //   return <p style={{}}>{error}</p>;
  // }
  return (
    <>
      {/* {error && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
            backgroundColor: "red",
            opacity: "0.9",
            inset: 0,
            zIndex: 100,
            width: 400,
            height: 400,
          }}
          onClick={() => setError(null)}
        >
          {error}
          jhgjhgkhg
        </div>
      )} */}

      <AppHeader />
      <main className={styles.app_main}>
        <Bur data={ingredients} />
        <Constructor />
        {showModal && <Modal open={showModal} onClose={setShowModal} />}
        <Button
          htmlType="button"
          type="primary"
          onClick={() => setShowModal(!showModal)}
        >
          Открыть модальное окно
        </Button>
      </main>
    </>
  );
}

export default App;

const Modal = ({ open, onClose }) => {
  console.log(open);
  if (!open) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      {
        <div
          style={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            opacity: "0.9",
            inset: 0,
            zIndex: 100,
            width: "50vw",
            height: " 50vh",
          }}
        >
          modal
          <Button
            htmlType="button"
            type="primary"
            onClick={() => onClose(false)}
          >
            Закрыть модальное окно
          </Button>
        </div>
      }
    </>,
    document.getElementById("modal")
  );
};
