import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Images
import Illustrasi from "../../assets/img/IllustrasiLogin.png";

// Components
import { Navbar } from "../../components/navbar/Navbar";
import { GreetingCard } from "../../components/home/GreetingCard";
import { Services } from "../../components/home/Services";
import { Banner } from "../../components/home/Banner";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-full bg-white">
        <div className="mx-auto flex w-[90%] max-w-7xl flex-col gap-4 pb-10 pt-20 md:gap-6">
          <GreetingCard />
          <Services />
          <Banner />
        </div>
      </div>
    </>
  );
};
