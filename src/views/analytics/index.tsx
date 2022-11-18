import { SearchIcon } from "@heroicons/react/outline";
import { NonceAccount } from "@solana/web3.js";
import { RoyaltyByMonth } from "components/charts/RoyaltyByMonth";
import { RoyaltyByUser } from "components/charts/RoyaltyByUser";
import { TotalByMarketplace } from "components/charts/TotalByMarketplace";
import { collections } from "data/collections";
import { Collection } from "models/collection";
import { FC, useState } from "react";
import SelectSearch from "react-select-search";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

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
  labels: [
    "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp1",
    "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp2",
    "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp3",
    "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp4",
    "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp5",
    "8kQayFPyKcJCdJYs8FTSTP3yNsTeKcAewegewTY7UVp6",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(21, 201, 25)",
        "rgb(174, 21, 201)",
        "rgb(201, 135, 21)",
      ],
      borderWidth: 1,
    },
  ],
};

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
      order: 2,
    },
    {
      label: "My Second Dataset",
      data: [23, 84, 12, 9, 12, 34, 23],
      fill: false,
      borderColor: "rgb(255, 205, 25)",
      tension: 0.2,
      order: 1,
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
  const [collection, setCollection] = useState(new Collection());

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
            console.log(value);
            setCollection(collections[Number(value)]);
            value = "";
          }}
          value={collection.name}
        />
      </div>
      <section className="py-12">
        <div className="flex flex-row">
          <div className="basis-1/4">
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
      <section className="py-12">
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
