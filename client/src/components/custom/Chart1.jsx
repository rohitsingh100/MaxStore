"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Keyboard, Mouse, TrendingUp } from "lucide-react";
import { Colors } from "@/constants/colors";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

const chartData = [
  { month: "January", Keyboard: 186, Mouse: 80, headset: 50 },
  { month: "February", Keyboard: 305, Mouse: 200, headset: 50 },
  { month: "March", Keyboard: 237, Mouse: 120, headset: 50 },
  { month: "April", Keyboard: 73, Mouse: 190, headset: 50 },
  { month: "May", Keyboard: 209, Mouse: 130, headset: 50 },
  { month: "June", Keyboard: 214, Mouse: 140, headset: 50 },
];

const chartConfig = {
  Keyboard: { label: "Keyboard", color: Colors.customGray },
  Mouse: { label: "Mouse", color: Colors.customYellow },
  headset: { label: "Headset", color: Colors.customIsabelline },
};

function Chart1() {
  return (
    <Card className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
      <CardHeader>
        <CardTitle>Bar chart - Multiple</CardTitle>
        <CardDescription>January - june 2025</CardDescription>
      </CardHeader>
      <CardContent>
    <ChartContainer config={chartConfig} >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(v) => v.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="Keyboard" fill="var(--color-Keyboard)" radius={4} />
        <Bar dataKey="Mouse" fill="var(--color-Mouse)" radius={4} />
        <Bar dataKey="Headset" fill="var(--color-headset)" radius={4} />
      </BarChart>
    </ChartContainer>
    <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none">
        Trending up by 6.4% this month <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
    </CardContent>
    </Card>
  );
}

export default Chart1;
