import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import { Navbar } from "../../components/navbar/Navbar";
import { GreetingCard } from "../../components/home/GreetingCard";
import {
  ModalConfirmationService,
  ModalSuccessService,
  ModalFailedService,
} from "../../components/modal/Modal";

// Icons
import { MdMoney } from "react-icons/md";

// Redux
import { doTransaction } from "../../store/transaction-slice";

// Cookie
import Cookies from "js-cookie";

export const Service = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { service } = location.state || {}; // Ambil data dari state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  const { loading, transactionResult, error } = useSelector(
    (state) => state.transaction
  );

  const handlePayment = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsModalOpen(false);

    const token = Cookies.get("token");

    dispatch(
      doTransaction({
        token,
        serviceCode: service.service_code, 
      })
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (transactionResult) {
      setIsSuccessModalOpen(true);
    } else if (error) {
      setIsFailedModalOpen(true);
    }
  }, [transactionResult, error]);

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleCloseFailedModal = () => {
    setIsFailedModalOpen(false);
  };

  if (!service) return <p>Service tidak ditemukan</p>;

  return (
    <>
      <Navbar />
      <div className="w-full bg-white">
        <div className="mx-auto flex w-[90%] max-w-7xl flex-col gap-6 pb-10 pt-20">
          <GreetingCard />

          <div className="mt-6 flex w-full flex-col">
            <p className="text-base text-slate-500">Pembayaran</p>
            <div className="flex items-center gap-2">
              <img
                src={service.service_icon}
                alt={service.service_name}
                className="h-5 w-5 object-contain"
              />
              <h1 className="text-base font-semibold text-black">
                {service.service_name}
              </h1>
            </div>
            <div className="mt-8 flex w-full flex-col gap-2">
              <div className="mb-4 flex w-full items-center gap-1 rounded-md border py-3 pl-3">
                <MdMoney size={18} className="text-slate-700" />
                <input
                  type="text"
                  name="topUpAmount"
                  value={service.service_tariff || "0"}
                  readOnly
                  className="w-full px-1 text-sm outline-none bg-transparent cursor-default select-none"
                />
              </div>
              <button
                type="button"
                onClick={handlePayment}
                className="w-full rounded-md border-2 border-white bg-orange-600 py-3 text-sm text-white hover:bg-red-600"
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalConfirmationService
          amount={service.service_tariff}
          onConfirm={handleConfirmPayment}
          closeModal={handleCloseModal}
        />
      )}

      {isSuccessModalOpen && (
        <ModalSuccessService
          amount={service.service_tariff}
          closeModal={handleCloseSuccessModal}
        />
      )}

      {isFailedModalOpen && (
        <ModalFailedService
          amount={service.service_tariff}
          closeModal={handleCloseFailedModal}
        />
      )}
    </>
  );
};
