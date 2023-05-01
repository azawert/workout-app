import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

import { Header } from "./header/Header";
import styles from "./layout.module.scss";

interface ILayoutProps extends PropsWithChildren {
  image?: string;
  heading?: string;
}

export const Layout: FC<ILayoutProps> = ({ children, heading, image }) => {
  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.other__page]: !!heading,
      })}
      style={{ backgroundImage: `url(${image})` }}
    >
      <Header />
      {heading && <h1 className={styles.heading}>{heading}</h1>}
      <div>{children}</div>
    </div>
  );
};
