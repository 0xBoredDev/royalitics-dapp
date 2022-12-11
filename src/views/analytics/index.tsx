import { SearchIcon } from "@heroicons/react/outline";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { collections } from "data/collections";
import { sales } from "data/sales";
import { Collection } from "models/collection";
import { Sale } from "models/sale";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import SelectSearch from "react-select-search";
import { getFeeDataPoints } from "utils/converter";
import { getMintActivities } from "../../queries/queries";
import Table from "../../components/Table";
import { TransactionRow } from "../../utils/makeData";
import { Dna } from "react-loader-spinner";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const pieData = {
  labels: ["MagicEden V2", "Other"],
  datasets: [
    {
      label: "# of Sales",
      data: [80, 20],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      borderWidth: 1,
    },
  ],
};

const imgStyle = {
  borderRadius: "50%",
  borderColor: "transparent",
  verticalAlign: "middle",
  marginRight: 10,
};

const dataByMonth = [
  {
    month: "Jan",
    royalty: 346,
  },
  {
    month: "Feb",
    royalty: 6235,
  },
  {
    month: "Mar",
    royalty: 98,
  },
  {
    month: "Apr",
    royalty: 13480,
  },
  {
    month: "May",
    royalty: 976,
  },
  {
    month: "Jun",
    royalty: 346,
  },
];

const dataByUser = [
  { name: "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp1", royalty: 400 },
  { name: "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp2", royalty: 300 },
  { name: "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp3", royalty: 300 },
  { name: "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp4", royalty: 200 },
  { name: "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp5", royalty: 278 },
  { name: "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp6", royalty: 189 },
];

const dataByMP = [
  { name: "MagicEden", royalty: 900 },
  { name: "OpenSea", royalty: 189 },
];

function renderValue(valueProps, snapshot, className) {
  return (
    <label className="relative flex text-gray-400 text-slate-700 block">
      <SearchIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 " />
      {/* "flex items-center rounded-full w-full h-12 pl-12 text-white bg-black border-2 border-slate-700 p-2 text-sm hover:border-purple-700" */}
      <input
        {...valueProps}
        className={
          "flex items-center rounded-full w-full h-12 pl-12 text-white bg-black border-2 border-slate-700 p-2 text-sm hover:border-purple-700 focus:outline-none"
        }
      />
    </label>
  );
}

function renderCollection(props, option, _, className) {
  return (
    <div className="flex flex-row">
      <button
        {...props}
        className={
          "flex items-center w-full text-white hover:bg-purple-700 p-2 text-sm"
        }
        type="button"
      >
        <img
          alt=""
          style={imgStyle}
          width="28"
          height="28"
          src={option.image}
        />
        <span>{option.name}</span>
      </button>
    </div>
  );
}

