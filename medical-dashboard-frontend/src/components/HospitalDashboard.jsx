import React, { useEffect, useState } from "react";
import { getHospitals, getDoctorsByHospital } from "../services/api";

function HospitalDashboard() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getHospitals().then(res => setHospitals(res.data));
  }, []);

  const handleSelectHospital = (id) => {
    setSelectedHospital(id);
    getDoctorsByHospital(id).then(res => setDoctors(res.data));
  };

  return (
    <div>
      <h2>Hospital Dashboard</h2>
      <ul>
        {hospitals.map(h => (
          <li key={h.id} onClick={() => handleSelectHospital(h.id)}>
            {h.name}
          </li>
        ))}
      </ul>

      {selectedHospital && (
        <div>
          <h3>Doctors in Hospital</h3>
          <ul>
            {doctors.map(d => (
              <li key={d.id}>{d.name} - {d.specialization} ({d.available ? "Available" : "Not Available"})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HospitalDashboard;