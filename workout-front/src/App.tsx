import { BrowserRouter, Route, Routes } from "react-router-dom";

import { routes } from "./routes/routes";

import { useAuth } from "./hooks/useAuth";

import { NoRights } from "./pages/no-rights-403/NoRights";
import { NotFound } from "./pages/not-found/NotFound";

function App() {
  const { isAuth } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            element={
              route.isForAuthenticated === isAuth || isAuth ? (
                <route.component />
              ) : (
                <NoRights />
              )
            }
            path={route.path}
            key={route.path}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
