import {
  Button,
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={styles.headerWrapper}>
      <nav className={styles.navWrapper}>
        <Button
          htmlType="button"
          type="secondary"
          extraClass={styles.buttonHeader}
        >
          <BurgerIcon type="primary" />
          <span className={styles.textSpan}>Конструктор</span>
        </Button>

        <Button
          htmlType="button"
          type="secondary"
          extraClass={styles.buttonHeader}
        >
          <ListIcon type="primary" />
          <span className={styles.textSpan}>Лента заказов</span>
        </Button>
      </nav>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.profile}>
        <Button
          htmlType="button"
          type="secondary"
          extraClass={styles.buttonProfile}
        >
          <ProfileIcon type="primary" />
          <span className={styles.textSpan}>Личный кабинет</span>
        </Button>
      </div>
    </header>
  );
}

export default AppHeader;
