import { useNavigate } from "react-router-dom";

import { routesLinks } from "src/helpers/constants";

import { Layout } from "src/components/layout/Layout";
import { Button } from "src/components/ui/button/Button";

import { useAuth } from "src/hooks/useAuth";

import image from "../../../public/images/main.jpg";

import styles from "./home.module.scss";

export const HomePage = () => {
  const navigate = useNavigate();
  const handleClickNewButton = () => {
    navigate(isAuth ? routesLinks.new_workout_link : routesLinks.auth_link);
  };
  const { isAuth } = useAuth();
  return (
    <Layout image={image}>
      <div className={styles.wrapper}>
        <Button onClick={handleClickNewButton}>
          {isAuth ? "New workout" : "Login"}
        </Button>
        <h1 className={styles.heading}>Some weird quote out here</h1>
      </div>
    </Layout>
  );
};
