import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface dataProps {
  month: string;
  royalty: number;
}

export const RoyaltyByMonth = ({ data }: { data: dataProps[] }) => {
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
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="royalty" fill="#8884d8" />
      </BarChart>
    </div>
  );
};
