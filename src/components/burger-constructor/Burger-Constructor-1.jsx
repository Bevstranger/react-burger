import {
  Button,
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerComstructor() {
  const result = 5 + 3;

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        padding: "10px",
      }}
    >
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <p className="text text_type_main-medium mt-4">
        Для начала работы надо выбрать блюдо
      </p>
      <section className="mt-10">
        <div className="text text_type_main-default">Булки</div>
        <div className="mt-5">
          <input type="checkbox" id="bun" name="bun" value="bun" />
          <label htmlFor="bun">Булки</label>
        </div>

        <div className="mb-2">
          <input type="checkbox" id="bun" name="bun" value="bun" />
          <label htmlFor="bun">Булки</label>
        </div>

        <div className="mb-2">
          <input type="checkbox" id="sauce" name="sauce" value="sauce" />
          <label htmlFor="sauce">Соусы</label>
        </div>

        <div className="mb-2">
          <input type="checkbox" id="main" name="main" value="main" />
          <label htmlFor="main">Начинки</label>
        </div>

        <div className="mt-10">
          <Button type="primary" size="medium">
            Собрать бургер
          </Button>
        </div>
      </section>
    </header>
  );
}

export default BurgerComstructor;
