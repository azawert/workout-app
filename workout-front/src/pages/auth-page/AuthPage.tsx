import { Auth } from "src/features/auth/Auth";

import { Layout } from "src/components/layout/Layout";

import image from "../../../public/images/ex-bg-1.jpg";

export const AuthPage = () => {
  return (
    <>
      <Layout heading="Login" image={image} />
      <Auth />
    </>
  );
};
