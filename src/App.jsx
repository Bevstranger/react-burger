import AppHeader from "./components/app-header/App-Header";
import Bur from "./components/burger-ingredients/Burger-Ingredients";
import Constructor from "./components/burger-constructor/Burger-Constructor";
import styles from "./app.module.css";
import React from "react";
import { ingredientsRequest } from "./services/ingredientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// const URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ing.error);
  const ingredients = useSelector((state) => state.ing.data);

  React.useEffect(() => {
    dispatch(ingredientsRequest());
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
        <DndProvider backend={HTML5Backend}>
          <Bur />
          <Constructor />
        </DndProvider>
      </main>
    </>
  );
}

export default App;
