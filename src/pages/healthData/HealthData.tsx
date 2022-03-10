import { ArrowBack } from "@mui/icons-material";
import { IconButton, Grid, Button, Typography } from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import HealthDataFactory from "../../common/healthData/HealthDataFactory";
import DatePicker from "../../components/DatePicker";
import { useAppSelector } from "../../hooks";
import { changeDate, fetchData } from "./healthDataActions";
import MedicamentDialog from "./MedicamentDialog";

function InfoButton({ timestamp }: { timestamp: string }) {
  const [open, setOpen] = React.useState(false);
  const [params] = useSearchParams();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Info</Button>
      <MedicamentDialog
        open={open}
        handleClose={handleClose}
        timestamp={timestamp}
        treatment={params.get("treatment") as string}
      />
    </div>
  );
}

function Text({ type, value }: { type: string; value: string }) {
  const hd = HealthDataFactory.healthData(type, value);
  const color = hd.isNormal()
    ? green[600]
    : hd.isWarning()
    ? orange[600]
    : hd.isCritical()
    ? red[600]
    : green[600];
  return <Typography sx={{ color: color }}>{value}</Typography>;
}

const columns: GridColDef[] = [
  { field: "timestamp", headerName: "Timestamp", width: 200 },
  {
    field: "SPO2",
    headerName: "Saturation (%)",
    width: 200,
    renderCell: (params) => <Text type="SPO2" value={params.row.SPO2} />,
  },
  {
    field: "PI",
    headerName: "Percussion Index (%)",
    width: 200,
    renderCell: (params) => <Text type="PI" value={params.row.PI} />,
  },
  {
    field: "temperature",
    headerName: "Temperature (℃)",
    width: 200,
    renderCell: (params) => (
      <Text type="temperature" value={params.row.temperature} />
    ),
  },
  {
    field: "pulse",
    headerName: "Pulse (bpm)",
    width: 200,
    renderCell: (params) => <Text type="pulse" value={params.row.pulse} />,
  },
  {
    field: "systolic",
    headerName: "Systolic (mmHg)",
    width: 200,
    renderCell: (params) => (
      <Text type="systolic" value={params.row.systolic} />
    ),
  },
  {
    field: "diastolic",
    headerName: "Diastolic (mmHg)",
    width: 200,
    renderCell: (params) => (
      <Text type="diastolic" value={params.row.diastolic} />
    ),
  },
  {
    field: "action",
    headerName: "Actions",
    renderCell: (params) => <InfoButton timestamp={params.row.timestamp} />,
    width: 150,
  },
];

export default function HealthData() {
  const [params] = useSearchParams();
  const treatment = React.useMemo(() => params.get("treatment"), [params]);
  const medicalCard = React.useMemo(
    () => params.get("medicalCardId"),
    [params]
  );
  const dispatch = useDispatch();

  const { healthData, selectedDate } = useAppSelector(
    (state) => state.healthData
  );

  React.useEffect(() => {
    dispatch(fetchData(treatment as string));
  }, [dispatch, treatment]);

  const handleChange = (newValue: string) => {
    dispatch(
      changeDate(
        treatment as string,
        new Date(newValue).toISOString().slice(0, 10)
      )
    );
  };

  return (
    <div>
      <Grid container direction="row" alignItems="center">
        <Grid item xs="auto">
            <Button
              component={Link}
              variant="contained"
              to={`/app/medical-card/${medicalCard}/hospital-treatments/${treatment}`}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
        </Grid>
        <Grid item xs>
          <DatePicker selectedDate={selectedDate} onChange={handleChange} />
        </Grid>
      </Grid>
      <div style={{ height: "90vh", width: "100%" }}>
        <DataGrid
          rows={healthData}
          getRowId={(row) => row.timestamp}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          disableColumnMenu
          density="compact"
        />
      </div>
    </div>
  );
}
