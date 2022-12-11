import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { FC } from "react";
import { Team } from "../models/team";

interface TeamProps {
  teamData: Team[];
}

export const TeamSlide: FC<TeamProps> = ({ teamData }) => {
  let i = 0;
  //   console.log(data);
  let slides = teamData.map((team) => (
    <SwiperSlide key={i++}>
      <div className="design-card">
        <img src={team.img} className="img-fluid team-img" alt="dweller 1" />
        <div className="member-info">
          <p className="member-name1">{team.username}</p>
          <div className="vr member-name2">&nbsp;|&nbsp;</div>
          <p className="member-name2">{team.name}</p>
        </div>
        <p className="member-title">{team.title}</p>
        <div className="member-info">
          <a
            className="member-icon"
            href={team.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
        </div>
      </div>
    </SwiperSlide>
  ));

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="teamSwiper"
    >
      {slides}
    </Swiper>
  );
};

export default TeamSlide;
