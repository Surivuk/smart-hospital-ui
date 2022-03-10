import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import React from "react";

export interface ChangeLabelDialogProps {
  open: boolean;
  label: string;
  onClose(): void;
  onSubmit(label: string): void;
}

export default function ChangeLabelDialog(props: ChangeLabelDialogProps) {
  const { open } = props;
  const [label, setLabel] = React.useState(props.label);

  React.useEffect(() => {
    setLabel(props.label);
  }, [props.label, setLabel]);

  const onSubmit = () => {
    props.onSubmit(label);
  };

  return (
    <Dialog
      open={open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Change therapy label</DialogTitle>
      <DialogContent>
        <DialogContentText>Pleas enter new label</DialogContentText>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            label="Label"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} autoFocus>
          Change
        </Button>
        <Button onClick={props.onClose} color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
