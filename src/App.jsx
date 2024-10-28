import AppHeader from "./components/app-header/App-Header";
import Bur from "./components/burger-ingredients/Burger-Ingredients";
import Constructor from "./components/burger-constructor/Burger-Constructor";
import styles from "./app.module.css";
import React from "react";
import { getData } from "./api/api";

const URL = "https://norma.nomoreparties.space/api/ingredients";

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
      <div className={styles.error} onClick={() => setError(null)}>
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
