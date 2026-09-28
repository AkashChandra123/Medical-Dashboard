import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doctorAPI, hospitalAPI, brokerAPI, appointmentAPI } from '../services/api';

function BookAppointmentPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { doctorId } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [brokers, setBrokers] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, doctorId, navigate]);

  const fetchData = async () => {
    try {
      const doctorRes = await doctorAPI.getDoctorById(doctorId);
      setDoctor(doctorRes.data);

      const hospitalRes = await hospitalAPI.getHospitalById(doctorRes.data.hospitalId);
      setHospital(hospitalRes.data);

      const brokerRes = await brokerAPI.getBrokers();
      setBrokers(brokerRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load appointment details');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedBroker) {
      setError('Please select a broker');
      return;
    }

    try {
      const appointment = {
        patientId: user.id,
        doctorId: doctor.id,
        hospitalId: hospital.id,
        brokerId: selectedBroker,
        status: 'Pending',
        appointmentDate: new Date().toISOString(),
      };

      await appointmentAPI.createAppointment(appointment);
      navigate('/appointments');
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError('Failed to book appointment');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
            Medical Tourism Platform
          </Link>
          <Link to="/appointments" className="text-gray-700 hover:text-blue-600">
            My Appointments
          </Link>
        </div>
      </nav>

      <div className="container px-4 py-8 mx-auto">
        {loading ? (
          <p className="text-center text-gray-600">Loading appointment details...</p>
        ) : error ? (
          <div className="px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        ) : (
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="mb-6 text-3xl font-bold">Book Appointment</h1>

            <div className="mb-6">
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.specialization}</p>
              <p className="text-gray-600">Hospital: {hospital.name}</p>
              <p className="text-gray-600">Consultation Fee: ₹{doctor.consultationFee}</p>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Select Broker
              </label>
              <select
                value={selectedBroker}
                onChange={(e) => setSelectedBroker(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose a Broker --</option>
                {brokers.map(broker => (
                  <option key={broker.id} value={broker.id}>
                    {broker.name} ({broker.agency})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleBookAppointment}
              className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Confirm Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookAppointmentPage;