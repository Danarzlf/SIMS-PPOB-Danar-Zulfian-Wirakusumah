import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import { fetchBanners, fetchServices } from "../../store/information-slice";

// Cookie
import Cookies from "js-cookie";

// Images
import Illustrasi from "../../assets/img/IllustrasiLogin.png";

export const Services = () => {
    const dispatch = useDispatch();
    const { banners, services, loading, error } = useSelector((state) => state.information);
  
    useEffect(() => {
      const token = Cookies.get("token");
      if (token) {
        dispatch(fetchBanners(token));
        dispatch(fetchServices(token));
      }
    }, [dispatch]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
        <>   
          <div className="mt-2 flex w-full flex-wrap items-start justify-center gap-2 md:mt-6 lg:gap-0">
            {services.map((service, index) => (
              <Link
              to={`/service/${service.service_code}`}
              state={{ service }}
              key={index}
              className="flex w-fit max-w-[70px] flex-col items-center justify-center gap-1 sm:gap-2 md:w-1/12 lg:max-w-none"
            >
              <img
                src={service.service_icon}
                alt={service.service_name}
                className="aspect-square w-fit object-contain"
              />
              <p className="w-[80%] break-words text-center text-xs text-slate-500 sm:text-sm">
                {service.service_name}
              </p>
            </Link>
            
            ))}
          </div>
        </>
      );
    };