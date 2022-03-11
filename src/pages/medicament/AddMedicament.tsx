import { Divider, SelectChangeEvent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import { addMedicament, fetchMedicaments } from "./medicamentActions";
import MedicamentForm from "./MedicamentForm";
import { medicamentFormInputChanged, stateRestarted } from "./medicamentSlice";
import { SuccessfullyAdded } from "./SuccessfullyAdded";

export default function AddMedicament() {
  const location = useLocation();
  const { therapyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchMedicaments());
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  const added = useAppSelector((state) => state.medicament.added);

  const state = useAppSelector((state) => ({
    medicamentId: state.medicament.medicamentId,
    strength: state.medicament.strength,
    amount: state.medicament.amount,
    frequency: state.medicament.frequency,
    route: state.medicament.route,
  }));

  const onSubmit = () => {
    dispatch(addMedicament(therapyId as string));
  };

  if (added) return <SuccessfullyAdded />;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Add medicament to the therapy</Typography>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <MedicamentForm
        onSubmit={onSubmit}
        onClose={() => navigate(location.pathname.split("/add-medicament")[0])}
      />
    </Box>
  );
}
