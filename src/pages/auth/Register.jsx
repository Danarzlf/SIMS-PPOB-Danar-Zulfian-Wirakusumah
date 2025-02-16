import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { registerUser } from "../../store/auth-slice";

// Images
import Logo from "../../assets/img/Logo.png";
import Illustrasi from "../../assets/img/IllustrasiLogin.png";

// Icons
import { FaAt, FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";

// Utils
import {
  showSuccessToast,
  showLoadingToast,
  showErrorToast,
} from "../../utils/Toast.js";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isLoading, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      await dispatch(registerUser(formData)).unwrap();
      showSuccessToast("Registrasi berhasil!");
      navigate("/login");
    } catch (error) {
      showErrorToast(error.message || "Registrasi gagal. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="flex h-screen w-full">
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
            Lengkapi data untuk membuat akun
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <FaAt
                size={15}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="masukkan email anda"
                required
              />
            </div>

            <div className="relative">
              <FaRegUser
                size={15}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="pl-10 bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="masukkan nama depan"
                required
              />
            </div>

            <div className="relative">
              <FaRegUser
                size={15}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="pl-10 bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="masukkan nama belakang"
                required
              />
            </div>

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="masukkan password anda"
                className="pl-10 bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
              {passwordVisible ? (
                <FaEye
                  size={15}
                  className="absolute bottom-3 right-4 cursor-pointer text-slate-400"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              ) : (
                <FaEyeSlash
                  size={15}
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
              {isLoading ? "Loading..." : "Daftar"}
            </button>

            <p className="text-sm text-center font-light text-gray-500">
              sudah punya akun?{" "}
              <Link
                to={"/login"}
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

export default Register;
