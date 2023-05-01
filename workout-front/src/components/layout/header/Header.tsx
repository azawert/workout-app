import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BurgerIcon } from "src/components/icons/BurgerIcon";
import { CloseIcon } from "src/components/icons/CloseIcon";
import { LeftArrow } from "src/components/icons/LeftArrow";
import { UserIcon } from "src/components/icons/UserIcon";

import { useAuth } from "src/hooks/useAuth";
import { useOutsideClick } from "src/hooks/useOutsideClick";

import styles from "./header.module.scss";
import { Menu } from "./menu/Menu";

export const Header: FC = () => {
  const { isShow, ref, setIsShow } = useOutsideClick(false);
  const handleClickMenu = () => {
    setIsShow((prev) => !prev);
  };
  const { isAuth } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMainPage = pathname === "/";
  const handleClickOnArrow = () => {
    navigate(-1);
  };
  return (
    <header className={styles.wrapper_header}>
      <button onClick={isMainPage ? () => null : handleClickOnArrow}>
        {isMainPage ? <UserIcon /> : <LeftArrow />}
      </button>

      {isShow ? (
        <div ref={ref}>
          <button onClick={handleClickMenu}>
            <CloseIcon />
          </button>
          <Menu isShow={isShow} setIsShow={setIsShow} />
        </div>
      ) : (
        <button onClick={handleClickMenu}>
          <BurgerIcon />
        </button>
      )}
    </header>
  );
};
