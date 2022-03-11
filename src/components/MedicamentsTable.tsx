import React from "react";
import { Medicament } from "../common/repository/TherapyRepository";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AreYouSureDialog from "./AreYouSureDialog";
import { useDispatch } from "react-redux";
import {
  removeMedicament,
  removeMedicamentLocally,
} from "../pages/therapy/therapyActions";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { fetchMedicaments } from "../pages/medicament/medicamentActions";

function DeleteMedication({ medicamentId }: { medicamentId: string }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const disabled = React.useMemo(
    () => params.get("disabled") !== null,
    [params]
  );
  const { therapyId, treatmentId } = useParams();
  const local = useAppSelector((state) => state.therapy.local);

  const handleClose = () => {
    setOpen(false);
  };

  const yesAction = () => {
    if (local === true) dispatch(removeMedicamentLocally(medicamentId));
    else dispatch(removeMedicament(therapyId as string, medicamentId));
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Remove medicament from treatment">
        <span>
          <IconButton
            disabled={disabled || (local === true ? false : !treatmentId)}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Delete />
          </IconButton>
        </span>
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
  { field: "route", headerName: "Route", width: 140 },
  { field: "frequency", headerName: "Frequency", width: 150 },
  {
    field: "action",
    headerName: "Actions",
    renderCell: (params) => (
      <DeleteMedication medicamentId={params.row.medicamentId} />
    ),
    width: 80,
  },
];

export interface MedicamentsTableProps {
  medicaments: Medicament[];
}

export default function MedicamentsTable({
  medicaments,
}: MedicamentsTableProps) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchMedicaments());
  }, [dispatch]);
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
