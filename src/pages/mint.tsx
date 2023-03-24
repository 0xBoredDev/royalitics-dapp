import type { NextPage } from "next";
import Head from "next/head";
import { MintView } from "../views";

const Mint: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Smart Royalitics</title>
        <meta name="description" content="Smart Royalitics" />
      </Head>
      <MintView />
    </div>
  );
};

export default Mint;
