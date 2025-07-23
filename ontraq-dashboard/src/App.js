import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const PRODUCTIVE_SITES = [
  "github.com",
  "stackoverflow.com",
  "w3schools.com",
  "google.com",
  "leetcode.com",
];

const COLORS = ["#bb86fc", "#ff9800", "#f48fb1", "#ffd54f", "#64b5f6"];

function App() {
  const [dailyData, setDailyData] = useState([]);
  const [topDomain, setTopDomain] = useState(null);
  const [message, setMessage] = useState("");
  const [totals, setTotals] = useState({ productive: 0, unproductive: 0 });

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/logs/demo")
      .then((res) => {
        const logs = res.data;

        const dayMap = {};
        const domainTotals = {};
        let totalProductive = 0;
        let totalUnproductive = 0;

        logs.forEach((log) => {
          const dateKey = new Date(log.date).toISOString().split("T")[0];

          const isProd = PRODUCTIVE_SITES.includes(log.domain);
          if (isProd) totalProductive += log.secondsSpent;
          else totalUnproductive += log.secondsSpent;

          if (!dayMap[dateKey]) {
            dayMap[dateKey] = { total: 0, domains: {} };
          }
          dayMap[dateKey].total += log.secondsSpent;
          dayMap[dateKey].domains[log.domain] =
            (dayMap[dateKey].domains[log.domain] || 0) + log.secondsSpent;

          domainTotals[log.domain] =
            (domainTotals[log.domain] || 0) + log.secondsSpent;
        });

        const chartData = Object.entries(dayMap).map(
          ([date, { total, domains }]) => {
            const sortedDomains = Object.entries(domains).sort(
              (a, b) => b[1] - a[1]
            );
            const most = sortedDomains[0];
            const least = sortedDomains[sortedDomains.length - 1];

            return {
              date,
              minutes: Math.round(total / 60),
              mostDomain: most[0],
              mostProductive: PRODUCTIVE_SITES.includes(most[0]),
              leastDomain: least[0],
              leastProductive: PRODUCTIVE_SITES.includes(least[0]),
            };
          }
        );

        setDailyData(chartData);

        const top = Object.entries(domainTotals).sort((a, b) => b[1] - a[1])[0];
        if (top) {
          setTopDomain(top[0]);
          const isProductive = PRODUCTIVE_SITES.includes(top[0]);
          setMessage(
            isProductive
              ? "🎯 Great job! Your most used site is productive."
              : "🚫 Try to reduce time on unproductive sites."
          );
        }

        setTotals({
          productive: Math.round(totalProductive / 60),
          unproductive: Math.round(totalUnproductive / 60),
        });
      })
      .catch((err) => console.error("Error fetching logs:", err));
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length && payload[0].payload) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "#222",
            padding: "10px",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <p>
            <strong>{label}</strong>
          </p>
          <p>
            Most: {data.mostDomain} {data.mostProductive ? "🟢" : "🔴"}
          </p>
          <p>
            Least: {data.leastDomain} {data.leastProductive ? "🟢" : "🔴"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🧠 OnTraQ Productivity Dashboard</h1>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        }}
      >
        <div style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
          <p>
            🟢 Productive Time: <strong>{totals.productive}</strong> minutes
          </p>
          <p>
            🔴 Unproductive Time: <strong>{totals.unproductive}</strong> minutes
          </p>
        </div>

        <h2>📊 Time Spent Per Day (minutes)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="minutes">
              {dailyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {topDomain && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              backgroundColor: "#1e1e1e",
              borderRadius: "8px",
            }}
          >
            <h2>
              🏆 Most Visited Website:{" "}
              <span style={{ color: "#4fc3f7" }}>{topDomain}</span>
            </h2>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
