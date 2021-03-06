import { useSnackbar } from "notistack";
import React from "react";
import { useNavigate } from "react-router-dom";

import { dependency } from "../store";

let first = true;

export const Notification = React.memo(() => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const socket = dependency().socket;
    if (first) {
      first = false;
    } else {
      socket.off("alarms");
    }
    socket.on("alarms", (data) => {
      data = JSON.parse(data);
      enqueueSnackbar(data.message, {
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "error",
        autoHideDuration: 3000,
        onClick: () => navigate(data.link),
      });
    });
  }, [enqueueSnackbar, navigate]);

  return null;
});
