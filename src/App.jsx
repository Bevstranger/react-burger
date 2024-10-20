import AppHeader from "./components/app-header/App-Header";
import Bur from "./components/burger-ingredients/Burger-Ingredients";
import Constructor from "./components/burger-constructor/Burger-Constructor";
import "./App.css";

function App() {
  return (
    <>
      <AppHeader />
      <main className="app__main">
        <Bur />
        <Constructor />
      </main>
    </>
  );
}

export default App;
