import {
  Box,
  List,
  Paper,
  Typography,
  ListItem,
  TextField,
  Grid,
  Divider,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AlarmNotification } from "../../../common/repository/AlarmRepository";
import PageHeader from "../../../components/PageHeader";
import { useAppSelector } from "../../../hooks";
import { fetchAlarmData } from "./viewAlarmActions";
import { stateRestarted } from "./viewAlarmSlice";

function NotificationItem({
  notification,
}: {
  notification: AlarmNotification;
}) {
  return (
    <Grid container direction="row">
      <Grid item xs>
        <Typography textAlign="center">{notification.dataType}</Typography>
      </Grid>
      <Grid item xs>
        <Typography textAlign="center">
          <strong>{notification.dataValue}</strong>
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography textAlign="center">
          {new Date(notification.createdAt).toLocaleString()}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default function ViewAlarm() {
  const { alarmId } = useParams();
  const dispatch = useDispatch();

  const {
    notifications,
    name,
    key,
    operator,
    value,
    medicalCard,
    hospitalTreatment,
  } = useAppSelector((state) => state.viewAlarm);

  React.useEffect(() => {
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchAlarmData(alarmId as string));
  }, [dispatch, alarmId]);

  return (
    <div>
      <PageHeader title="Alarm" subtitle={alarmId as string} iconType="alarm" />
      <Box sx={{ padding: 2 }}>
        <Paper variant="outlined" sx={{ margin: 2, padding: 2 }}>
          <TextField
            label="Name"
            value={name}
            disabled
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Grid container direction="row" spacing={2}>
            <Grid item xs>
              <TextField label="Key" value={key} disabled />
            </Grid>
            <Grid item xs>
              <TextField label="Operator" value={operator} disabled />
            </Grid>
            <Grid item xs>
              <TextField label="Value" value={value} disabled />
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="center">
            <Typography
              variant="overline"
              textAlign="center"
              component={Link}
              sx={{marginTop: 2}}
              to={`/app/medical-card/${medicalCard}/hospital-treatments/${hospitalTreatment}`}
            >
              View hospital treatment
            </Typography>
          </Grid>
        </Paper>
        <Typography sx={{ paddingLeft: 2 }} variant="h5">
          Notifications
        </Typography>
        <Paper variant="outlined" sx={{ margin: 2 }}>
          <List>
            {notifications.map((notification, index) => (
              <Box
                key={index}
                sx={{
                  marginLeft: 1,
                  marginRight: 1,
                  backgroundColor: index % 2 === 0 ? "#eeeeee" : "white",
                }}
              >
                <NotificationItem notification={notification} />
              </Box>
            ))}
          </List>
        </Paper>
      </Box>
    </div>
  );
}
