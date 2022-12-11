import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Smart Royalitics</title>
        <meta name="description" content="Smart Royalitics" />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