export const AnalyticsView: FC = () => {
  const [collection, setCollection] = useState(
    new Collection("", "", "", "", "", "", "", "")
  );
  const [labels, setLabels] = useState([]);
  // const [feeDataPoints, setFeeDataPoints] = useState([]);
  const [collectedDataPoints, setCollectedDataPoints] = useState([]);
  const [uncollectedDataPoints, setUncollectedDataPoints] = useState([]);
  const [lineData, setLineData] = useState({ labels: [], datasets: [] });
  // console.log(collection.name);
  const [tableData, setTableData] = useState([]);
  let [loading, setLoading] = useState(false);

  let currentDay = parseFloat(moment().format("D"));
  let currentMonth = moment().format("MMM");
  let bottomLabels = [];
  for (let i = 1; i <= currentDay; i++) {
    bottomLabels.push(`${currentMonth} ${i}`);
  }

  const createLineData = async (data) => {
    const { labels, collectedDataPoints, uncollectedDataPoints } =
      getFeeDataPoints(data);
    //console.log(`collectedDataPoints=${collectedDataPoints}`);
    setLabels(labels);
    setCollectedDataPoints(collectedDataPoints);
    setUncollectedDataPoints(uncollectedDataPoints);
    console.log(labels);
    console.log(collectedDataPoints);
    console.log(uncollectedDataPoints);
    setLineData({
      labels: labels,
      datasets: [
        {
          label: "Royalties Collected",
          data: collectedDataPoints,
          // data: [23, 84, 12, 9, 12, 34, 23, 43, 44, 88],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          order: 1,
        },
        {
          label: "Royalties UnCollected",
          data: uncollectedDataPoints,
          // data: [13, 74, 10, 5, 10, 24, 13, 33, 34, 48],
          fill: false,
          borderColor: "rgb(255, 205, 25)",
          tension: 0.2,
          order: 2,
        },
      ],
    });
  };

  const getCollectionSalesData = async (collection) => {
    //console.log(collection);
    setCollection(collection);
    // const updateauthority = "yootn8Kf22CQczC732psp7qEqxwPGSDQCFZHkzoXp25";
    // const collectionsymbol = "y00ts";
    const updateauthority = collection.updateAuthority;
    const collectionsymbol = collection.collectionSymbol;
    const before = moment().utc().format().replace("Z", "");

    // const data = await getMintActivities(
    //   updateauthority,
    //   collectionsymbol,
    //   before
    // );

    // setLoading(false);
    // if (data.status === 200) {
    //   convertToChartData(data);
    // }

    /* test data */
    setTimeout(() => {
      convertToChartData(sales);
      setLoading(false);
    }, 4000);
    /* end test data */
  };

  function convertToDecimal(value) {
    let fixed = (value / 100).toFixed(2);
    let newVal = parseFloat(fixed);
    return newVal;
  }

  function formatDecimal(value) {
    let fixed = value.toFixed(2);
    let newVal = parseFloat(fixed);
    return newVal;
  }

  function convertToChartData(data: Array<any>) {
    //data is being returned
    console.log(data);
    let chartData = [];

    /* test */
    /*233 has half royalty fee */
    // let trans = data[233];
    // let transTime = moment(trans.time);
    // console.log(transTime);
    // console.log(transTime.format("D"));
    // console.log(transTime.format("M"));
    // console.log(transTime.format("Y"));

    // let day = transTime.format("D");
    // let month = transTime.format("M");
    // let year = transTime.format("Y");
    // let timestamp = trans.time;
    // let price = trans.price / LAMPORTS_PER_SOL;
    // console.log(`price = ${price}`);
    // let royaltiesCollected = trans.royalty_fee / LAMPORTS_PER_SOL;
    // console.log(`royaltiesCollected = ${royaltiesCollected}`);
    // let sellerFee = convertToDecimal(trans.metadata.seller_fee_basis_points);
    // console.log(`sellerFee = ${sellerFee}`);
    // let estimatedRoyaltyFee = price * (sellerFee / 100);
    // console.log(`estimatedRoyaltyFee = ${estimatedRoyaltyFee}`);
    // let royaltiesUnCollected = formatDecimal(
    //   estimatedRoyaltyFee - royaltiesCollected
    // );
    // console.log(`royaltiesUnCollected = ${royaltiesUnCollected}`);
    // let marketplace = trans.marketplace;
    // let paidFullRoyalty = royaltiesCollected === estimatedRoyaltyFee;
    // console.log(`paidFullRoyalty = ${paidFullRoyalty}`);
    // let paidHalfRoyalty = estimatedRoyaltyFee / 2 === royaltiesCollected;
    // console.log(`paidHalfRoyalty = ${paidHalfRoyalty}`);

    /* end test*/

    data.forEach((trans) => {
      let transTime = moment(trans.time);
      let day = transTime.format("D");
      let month = transTime.format("M");
      let year = transTime.format("Y");
      let timestamp = trans.time;
      let price = trans.price / LAMPORTS_PER_SOL;
      let sellerFee = convertToDecimal(trans.metadata.seller_fee_basis_points);
      let estimatedRoyaltyFee = price * (sellerFee / 100);
      let royaltiesCollected = trans.royalty_fee / LAMPORTS_PER_SOL;
      let royaltiesUnCollected = formatDecimal(
        estimatedRoyaltyFee - royaltiesCollected
      );
      let marketplace = trans.marketplace;
      let paidFullRoyalty = royaltiesCollected === estimatedRoyaltyFee;
      let paidHalfRoyalty = estimatedRoyaltyFee / 2 === royaltiesCollected;

      // console.log(`price = ${price}`);
      // console.log(`royaltiesCollected = ${royaltiesCollected}`);
      // console.log(`sellerFee = ${sellerFee}`);
      // console.log(`estimatedRoyaltyFee = ${estimatedRoyaltyFee}`);
      // console.log(`royaltiesUnCollected = ${royaltiesUnCollected}`);
      // console.log(`paidFullRoyalty = ${paidFullRoyalty}`);
      // console.log(`paidHalfRoyalty = ${paidHalfRoyalty}`);

      /* const sale = new Sale(
         day,
         month,
         year,
         timestamp,
         price,
         royaltiesCollected,
         royaltiesUnCollected,
         marketplace,
         paidFullRoyalty,
         paidHalfRoyalty,
         sellerFee
       );
 */
      const sale: Sale = {
        day,
        month,
        year,
        timestamp,
        price,
        royaltiesCollected,
        royaltiesUnCollected,
        marketplace,
        paidFullRoyalty,
        paidHalfRoyalty,
        sellerFee,
      };

      chartData.push(sale);

      //console.log(`sale.day=${sale.day}`);
      //console.log(`sale.royaltiesCollected=${sale.royaltiesCollected}`);

      /* chartData.push({
        day,
        month,
        year,
        timestamp,
        price,
        royaltiesCollected,
        royaltiesUnCollected,
        marketplace,
        paidFullRoyalty,
        paidHalfRoyalty,
        sellerFee,
      }); */
    });
    //console.log(chartData);
    createLineData(chartData);
  }

  const getTableData = () => {
    // convert
    let tableRow: TransactionRow[] = sales.map((sale) => {
      return {
        buyer: sale.buyer,
        seller: sale.seller,
        image: sale.metadata.uri.replace("json", "png"),
        name: sale.metadata.name,
        signature: sale.signature,
        time: sale.time,
      };
    });
    // set
    setTableData(tableRow);
  };

  return (
    <div className="md:container mx-auto p-4">
      <div className="flex flex-row justify-center">
        <SelectSearch
          placeholder="Select a collection"
          options={collections}
          search
          autoComplete="on"
          renderOption={renderCollection}
          renderValue={renderValue}
          onChange={(value) => {
            // setCollection(collections[Number(value)]);
            setLoading(true);
            getCollectionSalesData(collections[Number(value)]);
            getTableData();
            value = "";
          }}
          value={collection.value}
        />
      </div>
      {collection.name !== undefined ? (
        <div>
          <section className="py-8">
            <div className="flex flex-row">
              <div className="basis-1/4 flex justify-center">
                <img
                  alt=""
                  style={imgStyle}
                  width="120"
                  height="120"
                  src={collection.image}
                />
              </div>
              <div className="basis-3/4 p-2">
                <div className="text-4xl font-bold pb-5">{collection.name}</div>
                <div className="">{collection.description}</div>
              </div>
            </div>
          </section>
          {/* <div className="flex flex-row px-8 mx-auto justify-center">
            <p className="text-lg">
              The Data shown below is for Dec 7th-10th 2022
            </p>
          </div> */}
          <div className="flex flex-row px-8 mx-auto justify-center">
            {loading === true && (
              <Dna
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            )}
          </div>
          {loading === false && (
            <section className="py-4">
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3">
                  <div className="p-8 ">
                    <Line data={lineData} />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="p-8 ">
                    <Pie data={pieData} />
                  </div>
                </div>
              </div>
            </section>
          )}
          {loading === false && (
            <section className="py-4">
              <Table tableData={tableData} />
            </section>
          )}
        </div>
      ) : (
        <></>
      )}
      {/* <div className="md:hero-content flex flex-col">
        <RoyaltyByMonth data={dataByMonth} />
        <h2 className="font-bold text-lg">Top payers</h2>
        <RoyaltyByUser data={dataByUser} />
        <h2 className="font-bold text-lg">Total by marketplace</h2>
        <TotalByMarketplace data={dataByMP} />
      </div> */}
    </div>
  );
};
