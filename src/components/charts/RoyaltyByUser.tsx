import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface dataProps {
  name: string;
  royalty: number;
}

export const RoyaltyByUser = ({ data }: { data: dataProps[] }) => {
  return (
    <div className="w-full h-full">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="royalty"
          isAnimationActive={false}
          data={data}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};
