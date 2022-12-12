// Next, React
import { FC } from "react";
import TeamSlide from "../../components/TeamSlide";
import { team } from "../../data/team";

export const TeamView: FC = ({}) => {
  const imgStyle = {
    borderRadius: "50%",
    borderColor: "transparent",
    verticalAlign: "middle",
    marginRight: 10,
  };

  return (
    <div className="w-full h-screen overflow-x-hidden">
      <div className="md:hero">
        <div className="md:hero-content flex flex-col">
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
            <div className="flex flex-col">
              <p className="w-full text-md sm:text-2xl text-center text-slate-300 my-2">
                CORAL CUBE API: https://api.coralcube.cc/
              </p>
              <p className="w-full text-md sm:text-2xl text-center text-slate-300 my-2">
                MAGIC EDEN API: https://api-mainnet.magiceden.dev/v2/
              </p>
              <p className="w-full text-md sm:text-2xl text-center text-slate-300 my-2">
                NFTPORT API: https://api.nftport.xyz/
              </p>
              <p className="w-full text-md sm:text-2xl text-center text-slate-300 my-2">
                BLOCKCHAINDAEMON API: https://svc.blockdaemon.com/universal/
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
