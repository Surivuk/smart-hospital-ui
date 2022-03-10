import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { fetchMedicaments } from "./healthDataActions";
import { medicamentsFetched } from "./healthDataSlice";

export interface MedicamentDialogProps {
  open: boolean;
  timestamp: string;
  treatment: string;
  handleClose(): void;
}

export default function MedicamentDialog(props: MedicamentDialogProps) {
  const { open, handleClose, timestamp } = props;
  const dispatch = useDispatch();

  const medicaments = useAppSelector((state) => state.healthData.medicaments);

  React.useEffect(() => {
    if (!open) return;
    dispatch(fetchMedicaments(props.treatment, props.timestamp));
  }, [open, dispatch]);

  const onClose = () => {
    dispatch(medicamentsFetched([]))
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Used Medicaments until {timestamp}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          <List>
            {medicaments && medicaments.map(
              ({ medicamentId, strength, amount, route, frequency }, index) => (
                <ListItem
                  key={index}
                >{`${medicamentId} | ${strength} mg | ${amount} times | ${route} | ${frequency}`}</ListItem>
              )
            )}
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
