import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Alarms from "./pages/alarms/Alarms";
import Patients from "./pages/patients/Patients";
import HospitalTreatment from "./pages/hospitalTreatment/HospitalTreatment";
import MedicalCard from "./pages/medicalCard/MedicalCard";
import AddMedicament from "./pages/medicament/AddMedicament";
import DetermineTherapy from "./pages/therapy/DetermineTherapy";
import PrescribeTherapy from "./pages/therapy/PrescribeTherapy";
import StaticTherapy from "./pages/therapy/StaticTherapy";
import Therapy from "./pages/therapy/Therapy";
import NewAlarm from "./pages/alarm/new/NewAlarm";
import ViewAlarm from "./pages/alarm/view/ViewAlarm";
import HealthData from "./pages/healthData/HealthData";
import NewExamination from "./pages/examination/NewExamination";
import Examination from "./pages/examination/Examination";
import NewTreatment from "./pages/hospitalTreatment/NewTreatment";
import NewPatient from "./pages/patient/NewPatient";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/app" element={<App />}>
          <Route path="patients" element={<Patients />} />
          <Route path="patients/add-patient" element={<NewPatient />} />

          <Route path="medical-card/:id" element={<MedicalCard />} />
          <Route path="medical-card/:id/open-treatment" element={<NewTreatment />} />
          <Route path="medical-card/:id/hospital-treatments/:treatmentId" element={<HospitalTreatment />} />
          <Route path="medical-card/:id/hospital-treatments/:treatmentId/determine-therapy" element={<DetermineTherapy />} />
          <Route path="medical-card/:id/hospital-treatments/:treatmentId/therapies/:therapyId" element={<Therapy />} />
          <Route path="medical-card/:id/hospital-treatments/:treatmentId/therapies/:therapyId/add-medicament" element={<AddMedicament />} />

          <Route path="medical-card/:id/therapies/:therapyId" element={<StaticTherapy />} />
          <Route path="medical-card/:id/prescribe-therapy" element={<PrescribeTherapy />} />

          <Route path="medical-card/:id/new-examination" element={<NewExamination />} />
          <Route path="medical-card/:id/examinations/:examinationId" element={<Examination />} />

          <Route path="alarms" element={<Alarms />} />
          <Route path="alarms/:alarmId" element={<ViewAlarm />} />
          <Route path="alarms/new-alarm" element={<NewAlarm />} />
        </Route>
        <Route path="health-data" element={<HealthData />} />
      </Routes>
    </div>
  );
}
