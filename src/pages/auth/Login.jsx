// src/pages/auth/Login.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Cookie
import Cookies from "js-cookie";

// Images
import Logo from "../../assets/img/Logo.png";
import Illustrasi from "../../assets/img/IllustrasiLogin.png";

// Icon
import { FaAt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

// Redux
import { loginUser } from "../../store/auth-slice";

import {
    showSuccessToast,
    showLoadingToast,
    showErrorToast,
  } from "../../utils/Toast.js";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
  e.preventDefault();
  const formData = { email, password };


  dispatch(loginUser(formData))
    .unwrap()
    .then((data) => {
      if (data.data.token) {
        Cookies.set("token", data.data.token);
        showSuccessToast("Login berhasil!");
        navigate("/"); 
      }
    })
    .catch((error) => {
      showErrorToast(
        error.message || "Login gagal. Periksa email dan password."
      );
    });
};


  return (
    <div className="flex h-screen w-full">    
      {/* layar kiri */}
      <div className="flex items-center justify-center w-full md:w-1/2 h-full">
        <div className="w-[80%] sm:w-[70%] md:w-[65%]">
          <div className="flex items-center gap-2 justify-center">
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              className="w-6 object-contain md:w-8"
            />
            <p className="text-lg font-semibold text-black-600 md:text-xl">
              SIMS PPOB
            </p>
          </div>
          
          <h1 className="text-center text-2xl my-6 font-bold text-black lg:w-3/4 xl:w-2/3 xl:text-3xl mx-auto">
            Masuk atau buat akun untuk memulai
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <FaAt
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="masukkan email anda"
                required
              />
            </div>

            <div className="relative">
              <FaLock
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="masukkan password anda"
                className="pl-10 bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
              {passwordVisible ? (
                <FaEye
                  size={20}
                  className="absolute bottom-3 right-4 cursor-pointer text-slate-400"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              ) : (
                <FaEyeSlash
                  size={20}
                  className="absolute bottom-3 right-4 cursor-pointer text-slate-400"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 rounded-md bg-orange-700 py-3 text-sm text-white hover:bg-orange-800"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Masuk"}
            </button>

            <p className="text-sm text-center font-light text-gray-500">
              belum punya akun?{" "}
              <Link
                to={"/register"}
                className="text-sm font-semibold text-orange-700"
              >
                di sini
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="m-auto hidden h-full max-h-screen w-1/2 bg-[#fff1f0] md:flex">
        <img
          src={Illustrasi}
          alt="Illustrasi"
          loading="lazy"
          className="h-full max-h-screen w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
