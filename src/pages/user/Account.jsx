import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Cookie
import Cookies from "js-cookie";

// Redux
import {
  fetchProfile,
  updateProfile,
  updateProfileImage,
} from "../../store/profile-slice";

// Images
import ProfilePhoto from "../../assets/img/ProfilePhoto.png";

// Components
import { Navbar } from "../../components/navbar/Navbar";

// Icons
import { FaAt, FaRegUser, FaPen } from "react-icons/fa";

import {
  showSuccessToast,
  showLoadingToast,
  showErrorToast,
} from "../../utils/Toast.js";

export const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector((state) => state.profile);

  const [selectedImage, setSelectedImage] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(fetchProfile(token));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    if (isEditMode) {
      const token = Cookies.get("token");
      if (token) {
        showLoadingToast("Menyimpan perubahan...");

        dispatch(
          updateProfile({
            token,
            first_name: formData.first_name,
            last_name: formData.last_name,
          })
        )
          .unwrap()
          .then(() => {
            showSuccessToast("Profil berhasil diperbarui!");
          })
          .catch((error) => {
            showErrorToast(
              error.message || "Gagal memperbarui profil. Coba lagi."
            );
          });
      }
    }
    setIsEditMode(!isEditMode);
  };

  // Refresh data profile
  useEffect(() => {
    if (!isEditMode) {
      const token = Cookies.get("token");
      if (token) {
        dispatch(fetchProfile(token));
      }
    }
  }, [isEditMode, dispatch]);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      const token = Cookies.get("token");
      if (token) {
        showLoadingToast("Mengunggah foto...");

        dispatch(updateProfileImage({ token, file }))
          .unwrap()
          .then(() => {
            showSuccessToast("Foto profil berhasil diperbarui!");
          })
          .catch((error) => {
            showErrorToast(
              error.message || "Gagal mengunggah foto. Coba lagi."
            );
          });
      }
    }
  };

  useEffect(() => {
    if (selectedImage) {
      const token = Cookies.get("token");
      if (token) {
        dispatch(fetchProfile(token));
      }
    }
  }, [selectedImage, dispatch]);

  // Fungsi Logout
  const handleLogout = () => {
    Cookies.remove("token");
    showSuccessToast("Berhasil logout!");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div className="w-full bg-white">
        <form className="mx-auto flex w-[80%] max-w-7xl flex-col items-center justify-center gap-4 pb-10 pt-20 md:w-[60%] md:gap-6 lg:w-[55%]">
          <label
            htmlFor="profile_image"
            className="relative mx-auto h-36 w-36 cursor-pointer"
          >
            <input
              type="file"
              name="profile_image"
              id="profile_image"
              className="hidden"
              onChange={handleImageChange}
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : profile?.profile_image &&
                    profile?.profile_image !==
                      "https://minio.nutech-integrasi.com/take-home-test/null"
                  ? profile?.profile_image
                  : ProfilePhoto
              }
              alt="Profile Photo"
              loading="lazy"
              className="mx-auto h-full w-full rounded-full object-cover"
            />
            <div className="absolute bottom-1 right-0 rounded-full border-2 border-slate-300 bg-white p-2">
              <FaPen size={15} className="text-black" />
            </div>
          </label>

          <h1 className="text-center text-2xl font-bold sm:text-3xl">
            {formData.first_name || "Nama Depan"}{" "}
            {formData.last_name || "Nama Belakang"}
          </h1>

          <div className="flex w-full flex-col gap-1 md:gap-2">
            <label htmlFor="email" className="text-sm font-medium text-black">
              Email
            </label>
            <div className="relative flex w-full items-center gap-2 rounded-md border">
              <FaAt
                size={15}
                className="absolute bottom-3 left-3 text-slate-600"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full py-3 pl-10 pr-4 text-sm outline-none placeholder:text-slate-600"
                readOnly
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-1 md:gap-2">
            <label
              htmlFor="first_name"
              className="text-sm font-medium text-black"
            >
              Nama Depan
            </label>
            <div className="relative flex w-full items-center gap-2 rounded-md border">
              <FaRegUser
                size={15}
                className="absolute bottom-[14px] left-3 text-slate-600"
              />
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Nama Depan"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full py-3 pl-10 pr-4 text-sm outline-none placeholder:text-slate-600"
                readOnly={!isEditMode}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-1 md:gap-2">
            <label
              htmlFor="last_name"
              className="text-sm font-medium text-black"
            >
              Nama Belakang
            </label>
            <div className="relative flex w-full items-center gap-2 rounded-md border">
              <FaRegUser
                size={15}
                className="absolute bottom-[14px] left-3 text-slate-600"
              />
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Nama Belakang"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full py-3 pl-10 pr-4 text-sm outline-none placeholder:text-slate-600"
                readOnly={!isEditMode}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <button
              type="button"
              onClick={handleEditClick}
              className="w-full font-semibold rounded-md border-2 border-orange-600 bg-white py-3 text-sm text-orange-600 hover:bg-orange-600 hover:text-white sm:text-base"
            >
              {isEditMode
                ? isLoading
                  ? "Menyimpan..."
                  : "Simpan"
                : "Edit Profil"}
            </button>

            {!isEditMode && (
              <button
                type="button"
                className="w-full font-semibold rounded-md border-2 border-white bg-orange-600 py-3 text-sm text-white hover:bg-red-600 sm:text-base"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
