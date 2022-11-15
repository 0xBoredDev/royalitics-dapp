import { RoyaltyByMonth } from "components/charts/RoyaltyByMonth";
import { RoyaltyByUser } from "components/charts/RoyaltyByUser";
import { TotalByMarketplace } from "components/charts/TotalByMarketplace";
import { collections } from "data/collections";
import { FC, useState } from "react";
import SelectSearch from "react-select-search";

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

function renderCollection(props, option, _, className) {
  const imgStyle = {
    borderRadius: "50%",
    verticalAlign: "middle",
    marginRight: 10,
  };

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

export const DashboardView: FC = () => {
  const [collection, setCollection] = useState("s");

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          DeGods Dashboard
        </h1>
        <h2 className="font-bold text-lg">
          Royalties accrued in the last 6 months
        </h2>

        <div className="flex flex-row">
          <SelectSearch
            placeholder="Select a collection"
            options={collections}
            search
            autoComplete="on"
            renderOption={renderCollection}
            onChange={(value) => setCollection(value.toString())}
            value={collection}
          />
          <button
            className="btn btn-primary"
            onClick={() => console.log(collection)}
          >
            Search
          </button>
        </div>

        <RoyaltyByMonth data={dataByMonth} />
        <h2 className="font-bold text-lg">Top payers</h2>
        <RoyaltyByUser data={dataByUser} />
        <h2 className="font-bold text-lg">Total by marketplace</h2>
        <TotalByMarketplace data={dataByMP} />
      </div>
    </div>
  );
};
