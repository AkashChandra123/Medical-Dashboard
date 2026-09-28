import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorsPage from './pages/DoctorsPage';
import DashboardPage from './pages/DashboardPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import AppointmentsPage from './pages/AppointmentsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
      <Route path="/appointments" element={<AppointmentsPage />} />
    </Routes>
  );
}

export default App;