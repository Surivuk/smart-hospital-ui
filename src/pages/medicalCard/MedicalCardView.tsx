import { Avatar, Divider, Grid, ListItem, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { MedicalCard } from "../../common/repository/MedicalCardRepository";

export interface MedicalCardViewProps {
  medicalCard: MedicalCard;
}

const size = 100;

function EventRow({
  id,
  createdAt,
  type,
}: {
  id: string;
  createdAt: string;
  type: string;
}) {
  const text = React.useMemo(() => {
    if (type === "hospital_treatment") return "Hospital Treatment";
    if (type === "therapy") return "Prescribed Therapy";
    return "Examination Performed";
  }, [type]);

  return (
    <ListItem
      button
      sx={{ margin: 0, padding: 0 }}
      component={Link}
      to={`${type}/${id}`}
    >
      <Grid container>
        <Grid item xs>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ height: size }}
          >
            <Typography variant="caption">{createdAt}</Typography>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Avatar sx={{ padding: 1 }} src={`/images/${type}.png`} />
          </Grid>
        </Divider>
        <Grid item xs>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ height: size }}
          >
            <Typography variant="caption">{text}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default function MedicalCardView({ medicalCard }: MedicalCardViewProps) {
  const { events } = medicalCard;
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
      >
        {events.map((event, index) => (
          <EventRow key={index} {...event} />
        ))}
      </Grid>
    </div>
  );
}
