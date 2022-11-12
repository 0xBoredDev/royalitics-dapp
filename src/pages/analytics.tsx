import type { NextPage } from "next";
import Head from "next/head";
import { AnalyticsView } from "../views";

const Analytics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Royalitics</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
      <AnalyticsView />
    </div>
  );
};

export default Analytics;
