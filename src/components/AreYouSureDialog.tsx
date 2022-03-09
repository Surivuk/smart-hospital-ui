import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React from "react";

export interface AreYouSureDialogProps {
  title: string;
  text: string;
  open: boolean;
  yesLabel: string;
  noLabel: string;
  handleClose(): void;
  yesAction(): void;
}

export default function AreYouSureDialog(props: AreYouSureDialogProps) {
  const { title, text, handleClose, yesAction, open, noLabel, yesLabel } =
    props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={yesAction} autoFocus>
          {yesLabel}
        </Button>
        <Button onClick={handleClose} color="inherit">
          {noLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
