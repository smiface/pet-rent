import "./App.css";
import { observer } from "mobx-react-lite";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import CarPage from "./pages/CarPage/CarPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";
import RootStore from "./store/RootStore";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import Header from "./components/Header/Header";
import Notifications from "./components/Notifications/Notifications";

function App() {
  const checkAuth = (component: JSX.Element) => {
    return RootStore.auth.id > 0 ? component : <Login />;
  };

  useEffect(() => {
    RootStore.auth.auth();
  }, []);

  return (
    <div className="App">
      {/* <Header /> */}
      <Notifications />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={checkAuth(<Navigate to="city/moscow" replace />)} />
        <Route path="city/" element={checkAuth(<HomePage />)}>
          <Route path=":city" element={checkAuth(<HomePage />)} />
        </Route>

        <Route path="/payment" element={checkAuth(<PaymentPage />)} />
        <Route path="/feedback" element={checkAuth(<FeedbackPage />)} />

        <Route path="car/" element={checkAuth(<CarPage />)}>
          <Route path=":id" element={<CarPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default observer(App);
