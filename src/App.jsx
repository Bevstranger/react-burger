import AppHeader from "./components/app-header/App-Header";
import Bur from "./components/burger-ingredients/Burger-Ingredients";
import Constructor from "./components/burger-constructor/Burger-Constructor";
import styles from "./app.module.css";
import React from "react";

const URL = "https://norma.nomoreparties.space/api/ingredients";
const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

function App() {
  const [error, setError] = React.useState(null);
  const [ingredients, setIngredients] = React.useState([]);
  React.useEffect(() => {
    getData(URL)
      .then((data) => setIngredients(data.data))
      .catch((error) => {
        setError(error.message + " Ошибка при получении ингредиентов");
      });
  }, []);

  if (error) {
    return (
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
      </div>
    );
  }

  return (
    <>
      <AppHeader />
      <main className={styles.app_main}>
        <Bur data={ingredients} />
        <Constructor data={ingredients} />
      </main>
    </>
  );
}

export default App;
