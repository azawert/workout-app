import clsx from "clsx";
import { FC, SetStateAction } from "react";
import { Link } from "react-router-dom";

import { menuData } from "./menu.data";
import styles from "./menu.module.scss";

interface IMenuProps {
  isShow: boolean;
  setIsShow: React.Dispatch<SetStateAction<boolean>>;
}

export const Menu: FC<IMenuProps> = ({ isShow, setIsShow }) => {
  const handleLogoutClick = () => {
    return null;
  };
  const handleCloseAfterClickOnMenuItem = () => {
    setIsShow(false);
  };
  return (
    <div className={styles.wrapper}>
      <nav
        className={clsx(styles.menu, {
          [styles.show]: isShow,
        })}
      >
        <ul>
          {menuData.map((menuItem) => (
            <li key={menuItem.title}>
              <Link
                to={menuItem.link}
                onClick={handleCloseAfterClickOnMenuItem}
              >
                {menuItem.title}
              </Link>
            </li>
          ))}
          <li onClick={handleCloseAfterClickOnMenuItem}>
            <button className={styles.logout_button}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
