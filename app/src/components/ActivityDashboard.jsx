// src/components/ActivityDashboard.jsx
import React, { useMemo, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LineChart from "./LineChart";
import DataGridTable from "./DataGridTable";
import previousInfoSession from "../data/previous_info_session";

const ActivityDashboard = ({ additionalInfo }) => {
  const [timeFrame, setTimeFrame] = useState("last24hours");

  const handleChange = (event) => {
    setTimeFrame(event.target.value);
  };

  const getFilteredData = (data, timeFrame) => {
    const now = new Date();
    let startDate;
    switch (timeFrame) {
      case "last24hours":
        startDate = new Date(now.setHours(now.getHours() - 24));
        break;
      case "last7days":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last30days":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        startDate = new Date(0); // Default to include all data
    }
    return data.filter((item) => new Date(item.startTime) >= startDate);
  };

  const combinedData = useMemo(() => {
    const currentData = Object.keys(additionalInfo).map((key) => ({
      id: key,
      startTime: additionalInfo[key].startTime,
      endTime: additionalInfo[key].endTime,
      messageCount: additionalInfo[key].messageCount,
      dailyMessageCount: additionalInfo[key].dailyMessageCount,
    }));
    const allData = [...previousInfoSession, ...currentData];
    return getFilteredData(allData, timeFrame);
  }, [additionalInfo, timeFrame]);

  const dailyMessageData = useMemo(() => {
    const dailyCounts = {};
    combinedData.forEach((info) => {
      Object.entries(info.dailyMessageCount).forEach(([date, count]) => {
        if (dailyCounts[date]) {
          dailyCounts[date] += count;
        } else {
          dailyCounts[date] = count;
        }
      });
    });
    return Object.entries(dailyCounts).map(([date, count]) => ({
      x: date,
      y: count,
    }));
  }, [combinedData]);

  console.log("Combined data:", combinedData); // Debug log
  console.log("Daily message data:", dailyMessageData); // Debug log

  return (
    <Box width="60vw" height="80vh" padding="20px">
      <Box display="flex" justifyContent="flex-end" marginBottom="20px">
        <FormControl variant="outlined" style={{ width: "20vw" }}>
          <InputLabel id="time-frame-select-label">Time Frame</InputLabel>
          <Select
            labelId="time-frame-select-label"
            value={timeFrame}
            onChange={handleChange}
            label="Time Frame"
            size="small"
          >
            <MenuItem value="last24hours">Last 24 Hours</MenuItem>
            <MenuItem value="last7days">Last 7 Days</MenuItem>
            <MenuItem value="last30days">Last 30 Days</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <DataGridTable rows={combinedData} />
      <LineChart data={dailyMessageData} />
    </Box>
  );
};

export default ActivityDashboard;
