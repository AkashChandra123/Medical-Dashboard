import { useEffect, useState } from 'react';
import { doctorAPI } from '../services/api';

function DoctorList({ hospital, onBack }) {
  const [doctors, setDoctors] = useState([]);
  const [department, setDepartment] = useState('');

  useEffect(() => {
    doctorAPI.getByHospital(hospital).then(res => setDoctors(res.data));
  }, [hospital]);

  const handleFilter = async () => {
    if (department) {
      const res = await doctorAPI.getByHospitalAndDepartment(hospital, department);
      setDoctors(res.data);
    } else {
      const res = await doctorAPI.getByHospital(hospital);
      setDoctors(res.data);
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="px-6 py-2 mb-4 text-gray-800 transition bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        ⬅️ Back to Hospital List
      </button>

      <h2 className="mb-6 text-3xl font-bold text-center">{hospital} Doctors</h2>

      {/* Department Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-64 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleFilter}
          className="px-5 py-2 ml-3 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
        >
          Filter
        </button>
      </div>

      {/* Doctor Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {doctors.map(doc => (
          <div key={doc.id} className="flex flex-col items-center p-6 transition bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-center w-24 h-24 mb-4 bg-gray-200 rounded-full">
              <span className="text-3xl text-gray-500">👨‍⚕️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{doc.name}</h3>
            <p className="text-gray-600">{doc.department}</p>
            <p className="text-gray-600">{doc.specialization}</p>
            <p className="text-gray-600">Experience: {doc.experienceYears} years</p>
            <p className="text-gray-600">Fee: ₹{doc.consultationFee}</p>
            <p className="font-semibold text-yellow-600">⭐ {doc.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;