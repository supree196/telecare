import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
// import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter,
  useLocation,
} from "react-router-dom";
import DoctorProfile from "./components/profile/DoctorProfile";
import PatientProfile from "./components/profile/PatientProfile";
import DoctorList from "./components/DoctorList";
import DoctorRegister from "./components/DoctorRegister";
import PatientRegister from "./components/PatientRegister";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import ProtectedRoutes from "./components/ProtectedRoutes";
import TimeSlot from "./components/TimeSlot";
import VideoCall from "./components/VideoCall";
import Chat from "./components/Chat";
import UpcomingAndPastAppointment from "./components/UpcomingAndPastAppointment";

function App() {
  const location = useLocation();
  return (
    <>
      <ToastContainer closeButton={false} position="top-right" />

      {location.pathname != "/chat" && <Header />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/doctor-register" element={<DoctorRegister />} />
        <Route exact path="/patient-register" element={<PatientRegister />} />

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/doctor-profile" element={<DoctorProfile />} />
          <Route exact path="/patient-profile" element={<PatientProfile />} />
          <Route exact path="/doctor-list" element={<DoctorList />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/video-call/:link" element={<VideoCall />} />
          <Route path="/appointment" element={<UpcomingAndPastAppointment />} />
        </Route>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
