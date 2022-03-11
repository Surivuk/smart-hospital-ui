import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import MedicamentForm from "./MedicamentForm";

interface NewMedicamentProps {
  open: boolean;
  handleClose(): void;
  handleSubmit(medicament: {
    medicamentId: string;
    strength: string;
    amount: string;
    route: string;
    frequency: string;
  }): void;
}
const defaultState = {
  medicamentId: "",
  strength: "",
  amount: "",
  route: "",
  frequency: "",
};
export default function NewMedicament(props: NewMedicamentProps) {
  const { open } = props;

  const [state, setState] = React.useState(defaultState);

  const onSubmit = () => {
    props.handleSubmit(state);
  };
  const onClose = () => {
    props.handleClose();
    setState(defaultState);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>New Medicament</DialogTitle>
      <DialogContent>
        <MedicamentForm
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
