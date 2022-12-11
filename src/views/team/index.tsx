// Next, React
import { FC, useEffect, useState } from "react";
// import Link from "next/link";
import TeamSlide from "../../components/TeamSlide";
import { team } from "../../data/team";
import { collections } from "data/collections";
import { gsap } from "gsap";

export const TeamView: FC = ({}) => {
  const imgStyle = {
    borderRadius: "50%",
    borderColor: "transparent",
    verticalAlign: "middle",
    marginRight: 10,
  };

  // useEffect(() => {
  //   gsap.from(".collab-item", {
  //     duration: 1,
  //     y: 100,
  //     stagger: {
  //       from: "center",
  //       each: 0.1,
  //       yoyo: true,
  //       repeat: -1,
  //     },
  //   });
  // }, []);

  return (
    <div className="w-full h-screen overflow-x-hidden">
      <div className="md:hero">
        <div className="md:hero-content flex flex-col">
          {/* <img src={logo.src} className="" alt="hero-logo" /> */}
          <div className="inline-block align-middle">
            <h1 className="text-center text-4xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
              The Team
            </h1>
          </div>
          <div className="container relative p-8">
            <TeamSlide teamData={team} />
          </div>
          <div className="inline-block align-middle">
            <h1 className="text-center text-3xl sm:text-6xl pb-3 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
              3rd Party Support
            </h1>
            <p className="w-full text-md sm:text-2xl text-center text-slate-300 my-2">
              Coral Cube
            </p>
            <div className="text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
