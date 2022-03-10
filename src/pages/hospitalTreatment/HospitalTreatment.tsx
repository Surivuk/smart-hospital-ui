import { Add } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { useAppSelector } from "../../hooks";
import ClosedTreatment from "./ClosedTreatment";
import Monitoring from "./Monitoring";
import { TherapyItem } from "./TherapyItem";
import {
  closeHospitalTreatment,
  closeHospitalTreatmentView,
  fetchHospitalTreatmentData,
  openHospitalTreatmentView,
} from "./treatmentActions";
import { stateRestarted } from "./treatmentSlice";

export default function HospitalTreatment() {
  const { id, treatmentId } = useParams();
  const dispatch = useDispatch();
  const { therapies, closed, closedView } = useAppSelector(
    (state) => state.hospitalTreatment
  );

  React.useEffect(() => {
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (treatmentId) {
      dispatch(fetchHospitalTreatmentData(treatmentId));
      dispatch(openHospitalTreatmentView(treatmentId));
    }
    return () => {
      dispatch(closeHospitalTreatmentView(treatmentId as string));
    };
  }, [dispatch, treatmentId]);

  if (closedView) return <ClosedTreatment />;

  return (
    <div>
      <PageHeader
        title="Hospital Treatment"
        subtitle={treatmentId as string}
        iconType="hospital-treatment"
        actionTitle={!closed ? "close treatment" : undefined}
        action={
          !closed
            ? () => dispatch(closeHospitalTreatment(treatmentId as string))
            : undefined
        }
      />
      {closed && (
        <Typography variant="subtitle1" sx={{ padding: 2, color: red[500] }}>
          This hospital treatment is closed
        </Typography>
      )}
      <Monitoring />

      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ marginTop: -2, padding: 0 }}
      >
        <Typography
          variant="overline"
          align="center"
          component={Link}
          to={`/health-data?treatment=${treatmentId}&medicalCardId=${id}`}
        >
          View health data history
        </Typography>
      </Grid>

      <Paper variant="outlined" sx={{ margin: 2 }}>
        <Grid
          container
          sx={{
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 2,
            paddingRight: 2,
          }}
          direction="row"
          alignItems="center"
        >
          <Grid item xs>
            <Typography variant="subtitle1">Therapies</Typography>
          </Grid>
          <Grid item xs>
            <Grid container direction="row" justifyContent="flex-end">
              <Tooltip title="Add new therapy">
                <span>
                  <IconButton
                    disabled={closed}
                    component={Link}
                    to="determine-therapy"
                  >
                    <Add />
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <List>
          {therapies.length === 0 && (
            <Typography textAlign="center" sx={{ padding: 2 }}>
              {" "}
              No therapies
            </Typography>
          )}
          {therapies.map((therapy, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={`therapies/${therapy.id}${closed ? "?disabled=true" : ""}`}
            >
              <TherapyItem {...therapy} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ padding: 0.1 }} />
    </div>
  );
}
