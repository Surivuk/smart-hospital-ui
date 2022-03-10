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
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { useAppSelector } from "../../hooks";
import Monitoring from "./Monitoring";
import { TherapyItem } from "./TherapyItem";
import {
  closeHospitalTreatment,
  fetchHospitalTreatmentData,
  openHospitalTreatment,
} from "./treatmentActions";

export default function HospitalTreatment() {
  const { id, treatmentId } = useParams();
  const dispatch = useDispatch();
  const therapies = useAppSelector(
    (state) => state.hospitalTreatment.therapies
  );

  React.useEffect(() => {
    if (treatmentId) {
      dispatch(fetchHospitalTreatmentData(treatmentId));
      dispatch(openHospitalTreatment(treatmentId));
    }
    return () => {
      dispatch(closeHospitalTreatment(treatmentId as string));
    };
  }, [dispatch, treatmentId]);

  return (
    <div>
      <PageHeader
        title="Hospital Treatment"
        subtitle={treatmentId as string}
        iconType="hospital-treatment"
      />
      <Monitoring />

      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ marginTop: -2, padding: 0 }}
      >
        <Typography variant="overline" align="center" component={Link} to={`/health-data?treatment=${treatmentId}&medicalCardId=${id}`}>
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
                <IconButton
                  component={Link}
                  to="determine-therapy"
                >
                  <Add />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <List>
          {therapies.map((therapy, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={`therapies/${therapy.id}`}
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
