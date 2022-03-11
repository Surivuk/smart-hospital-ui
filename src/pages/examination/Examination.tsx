import { Box, Divider, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { useAppSelector } from "../../hooks";
import { fetchExamination } from "./examinationActions";
import { stateRestarted } from "./examinationSlice";

export default function Examination() {
  const { examinationId } = useParams();
  const { diagnosis } = useAppSelector((state) => state.examination);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchExamination(examinationId as string));
  }, [dispatch, examinationId]);

  return (
    <Box>
      <PageHeader
        title="Examination"
        subtitle={examinationId as string}
        iconType="examination"
      />
      <Box sx={{ padding: 2 }}>
        <TextField
          id="diagnosis"
          label="Diagnosis"
          multiline
          value={diagnosis}
          fullWidth
          disabled
          rows={5}
        />
      </Box>
    </Box>
  );
}
