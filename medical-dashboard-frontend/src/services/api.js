import axios from "axios";

const API_BASE = "http://localhost:8080/api"; // adjust if backend runs on different port

// =======================
// ✅ Hospital API
// =======================
export const hospitalAPI = {
  getHospitals: () => axios.get(`${API_BASE}/hospitals`),
  getHospitalById: (id) => axios.get(`${API_BASE}/hospitals/${id}`),
  createHospital: (hospital) => axios.post(`${API_BASE}/hospitals`, hospital),
  updateHospital: (id, hospital) => axios.put(`${API_BASE}/hospitals/${id}`, hospital),
  deleteHospital: (id) => axios.delete(`${API_BASE}/hospitals/${id}`),
};

// =======================
// ✅ Doctor API
// =======================
export const doctorAPI = {
  getDoctors: () => axios.get(`${API_BASE}/doctors`),
  getDoctorById: (id) => axios.get(`${API_BASE}/doctors/${id}`),
  getDoctorsByHospital: (hospitalId) => axios.get(`${API_BASE}/doctors/hospital/${hospitalId}`),
  createDoctor: (doctor) => axios.post(`${API_BASE}/doctors`, doctor),
  updateDoctor: (id, doctor) => axios.put(`${API_BASE}/doctors/${id}`, doctor),
  updateDoctorAvailability: (doctorId, available) =>
    axios.put(`${API_BASE}/doctors/${doctorId}/availability`, { available }),
  deleteDoctor: (id) => axios.delete(`${API_BASE}/doctors/${id}`),
};

// =======================
// ✅ Appointment API
// =======================
export const appointmentAPI = {
  getAppointments: () => axios.get(`${API_BASE}/appointments`),
  getAppointmentById: (id) => axios.get(`${API_BASE}/appointments/${id}`),
  getAppointmentsByDoctor: (doctorId) => axios.get(`${API_BASE}/appointments/doctor/${doctorId}`),
  getAppointmentsByHospital: (hospitalId) => axios.get(`${API_BASE}/appointments/hospital/${hospitalId}`),
  createAppointment: (appointment) => axios.post(`${API_BASE}/appointments`, appointment),
  updateAppointmentStatus: (id, status) =>
    axios.put(`${API_BASE}/appointments/${id}/status`, { status }),
  deleteAppointment: (id) => axios.delete(`${API_BASE}/appointments/${id}`),
};

// =======================
// ✅ Patient API
// =======================
export const patientAPI = {
  getPatients: () => axios.get(`${API_BASE}/patients`),
  getPatientById: (id) => axios.get(`${API_BASE}/patients/${id}`),
  createPatient: (patient) => axios.post(`${API_BASE}/patients`, patient),
  updatePatient: (id, patient) => axios.put(`${API_BASE}/patients/${id}`, patient),
  deletePatient: (id) => axios.delete(`${API_BASE}/patients/${id}`),
};

// =======================
// ✅ Broker API
// =======================
export const brokerAPI = {
  getBrokers: () => axios.get(`${API_BASE}/brokers`),
  getBrokerById: (id) => axios.get(`${API_BASE}/brokers/${id}`),
  createBroker: (broker) => axios.post(`${API_BASE}/brokers`, broker),
  updateBroker: (id, broker) => axios.put(`${API_BASE}/brokers/${id}`, broker),
  deleteBroker: (id) => axios.delete(`${API_BASE}/brokers/${id}`),
};
