import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Smart Analytics</title>
        <meta name="description" content="Smart Analytics" />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
