// src/pages/Unauthorized.jsx
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
        <p className="mb-6">You don't have permission to access this page.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;