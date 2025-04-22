
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CompleteProfile = () => {
  const { phoneNumber, setProfileCompleted, setUserProfile } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    emailAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, we would submit to an API
    setTimeout(() => {
      setUserProfile({
        fullName: formData.fullName,
        location: formData.location,
        phoneNumber: phoneNumber,
        emailAddress: formData.emailAddress
      });
      setProfileCompleted(true);
      setIsSubmitting(false);
      navigate("/purchase-requests");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-300">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-green-600 font-semibold">FC</span>
          </div>
          <span className="ml-2 text-green-700 font-semibold text-xl">FarmConnect</span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Complete Your Profile</h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Help us personalize your experience
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full py-2 pl-3 pr-10 border rounded-md"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Select your location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full py-2 pl-3 pr-10 border rounded-md"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                disabled
                className="w-full py-2 pl-3 pr-10 border rounded-md bg-gray-100"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Input
                id="emailAddress"
                name="emailAddress"
                type="email"
                placeholder="Enter your email"
                value={formData.emailAddress}
                onChange={handleChange}
                required
                className="w-full py-2 pl-3 pr-10 border rounded-md"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-md flex items-center justify-center bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Complete Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
