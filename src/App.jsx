import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Home } from "./pages/user/Home";
import { TopUp } from "./pages/user/TopUp";
import { Service } from "./pages/user/Service";
import { History } from "./pages/user/History";
import { Account } from "./pages/user/Account";

// Components
import { AuthRoute } from "./components/auth-page/AuthRoute";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoute element={<Home />} />} />
        <Route path="/top-up" element={<AuthRoute element={<TopUp />} />} />
        <Route path="/service/:service_code" element={<AuthRoute element={<Service />} />} />
        <Route path="/history" element={<AuthRoute element={<History />} />} />
        <Route path="/account" element={<AuthRoute element={<Account />} />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
