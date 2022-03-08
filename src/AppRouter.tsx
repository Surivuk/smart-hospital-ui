import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import HospitalTreatment from "./pages/hospitalTreatment/HospitalTreatment";
import MedicalCard from "./pages/medicalCard/MedicalCard";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/app" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="medical-card/:id" element={<MedicalCard />} />
          <Route path="medical-card/:id/hospital-treatments/:treatmentId" element={<HospitalTreatment />} />
          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Route>
      </Routes>
    </div>
  );
}
