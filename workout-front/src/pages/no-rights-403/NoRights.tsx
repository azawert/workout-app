import { FC } from "react";

import { Layout } from "src/components/layout/Layout";

export const NoRights: FC = () => {
  return (
    <Layout heading="You don't have permission to interact on this page">
      <div className={"wrapper_inner_page"}>
        <h1>You need to login first</h1>
      </div>
    </Layout>
  );
};
