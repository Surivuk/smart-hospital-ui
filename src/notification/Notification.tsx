import { Snackbar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

export default function Notification() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {};
  }, [dispatch]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        // action={action}
      />
    </div>
  );
}
