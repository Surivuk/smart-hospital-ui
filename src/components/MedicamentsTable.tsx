import React from "react";
import { Medicament } from "../common/repository/TherapyRepository";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AreYouSureDialog from "./AreYouSureDialog";
import { useDispatch } from "react-redux";
import { removeMedicament } from "../pages/therapy/therapyActions";
import { useParams } from "react-router-dom";

function DeleteMedication({ medicamentId }: { medicamentId: string }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { therapyId } = useParams();

  const handleClose = () => {
    setOpen(false);
  };

  const yesAction = () => {
    dispatch(removeMedicament(therapyId as string, medicamentId));
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Remove medicament from treatment">
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <AreYouSureDialog
        open={open}
        title="Remove medicament form therapy?"
        text="Are you sure that you want to remove medicament form therapy?"
        yesLabel="Remove"
        noLabel="Close"
        yesAction={yesAction}
        handleClose={handleClose}
      />
    </div>
  );
}

const columns: GridColDef[] = [
  { field: "medicamentId", headerName: "Medicament", width: 200 },
  { field: "strength", headerName: "Strength (mg)", width: 120 },
  { field: "amount", headerName: "Amount", width: 80 },
  { field: "route", headerName: "Route", width: 180 },
  { field: "frequency", headerName: "Frequency", width: 120 },
  {
    field: "action",
    headerName: "Actions",
    renderCell: (params) => (
      <DeleteMedication medicamentId={params.row.medicamentId} />
    ),
    width: 80
  },
];

export interface MedicamentsTableProps {
  medicaments: Medicament[];
}

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
