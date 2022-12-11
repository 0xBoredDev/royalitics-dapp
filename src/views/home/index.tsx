// Next, React
import { FC, useEffect, useState } from "react";
// import Link from "next/link";
// import logo from "../../../public/logo.png";
import { collections } from "data/collections";
import { gsap } from "gsap";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { RequestRoyalties } from "../../components/RequestRoyalties";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";

export const HomeView: FC = ({}) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [address, setAddress] = useState("");

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  const imgStyle = {
    borderRadius: "50%",
    borderColor: "transparent",
    verticalAlign: "middle",
    marginRight: 10,
  };

  useEffect(() => {
    gsap.from(".collab-item", {
      duration: 1,
      y: 100,
      stagger: {
        from: "center",
        each: 0.1,
        yoyo: true,
        repeat: -1,
      },
    });
  }, []);

  useEffect(() => {
    if (wallet.publicKey) {
      const walletAddress = wallet.publicKey.toBase58();
      console.log(walletAddress);
      setAddress(walletAddress);
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  function collectionItems() {
    let items = collections.map((item) => (
      <div className="" key={item.value}>
        <img
          src={item.image}
          className="collab-item"
          style={imgStyle}
          width="80"
          height="80"
          alt="..."
        />
      </div>
    ));

    return items;
  }

  return (
    <div className="w-full h-screen" id="homebg">
      <div className="md:hero">
        <div className="md:hero-content flex flex-col">
          {/* <img src={logo.src} className="" alt="hero-logo" /> */}
          <div className="inline-block align-middle">
            <h1 className="text-center text-4xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
              Smart Royalitics
            </h1>
            <h4 className="w-full text-md sm:text-xl italic text-center text-slate-300 my-2">
              "The smart way to track royalties."
            </h4>
          </div>
          <div className="inline-block align-middle mt-8 sm:mt-20">
            <p className="w-full text-md sm:text-2xl text-center text-slate-300 my-2">
              How much have you paid in royalties?
            </p>
            <div className="text-center">
              <RequestRoyalties />
            </div>
            <div className="text-center">Connected address: {address}</div>
          </div>
          <div
            className="flex flex-row absolute space-x-2 overflow-hidden h-48"
            style={{ bottom: "40px" }}
          >
            {collectionItems()}
          </div>
        </div>
      </div>
    </div>
  );
};
