import { Add, Settings } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MedicamentsTable from "../../components/MedicamentsTable";
import PageHeader from "../../components/PageHeader";
import { useAppSelector } from "../../hooks";
import ChangeLabelDialog from "./ChangeLabelDialog";
import RemovedTherapy from "./RemovedTherapy";
import { changeTherapyLabel, fetchTherapyData, removeTherapy } from "./therapyActions";
import { stateRestarted } from "./therapySlice";

function ChangeLabelButton({ disabled}: {disabled?: boolean}) {
  const [open, setOpen] = React.useState(false);
  const { therapyId } = useParams();
  const dispatch = useDispatch();
  const label = useAppSelector((state) => state.therapy.label);

  const handleSubmit = (label: string) => {
    dispatch(changeTherapyLabel(therapyId as string, label));
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton disabled={disabled} onClick={() => setOpen(true)}>
        <Settings />
      </IconButton>
      <ChangeLabelDialog
        open={open}
        onSubmit={handleSubmit}
        onClose={handleClose}
        label={label}
      />
    </div>
  );
}

export default function Therapy() {
  const { therapyId, treatmentId } = useParams();
  const [params] = useSearchParams();
  const disabled = React.useMemo(() => {
    return params.get("disabled") !== null
  }, [params]);
  const dispatch = useDispatch();

  const { label, medicaments, removed } = useAppSelector((state) =>  state.therapy)

  React.useEffect(() => {
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (therapyId) dispatch(fetchTherapyData(therapyId));
  }, [dispatch, therapyId]);

  if(removed == true) return <RemovedTherapy />

  return (
    <div>
      <PageHeader
        title="Therapy"
        subtitle={therapyId as string}
        iconType={
          treatmentId !== undefined ? "therapy" : "medical-card-therapy"
        }
        actionTitle={treatmentId !== undefined ? "remove therapy" : undefined}
        action={treatmentId !== undefined ? () => dispatch(removeTherapy(treatmentId as string, therapyId as string)) : undefined}
      />

      <Paper variant="outlined" sx={{ margin: 2 }}>
        <Box sx={{ padding: 2 }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Grid item xs>
              <Typography variant="subtitle1">
                Label: <strong>{label}</strong>
              </Typography>
            </Grid>
            <Grid item xs>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <ChangeLabelButton disabled={disabled} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ padding: 2 }}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs>
              <Typography variant="subtitle1">Medicaments</Typography>
            </Grid>
            <Grid item xs>
              <Grid container direction="row" justifyContent="flex-end">
                <Tooltip title="Add new medicament to the therapy">
                  <span>
                    <IconButton
                      disabled={disabled}
                      component={Link}
                      to={"add-medicament"}
                    >
                      <Add />
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ paddingBottom: 2, paddingLeft: 2, paddingRight: 2 }}>
          <MedicamentsTable medicaments={medicaments} />
        </Box>
      </Paper>
      <Box sx={{ padding: 0.1 }} />
    </div>
  );
}
