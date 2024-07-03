// src/components/Dashboard.jsx
import React from "react";
import { Bar, Line } from "react-chartjs-2";

const Dashboard = ({ sessions }) => {
  const sessionCounts = sessions.map((session) => session.messages.length);

  const data = {
    labels: sessions.map((session) => new Date(session.id).toLocaleString()),
    datasets: [
      {
        label: "Messages per Session",
        data: sessionCounts,
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Activity Dashboard</h2>
      <Bar data={data} options={options} />
      <Line data={data} options={options} />
    </div>
  );
};

export default Dashboard;
