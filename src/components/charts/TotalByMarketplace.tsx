import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface dataProps {
  name: string;
  royalty: number;
}

export const TotalByMarketplace = ({ data }: { data: dataProps[] }) => {
  return (
    <div className="w-full h-full">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="royalty" fill="#8884d8" />
      </BarChart>
    </div>
  );
};
