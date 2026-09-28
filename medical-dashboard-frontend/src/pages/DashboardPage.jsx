import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { appointmentAPI } from '../services/api';
import HospitalList from '../components/HospitalList';
import DoctorList from '../components/DoctorList';

function DashboardPage() {
  const { user, logout, checkAuth } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const navigate = useNavigate();

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch appointments when user is available
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchAppointments = async () => {
      try {
        const response = await appointmentAPI.getByPatient(user.id);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user?.id, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <h1 className="text-2xl font-bold text-blue-600">Medical Tourism Platform</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              Welcome, <span className="font-semibold">{user.firstName}</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container px-4 py-8 mx-auto">
        {/* Welcome Section */}
        <div className="p-8 mb-8 text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <h2 className="mb-2 text-3xl font-bold">
            Welcome back, {user.firstName} {user.lastName}!
          </h2>
          <p className="text-lg">Manage your appointments and find the best doctors in Bhubaneswar</p>
        </div>

        {/* Hospital → Doctor Flow */}
        <div className="mb-8">
          {!selectedHospital ? (
            <HospitalList onSelect={setSelectedHospital} />
          ) : (
            <DoctorList hospital={selectedHospital} onBack={() => setSelectedHospital(null)} />
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Link
            to="/doctors"
            className="p-6 transition bg-white rounded-lg shadow-md hover:shadow-xl"
          >
            <div className="mb-4 text-4xl">👨‍⚕️</div>
            <h3 className="mb-2 text-xl font-bold">Browse Doctors</h3>
            <p className="text-gray-600">Find specialists by department</p>
          </Link>

          <Link
            to="/appointments"
            className="p-6 transition bg-white rounded-lg shadow-md hover:shadow-xl"
          >
            <div className="mb-4 text-4xl">📅</div>
            <h3 className="mb-2 text-xl font-bold">My Appointments</h3>
            <p className="text-gray-600">View and manage your appointments</p>
          </Link>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4 text-4xl">📊</div>
            <h3 className="mb-2 text-xl font-bold">Quick Stats</h3>
            <p className="text-gray-600">
              Total Appointments: <span className="font-bold text-blue-600">{appointments.length}</span>
            </p>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-2xl font-bold">Recent Appointments</h3>
          {loading ? (
            <p className="text-gray-600">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <div className="py-8 text-center">
              <p className="mb-4 text-gray-600">You don't have any appointments yet.</p>
              <Link
                to="/doctors"
                className="inline-block px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Book Your First Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg font-semibold">{appointment.reasonForVisit}</p>
                      <p className="text-gray-600">
                        Date: {new Date(appointment.appointmentDate).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">Cost: ₹{appointment.estimatedCost}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        appointment.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : appointment.status === 'CANCELLED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Patient Info */}
        <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-2xl font-bold">Your Profile</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font-semibold">{user.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Country</p>
              <p className="font-semibold">{user.country}</p>
            </div>
            <div>
              <p className="text-gray-600">Passport Number</p>
              <p className="font-semibold">{user.passportNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;