import { Layout } from "src/components/layout/Layout";

export const NotFound = () => {
  return (
    <Layout heading="This page doesn`t seems to exist">
      <div className={"wrapper_inner_page"}>
        <h1>Page is not found</h1>
      </div>
    </Layout>
  );
};
