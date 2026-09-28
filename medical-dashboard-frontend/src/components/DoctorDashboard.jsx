import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointmentsByDoctor, updateAppointmentStatus } from "../services/api";

function DoctorDashboard() {
  const { doctorId } = useParams(); // ✅ get doctorId from URL
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointmentsByDoctor(doctorId).then(res => setAppointments(res.data));
  }, [doctorId]);

  const handleStatusChange = (id, status) => {
    updateAppointmentStatus(id, status).then(res => {
      setAppointments(prev => prev.map(a => a.id === id ? res.data : a));
    });
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      {appointments.map(a => (
        <div key={a.id} className="appointment-card">
          <p>Patient: {a.patientName}</p>
          <p>Status: {a.status}</p>
          <button onClick={() => handleStatusChange(a.id, "Confirmed")}>Confirm</button>
          <button onClick={() => handleStatusChange(a.id, "Rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default DoctorDashboard;