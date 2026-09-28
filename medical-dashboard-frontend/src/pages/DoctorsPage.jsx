import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doctorAPI } from '../services/api';

function DoctorsPage() {
  const { user, logout } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDoctors();
  }, [user, navigate]);

  const fetchDoctors = async () => {
    try {
      // ✅ Use doctorAPI.getDoctors() instead of getAll()
      const response = await doctorAPI.getDoctors();
      setDoctors(response.data);
      setFilteredDoctors(response.data);

      // Extract unique departments
      const uniqueDepts = [...new Set(response.data.map(d => d.department))];
      setDepartments(uniqueDepts);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentFilter = (dept) => {
    setSelectedDepartment(dept);
    if (dept === 'all') {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(doctors.filter(d => d.department === dept));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    let filtered = doctors;

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(d => d.department === selectedDepartment);
    }

    if (term) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(term.toLowerCase()) ||
        d.specialization.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
              <Link to="/appointments" className="text-gray-700 hover:text-blue-600">
                My Appointments
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
          <h1 className="mb-2 text-4xl font-bold text-gray-800">Find Your Doctor</h1>
          <p className="text-gray-600">Browse top-rated specialists across various departments</p>
        </div>

        {/* Search and Filters */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Search */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Search Doctors
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name or specialization..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department Filter */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Filter by Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => handleDepartmentFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        {loading ? (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-600">Loading doctors...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-lg shadow-md">
            <p className="mb-4 text-xl text-gray-600">No doctors found</p>
            <button
              onClick={() => {
                setSelectedDepartment('all');
                setSearchTerm('');
                setFilteredDoctors(doctors);
              }}
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="overflow-hidden transition bg-white rounded-lg shadow-md hover:shadow-xl">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600">
                  <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                  <p className="text-sm text-white">{doctor.specialization}</p>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <p className="mb-1 text-sm text-gray-600">Department</p>
                    <p className="font-semibold">{doctor.department}</p>
                  </div>

                  <div className="mb-4">
                    <p className="mb-1 text-sm text-gray-600">Experience</p>
                    <p className="font-semibold">{doctor.experienceYears} years</p>
                  </div>

                  <div className="mb-4">
                    <p className="mb-1 text-sm text-gray-600">Hospital</p>
                    <p className="font-semibold">{doctor.hospitalName}</p>
                  </div>

                  <div className="mb-4">
                    <p className="mb-1 text-sm text-gray-600">Consultation Fee</p>
                    <p className="font-semibold text-green-600">₹{doctor.consultationFee}</p>
                  </div>

                  <div className="mb-4">
                    <p className="mb-1 text-sm text-gray-600">Rating</p>
                    <p className="font-semibold text-yellow-600">⭐ {doctor.rating}/5</p>
                  </div>

                  <Link
                    to={`/book-appointment/${doctor.id}`}
                    className="block w-full py-2 font-semibold text-center text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorsPage;