import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { Navbar } from "../../components/navbar/Navbar";
import { GreetingCard } from "../../components/home/GreetingCard";
import { ModalConfirmation, 
         ModalSuccess, 
         ModalFailed } from "../../components/modal/Modal";

// Icons
import { MdMoney } from "react-icons/md";

// Redux
import { topUpBalance } from "../../store/transaction-slice";

// Cookie
import Cookies from "js-cookie";

const buttonGroups = [
  {
    buttons: [{ value: 10000 }, { value: 20000 }, { value: 50000 }],
  },
  {
    buttons: [{ value: 100000 }, { value: 250000 }, { value: 500000 }],
  },
];

export const TopUp = () => {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isFailedOpen, setIsFailedOpen] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.transaction);

  const isValidAmount = topUpAmount >= 10000 && topUpAmount <= 1000000;

  const openConfirmationModal = () => {
    setIsConfirmationOpen(true);
  };

  const closeModal = () => {
    setIsConfirmationOpen(false);
  };

  const handleTopUp = () => {
    const token = Cookies.get("token");
    if (!token) {
      alert("Token tidak ditemukan, silakan login kembali.");
      return;
    }
    dispatch(topUpBalance({ token, amount: topUpAmount }));
  };

  useEffect(() => {
    if (!loading && !error && isConfirmationOpen) {
      setIsSuccessOpen(true);
      setIsConfirmationOpen(false);
    } else if (!loading && error && isConfirmationOpen) {
      setIsFailedOpen(true);
      setIsConfirmationOpen(false);
    }
  }, [loading, error]);

  return (
    <>
      <Navbar />

      {/* Modal Confirmation */}
      {isConfirmationOpen && (
        <ModalConfirmation
          amount={topUpAmount}
          onConfirm={handleTopUp}
          closeModal={closeModal}
        />
      )}

      {/* Modal Success */}
      {isSuccessOpen && (
        <ModalSuccess closeModal={() => setIsSuccessOpen(false)} amount={topUpAmount} />
      )}

      {/* Modal Failed */}
      {isFailedOpen && (
        <ModalFailed closeModal={() => setIsFailedOpen(false)} amount={topUpAmount} />
      )}

      <div className="w-full bg-white">
        <div className="mx-auto flex w-[90%] max-w-7xl flex-col gap-6 pb-10 pt-20">
          <GreetingCard />
          <div className="mt-6 flex flex-col">
            <p className="text-base text-slate-500">Silahkan masukan</p>
            <h1 className="text-2xl font-bold text-black">Nominal Top Up</h1>
            <form className="mt-8 flex flex-col items-center justify-between lg:flex-row">
              <div className="flex w-full flex-col gap-4 lg:w-[73%]">
                <div className="flex w-full items-center gap-1 rounded-md border py-3 pl-3">
                  <MdMoney size={18} className="text-slate-700" />
                  <input
                    type="number"
                    name="nominalTopUp"
                    placeholder="masukkan nominal"
                    value={topUpAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTopUpAmount(value === "" ? "" : Number(value));
                    }}
                    className="w-full px-1 text-sm outline-none"
                  />
                </div>
                <button
                  type="button"
                  disabled={!isValidAmount}
                  onClick={openConfirmationModal}
                  className={`w-full rounded-md border-2 border-white py-3 text-sm text-white 
                    ${
                      !isValidAmount
                        ? "bg-slate-300 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-red-600"
                    }`}
                >
                  Top Up
                </button>
              </div>
              <div className="flex w-full flex-row gap-4 lg:flex lg:w-[25%] lg:flex-col">
                {buttonGroups.map((group, index) => (
                  <div className="flex w-full" key={index}>
                    {group.buttons.map((nominal, nominalIndex) => (
                      <button
                        key={nominalIndex}
                        type="button"
                        className="w-full rounded-md border py-3 text-sm text-slate-600 hover:bg-slate-50"
                        onClick={() => setTopUpAmount(nominal.value)}
                      >
                        Rp{nominal.value.toLocaleString()}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
