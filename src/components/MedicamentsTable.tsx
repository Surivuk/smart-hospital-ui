import React from "react";
import { Medicament } from "../common/repository/TherapyRepository";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";

export interface MedicamentsTableProps {
  medicaments: Medicament[];
}

const columns: GridColDef[] = [
  { field: "medicamentId", headerName: "Medicament", width: 200 },
  { field: "strength", headerName: "Strength (mg)", width: 120 },
  { field: "amount", headerName: "Amount (times)", width: 120 },
  { field: "route", headerName: "Route", width: 120 },
  { field: "frequency", headerName: "Frequency", width: 120 },
  {
    field: "action",
    headerName: "Actions",
    renderCell: (params) => (
      <Tooltip title="Remove medicament from treatment">
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip>
    ),
  },
];

export default function MedicamentsTable({
  medicaments,
}: MedicamentsTableProps) {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={medicaments}
        getRowId={(row) => row.medicamentId}
        columns={columns}
        hideFooter
        disableColumnFilter
        disableColumnMenu
        density="compact"
      />
    </div>
  );
}
