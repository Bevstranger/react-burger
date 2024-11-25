import styles from "../login.module.css";
import { useLogoutMutation } from "../../services/api/auth";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

export const Profile = () => {
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout({ token: localStorage.getItem("refreshToken") });
  };

  return (
    <div className={styles.profileWrapper}>
      <nav className={styles.profileNav}>
        <ul>
          <li>
            <NavLink
              to={"/profile"}
              className={({ isActive }) => {
                return !isActive ? styles.linkActive : styles.link;
              }}
            >
              Профиль
            </NavLink>
          </li>
          <li className="mt-10">
            <NavLink
              to={"/orders"}
              className={(active) => (active ? styles.linkActive : styles.link)}
            >
              История заказов
            </NavLink>
          </li>
          <li onClick={handleLogout} className="mt-10">
            <NavLink
              to={"/"}
              className={(active) => (active ? styles.linkActive : styles.link)}
            >
              Выход
            </NavLink>
          </li>
          <li className="mt-30">
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};
