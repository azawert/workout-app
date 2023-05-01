import { BrowserRouter, Route, Routes } from "react-router-dom";

import { routes } from "./routes/routes";

import { Layout } from "./components/layout/Layout";

import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuth } = useAuth();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route) => (
            <Route
              element={<route.component />}
              path={route.path}
              key={route.path}
            />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
