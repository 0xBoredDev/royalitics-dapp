import type { NextPage } from "next";
import Head from "next/head";
import { TeamView } from "../views";

const Team: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Team View</title>
        <meta name="description" content="Team View" />
      </Head>
      <TeamView />
    </div>
  );
};

export default Team;
