import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { fetchBanners } from "../../store/information-slice";

// Cookie
import Cookies from "js-cookie";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const Banner = () => {
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector((state) => state.information);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(fetchBanners(token));
    }
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="my-6 w-full">
    <h5 className="text-base font-semibold text-black mb-4">
      Temukan promo menarik
    </h5>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={4}
      breakpoints={{
        0: {
          slidesPerView: 2, // Untuk ukuran layar terkecil (HP)
        },
        640: {
          slidesPerView: 3, // Untuk tablet atau layar lebih besar
        },
        1024: {
          slidesPerView: 4, // Untuk desktop
        },
      }}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <img
            src={banner.banner_image}
            alt={banner.banner_name}
            className="rounded-lg object-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
};
