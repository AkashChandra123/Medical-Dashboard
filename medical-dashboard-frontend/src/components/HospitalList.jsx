import apolloLogo from '../assets/logos/apollo.jpeg';
import utkalLogo from '../assets/logos/utkal.jpeg';
import kimsLogo from '../assets/logos/kims.jpeg';

function HospitalList({ onSelect }) {
  const hospitals = [
    { name: "Apollo", logo: apolloLogo },
    { name: "Utkal", logo: utkalLogo },
    { name: "KIMS", logo: kimsLogo },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {hospitals.map(hospital => (
        <div
          key={hospital.name}
          onClick={() => onSelect(hospital.name)}
          className="flex flex-col items-center p-6 transition-transform bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105"
        >
          <img src={hospital.logo} alt={hospital.name} className="object-contain w-32 h-32 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">{hospital.name} Hospital</h3>
        </div>
      ))}
    </div>
  );
}

export default HospitalList;