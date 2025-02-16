import React, { useState } from "react";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/img/Logo.png";

// Icon
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

export const ModalConfirmation = ({ amount, onConfirm, closeModal }) => {
  const [isOpen, setIsOpen] = useState(true);


  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="relative w-full max-w-xs max-h-full p-4">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex flex-col items-center text-center p-4 md:p-5 space-y-1">
            <img
              src={Logo}
              alt="Logo"
              className="h-12 w-12 object-contain mb-5"
            />
            <p className="text-sm text-slate-500">
              Anda yakin untuk Top Up sebesar
            </p>
            <h5 className="text-xl font-bold text-black">
              Rp{amount ? amount.toLocaleString() : 0}
            </h5>
            <button
              type="button"
              onClick={onConfirm}
              className="mb-2 mt-5 text-sm font-semibold text-orange-600"
            >
              Ya, lanjutkan Bayar
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="mb-2 mt-5 text-sm font-semibold text-slate-300"
            >
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalSuccess = ({ closeModal, amount }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
      <div className="relative w-full max-w-xs max-h-full p-4">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex flex-col items-center text-center p-4 md:p-5 space-y-1">
            <FaCheckCircle size={60} className="text-green-500 mb-5" />
            <p className="text-sm text-slate-500">Top Up sebesar</p>
            <h5 className="text-xl font-bold text-black">Rp{amount?.toLocaleString()}</h5>
            <p className="text-xs text-slate-400">berhasil!</p>
            <a href="/">
              <button
                className="mb-2 mt-5 text-sm font-semibold text-orange-600"
              >
                Kembali ke Beranda
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


export const ModalFailed = ({ closeModal, amount }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
      <div className="relative w-full max-w-xs max-h-full p-4">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex flex-col items-center text-center p-4 md:p-5 space-y-1">
            <IoMdCloseCircle size={60} className="text-red-500 mb-5" />
            <p className="text-sm text-slate-500">Top Up sebesar</p>
            <h5 className="text-xl font-bold text-black">Rp{amount?.toLocaleString()}</h5>
            <p className="text-xs text-slate-400">gagal</p>
            <a href="/">
              <button
                className="mb-2 mt-5 text-sm font-semibold text-orange-600"
              >
                Kembali ke Beranda
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


export const ModalConfirmationService = ({ amount, onConfirm, closeModal }) => {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="relative w-full max-w-xs max-h-full p-4">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex flex-col items-center text-center p-4 md:p-5 space-y-1">
            <img
              src={Logo}
              alt="Logo"
              className="h-12 w-12 object-contain mb-5"
            />
            <p className="text-sm text-slate-500">
              Beli listrik prabayar senilai
            </p>
            <h5 className="text-xl font-bold text-black">
              Rp{amount ? amount.toLocaleString() : 0} ?
            </h5>
            <button
              type="button"
              onClick={onConfirm}
              className="mb-2 mt-5 text-sm font-semibold text-orange-600"
            >
              Ya, lanjutkan Bayar
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="mb-2 mt-5 text-sm font-semibold text-slate-300"
            >
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export const ModalSuccessService = ({ closeModal, amount }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="relative w-full max-w-xs max-h-full p-4">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex flex-col items-center text-center p-4 md:p-5 space-y-1">
            <FaCheckCircle size={60} className="text-green-500 mb-5" />
            <p className="text-sm text-slate-500">Top Up sebesar</p>
            <h5 className="text-xl font-bold text-black">
              Rp{amount?.toLocaleString()}
            </h5>
            <p className="text-xs text-slate-400">berhasil!</p>
            <a href="/">
              <button
                className="mb-2 mt-5 text-sm font-semibold text-orange-600"
              >
                Kembali ke Beranda
              </button>
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
};




export const ModalFailedService = ({ closeModal, amount }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="relative w-full max-w-xs max-h-full p-4">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex flex-col items-center text-center p-4 md:p-5 space-y-1">
            <IoMdCloseCircle size={60} className="text-red-500 mb-5" />
            <p className="text-sm text-slate-500">Top Up sebesar</p>
            <h5 className="text-xl font-bold text-black">
              Rp{amount?.toLocaleString()}
            </h5>
            <p className="text-xs text-slate-400">gagal</p>
            <a href="/">
              <button
                className="mb-2 mt-5 text-sm font-semibold text-orange-600"
              >
                Kembali ke Beranda
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
