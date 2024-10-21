import AppHeader from "./components/app-header/App-Header1";
import Bur from "./components/burger-ingredients/Burger-Ingredients";
import Constructor from "./components/burger-constructor/Burger-Constructor";
import styles from "./app.module.css";

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.app_main}>
        <Bur />
        <Constructor />
      </main>
    </>
  );
}

export default App;
