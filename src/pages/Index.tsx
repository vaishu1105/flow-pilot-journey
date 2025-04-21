import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-300">
      <div className="text-center">
        <p className="text-xl text-gray-700">Redirecting to login...</p>
      </div>
    </div>
  );
};

export default Index;
