import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/chart", {
          withCredentials: true,
        });

        console.log("Chart response:", res.data);

        setData(res.data.data || []);
      } catch (error) {
        console.error(
          "Chart data error:",
          error.response?.status,
          error.response?.data || error.message,
        );
      }
    };

    fetchChartData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 5,
        }}
      >
        <CartesianGrid
          stroke="#f1f5f9"
          strokeDasharray="4 4"
          vertical={false}
        />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 11,
            fill: "#9ca3af",
          }}
          dy={8}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 11,
            fill: "#9ca3af",
          }}
        />

        <Tooltip
          cursor={{
            stroke: "#e5e7eb",
            strokeWidth: 1,
          }}
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "10px 12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
          labelStyle={{
            color: "#111827",
            fontWeight: 600,
            marginBottom: "6px",
          }}
        />

        <Line
          type="monotone"
          dataKey="users"
          name="Users"
          stroke="#9333ea"
          strokeWidth={2.5}
          dot={false}
          activeDot={{
            r: 5,
            strokeWidth: 2,
          }}
        />

        <Line
          type="monotone"
          dataKey="properties"
          name="Properties"
          stroke="#3b82f6"
          strokeWidth={2.5}
          dot={false}
          activeDot={{
            r: 5,
            strokeWidth: 2,
          }}
        />

        <Line
          type="monotone"
          dataKey="inquiries"
          name="Inquiries"
          stroke="#f59e0b"
          strokeWidth={2.5}
          dot={false}
          activeDot={{
            r: 5,
            strokeWidth: 2,
          }}
        />

        <Line
          type="monotone"
          dataKey="bookings"
          name="Bookings"
          stroke="#22c55e"
          strokeWidth={2.5}
          dot={false}
          activeDot={{
            r: 5,
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
