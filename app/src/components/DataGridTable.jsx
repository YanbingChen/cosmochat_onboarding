// src/components/DataGridTable.jsx
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "startTime", headerName: "Start Time", flex: 1 },
  { field: "endTime", headerName: "End Time", flex: 1 },
  { field: "messageCount", headerName: "Message Count", flex: 1 },
];

const DataGridTable = ({ rows }) => {
  return (
    <Box m="20px 0 0 0" height="30vh" width="60vw">
      <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
    </Box>
  );
};

export default DataGridTable;
