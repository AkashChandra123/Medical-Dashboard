import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Medical Tourism Platform
          </h1>
          <p className="text-xl mb-8">
            Connect with top doctors in India through verified healthcare brokers
          </p>
          
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl mb-4">🏥</div>
            <h3 className="text-xl font-bold mb-2">Top Hospitals</h3>
            <p className="text-gray-600">Access world-class medical facilities</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-bold mb-2">Expert Doctors</h3>
            <p className="text-gray-600">Connect with experienced specialists</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-2">Healthcare Brokers</h3>
            <p className="text-gray-600">Get personalized assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;