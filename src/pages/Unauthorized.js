import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Unauthorized() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-3xl font-bold mb-4">Unauthorized</h2>
        <p className="text-lg mb-6">
          You do not have permission to access this page.
        </p>
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
