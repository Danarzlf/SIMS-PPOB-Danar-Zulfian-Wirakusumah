import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Cookie
import Cookies from "js-cookie";

// Components
import { Navbar } from "../../components/navbar/Navbar";
import { GreetingCard } from "../../components/home/GreetingCard";

// Redux
import { fetchTransactions } from "../../store/transaction-slice";

export const History = () => {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(fetchTransactions(token));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="w-full bg-white">
        <div className="mx-auto flex w-[90%] max-w-7xl flex-col gap-5 pb-10 pt-20">
          <GreetingCard />
          <div className="mt-6 flex w-full flex-col gap-5">
            <p className="font-medium text-black">Semua Transaksi</p>

            {loading && <p>Loading...</p>}
            {error && (
              <p className="text-red-500">Error: {error}</p>
            )}

            {history.length > 0 ? (
              history.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full items-start justify-between rounded-md border border-slate-400 px-5 py-3"
                >
                  <div className="mr-auto flex flex-col gap-2">
                    <h5
                      className={`text-lg font-semibold ${
                        item.transaction_type === "TOPUP"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      Rp. {item.total_amount.toLocaleString()}
                    </h5>
                    <div className="flex flex-wrap sm:gap-2">
                      <p className="mr-2 text-[10px] text-slate-400 sm:mr-0">
                        {new Date(item.created_on).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(item.created_on).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}{" "}
                        WIB
                      </p>
                    </div>
                  </div>
                  <p className="text-end text-[10px] font-medium text-slate-600 sm:text-xs">
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
              !loading && <p>Tidak ada riwayat transaksi.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
