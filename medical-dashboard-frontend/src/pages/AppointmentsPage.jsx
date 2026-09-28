import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { appointmentAPI } from '../services/api';

function AppointmentsPage() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchAppointments();
  }, [user, navigate]);

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

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await appointmentAPI.cancel(id);
      alert('Appointment cancelled successfully!');
      await fetchAppointments(); // Refresh list//
      } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment. Error: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filter);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
              Medical Tourism Platform
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/doctors" className="text-gray-700 hover:text-blue-600">
                Browse Doctors
              </Link>
              <span className="text-gray-700">{user.firstName}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">My Appointments</h1>
          <p className="text-gray-600">View and manage all your appointments</p>
        </div>

        {/* Filter Tabs */}
        <div className="p-4 mb-8 bg-white rounded-lg shadow-md">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({appointments.length})
            </button>
            <button
              onClick={() => setFilter('PENDING')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'PENDING'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pending ({appointments.filter(a => a.status === 'PENDING').length})
            </button>
            <button
              onClick={() => setFilter('CONFIRMED')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'CONFIRMED'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Confirmed ({appointments.filter(a => a.status === 'CONFIRMED').length})
            </button>
            <button
              onClick={() => setFilter('CANCELLED')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'CANCELLED'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancelled ({appointments.filter(a => a.status === 'CANCELLED').length})
            </button>
          </div>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-600">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-lg shadow-md">
            <div className="mb-4 text-6xl">📅</div>
            <p className="mb-4 text-xl text-gray-600">
              {filter === 'all' 
                ? "You don't have any appointments yet."
                : `No ${filter.toLowerCase()} appointments.`}
            </p>
            <Link
              to="/doctors"
              className="inline-block px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-6 transition bg-white rounded-lg shadow-md hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          appointment.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : appointment.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-gray-800">
                      {appointment.reasonForVisit}
                    </h3>

                    <div className="grid gap-4 text-gray-600 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-500">Appointment Date</p>
                        <p className="font-semibold">
                          {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-sm">
                          {new Date(appointment.appointmentDate).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Estimated Cost</p>
                        <p className="text-xl font-semibold text-green-600">
                          ₹{appointment.estimatedCost}
                        </p>
                      </div>

                      {appointment.medicalHistory && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Medical History</p>
                          <p className="text-sm">{appointment.medicalHistory}</p>
                        </div>
                      )}

                      {appointment.notes && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Notes</p>
                          <p className="text-sm">{appointment.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                      <p>Created: {new Date(appointment.createdAt).toLocaleString()}</p>
                      <p>Last Updated: {new Date(appointment.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ml-4">
                    {appointment.status === 'PENDING' || appointment.status === 'CONFIRMED' ? (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentsPage;