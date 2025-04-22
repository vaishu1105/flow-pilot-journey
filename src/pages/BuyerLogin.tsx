
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const BuyerLogin = () => {
  const { setPhoneNumber } = useContext(UserContext);
  const [phoneInput, setPhoneInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSendOTP = () => {
    if (!validatePhoneNumber(phoneInput)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setIsLoading(true);
    // In a real app, we would call an API here to send the OTP
    setTimeout(() => {
      setPhoneNumber(phoneInput);
      setIsLoading(false);
      toast.success("OTP sent successfully!");
      navigate("/verify-otp");
    }, 1500);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneInput(value);
    }
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

        <h1 className="text-2xl font-bold text-center mb-2">Buyer Login</h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your phone number to receive OTP
        </p>

        <div className="mb-6">
          <div className="flex rounded-md border border-gray-300 overflow-hidden">
            <div className="bg-gray-50 px-3 py-2 text-gray-500 border-r">+91</div>
            <Input 
              type="tel" 
              placeholder="Enter phone number" 
              className="flex-1 border-none focus:ring-0"
              value={phoneInput}
              onChange={handlePhoneChange}
              maxLength={10}
            />
          </div>
        </div>

        <Button
          onClick={handleSendOTP}
          disabled={isLoading || phoneInput.length !== 10}
          className={`w-full py-2 rounded-md flex items-center justify-center mb-4 ${
            phoneInput.length === 10 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          type="button"
        >
          {isLoading ? "Sending..." : (
            <>
              <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM11 6V9H14V11H11V14H9V11H6V9H9V6H11Z" fillRule="evenodd" clipRule="evenodd"/>
              </svg>
              Send OTP
            </>
          )}
        </Button>

        <p className="text-xs text-center text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-green-600 hover:underline">
            Terms of Service
          </a>
          {" & "}
          <a href="#" className="text-green-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default BuyerLogin;
