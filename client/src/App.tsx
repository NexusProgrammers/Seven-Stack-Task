import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ButtonSpinner from "./components/ButtonSpinner";
import PublicRoute from "./components/PublicRoute";
import ProtectRoute from "./components/ProtectRoute";
import ViewBook from "./pages/ViewBook";
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<ButtonSpinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />
          <Route
            path="/book/:id"
            element={
              <ProtectRoute>
                <ViewBook />
              </ProtectRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
