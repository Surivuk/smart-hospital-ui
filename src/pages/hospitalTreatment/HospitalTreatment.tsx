import { Add } from "@mui/icons-material";
import {
  List,
  ListItem,
  Typography,
  Divider,
  Grid,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import Monitoring from "./Monitoring";
import { TherapyItem } from "./TherapyItem";
import {
  closeHospitalTreatment,
  fetchHospitalTreatmentData,
  openHospitalTreatment,
} from "./treatmentActions";

export default function HospitalTreatment() {
  const { treatmentId } = useParams();
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
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ padding: 2 }}
      >
        <Box>
          <Typography variant="h5">Hospital Treatment</Typography>
        </Box>
        <Box sx={{ width: 10 }} />
        <Box>
          <Typography variant="caption" color="gray">
            ({treatmentId})
          </Typography>
        </Box>
      </Grid>
      <Divider />
      <Monitoring />

      <Grid container sx={{ paddingTop: 2, paddingRight: 2, paddingLeft: 2 }}>
        <Grid item xs>
          <Typography variant="h5">Therapies</Typography>
        </Grid>
        <Grid item xs>
          <Grid container direction="row" justifyContent="flex-end">
            <Tooltip title="Determine new therapy">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <Add />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>

      <List>
        {therapies.map((therapy, index) => (
          <ListItem button key={index}>
            <TherapyItem {...therapy} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
