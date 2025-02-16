// Import
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { fetchProfile } from "../../store/profile-slice";
import { fetchBalance } from "../../store/transaction-slice";

// Cookie
import Cookies from "js-cookie";

// Images
import ProfilePhoto from "../../assets/img/ProfilePhoto.png";
import BackgroundSaldo from "../../assets/img/BackgroundSaldo.png"; // Tambahkan ini

// Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const GreetingCard = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { balance, loading: balanceLoading } = useSelector(
    (state) => state.transaction
  );
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(fetchProfile(token));
      dispatch(fetchBalance(token));
    }
  }, [dispatch]);

  const toggleBalanceVisibility = () => {
    setShowBalance((prevState) => !prevState);
  };

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:gap-0">
      <div className="w-full md:w-[40%]">
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start">
        <img
          src={
            profile?.profile_image && profile.profile_image !== "https://minio.nutech-integrasi.com/take-home-test/null"
              ? profile.profile_image
              : ProfilePhoto
          }
          alt="Foto Profil"
          loading="lazy"
          className="h-20 w-20 rounded-full border object-cover aspect-square md:h-16 md:w-16"
        />


          <div className="text-center md:text-left">
            <p className="text-base text-slate-500 mt-2 md:mt-4">
              Selamat datang,
            </p>
            <h1 className="text-2xl font-bold text-black">
              {profile
                ? `${profile?.first_name} ${profile?.last_name}`
                : "Pengguna"}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[60%]">
        <div
          className="rounded-md overflow-hidden p-5 flex flex-col gap-2 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BackgroundSaldo})` }} // Gunakan variabel gambar
        >
          <p className="text-base text-white">Saldo Anda</p>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            Rp
            <span className="tracking-[5px]">
              {balanceLoading
                ? "Loading..."
                : showBalance
                ? balance?.toLocaleString()
                : "**********"}
            </span>
          </h1>
          <button
            onClick={toggleBalanceVisibility}
            className="flex items-center gap-2 text-sm text-white"
          >
            <span>
              {showBalance ? "Sembunyikan" : "Tampilkaan"} Saldo
            </span>
            {showBalance ? (
              <FaEyeSlash size={15} className="text-white" />
            ) : (
              <FaEye size={15} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
