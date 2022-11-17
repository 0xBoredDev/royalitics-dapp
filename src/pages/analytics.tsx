import type { NextPage } from "next";
import Head from "next/head";
import { AnalyticsView } from "../views";

const Analytics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Smart Royalitics</title>
        <meta name="description" content="Analytics" />
      </Head>
      <AnalyticsView />
    </div>
  );
};

export default Analytics;
