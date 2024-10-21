import {
  Button,
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header
      style={{
        maxWidth: "1320px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        padding: "10px",
      }}
    >
      <nav
        style={{
          height: 50,
          color: "white",
          display: "flex",
          flex: "0 0 auto",
        }}
      >
        <Button
          htmlType="button"
          type="secondary"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <BurgerIcon type="primary" />
          <span style={{ color: "white" }}>Конструктор</span>
        </Button>
        <Button
          htmlType="button"
          type="secondary"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <ListIcon type="primary" />
          <span style={{ color: "white" }}>Лента заказов</span>
        </Button>
      </nav>
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Logo />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button
          htmlType="button"
          type="secondary"
          style={{ display: "flex", alignItems: "end", gap: 8 }}
        >
          <ProfileIcon type="primary" />
          <span style={{ color: "white" }}>Личный кабинет</span>
        </Button>
      </div>
    </header>
  );
}

export default AppHeader;
