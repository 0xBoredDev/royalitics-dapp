// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { collections } from "data/collections";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop";
import pkg from "../../../package.json";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";

export const HomeView: FC = ({}) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  const imgStyle = {
    borderRadius: "50%",
    borderColor: "transparent",
    verticalAlign: "middle",
    marginRight: 10,
  };

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  function collectionItems() {
    let items = collections.map((item) => (
      <div className="" key={item.value}>
        <img
          src={item.image}
          className=""
          style={imgStyle}
          width="60"
          height="60"
          alt="..."
        />
      </div>
    ));

    return items;
  }

  return (
    <div
      className="w-full h-[calc(100vh-64px-96px)]  overflow-hidden"
      id="homebg"
    >
      <div className="md:hero">
        <div className="md:hero-content flex flex-col">
          <img src={logo.src} className="" alt="hero-logo" />
          <div className="inline-block align-middle">
            <h1 className="text-center mt-20 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
              Smart Royalitics
            </h1>
            <h4 className="md:w-full text-center text-slate-300 my-2">
              The smart way to track royalties.
            </h4>
            <div className="text-center">
              <RequestAirdrop />
            </div>
          </div>
          <div className="flex flex-row absolute" style={{ bottom: "130px" }}>
            {collectionItems()}
          </div>
        </div>
      </div>
    </div>
  );
};
