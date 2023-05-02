import clsx from "clsx";
import { FC, HTMLProps } from "react";

import styles from "./button.module.scss";

interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  sizeName?: "xl" | "lg" | "md";
}
export const Button: FC<IButtonProps> = ({
  sizeName = "xl",
  children,
  onClick,
}) => {
  return (
    <button className={clsx(styles.button, styles[sizeName])} onClick={onClick}>
      {children}
    </button>
  );
};
