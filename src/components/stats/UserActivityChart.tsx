
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ActivityData {
  date: string;
  posts: number;
  comments: number;
  likes: number;
}

interface UserActivityChartProps {
  data: ActivityData[];
}

export const UserActivityChart = ({ data }: UserActivityChartProps) => {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week");
  
  // Filter data based on the selected timeframe
  const filteredData = data.slice(-getTimeframeLength(timeframe));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Activity Overview</CardTitle>
        <Select
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as "week" | "month" | "year")}
        >
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Weekly</SelectItem>
            <SelectItem value="month">Monthly</SelectItem>
            <SelectItem value="year">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickMargin={10}
                stroke="#888888"
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickMargin={10}
                stroke="#888888"
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="posts"
                stroke="#5C7AEA"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="comments"
                stroke="#809BCE"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#8DA787"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-[#5C7AEA]" />
            <span className="text-xs text-gray-500">Posts</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-[#809BCE]" />
            <span className="text-xs text-gray-500">Comments</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-[#8DA787]" />
            <span className="text-xs text-gray-500">Likes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function getTimeframeLength(timeframe: "week" | "month" | "year"): number {
  switch (timeframe) {
    case "week":
      return 7;
    case "month":
      return 30;
    case "year":
      return 365;
    default:
      return 7;
  }
}

export default UserActivityChart;
