
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyOTP = () => {
  const { phoneNumber, profileCompleted } = useContext(UserContext);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  // Handle OTP input changes
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Resend OTP countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendOTP = () => {
    setSeconds(30);
    // In a real app, we would call an API to resend the OTP
  };

  const handleVerifyOTP = () => {
    setIsVerifying(true);

    // In a real app, we would validate the OTP with an API
    setTimeout(() => {
      setIsVerifying(false);
      
      // Navigate based on whether profile is completed
      if (profileCompleted) {
        navigate("/purchase-requests");
      } else {
        navigate("/complete-profile");
      }
    }, 1000);
  };

  const handleBackToLogin = () => {
    navigate("/");
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

        <h1 className="text-2xl font-bold text-center mb-2">Verify Your Phone</h1>
        <p className="text-gray-600 text-sm text-center mb-1">
          Enter the 6-digit code sent to
        </p>
        <p className="text-center font-medium mb-6">{phoneNumber ? `+91 ${phoneNumber}` : "+91 ----12345"}</p>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 text-center text-lg border-2 rounded"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            Resend code in {seconds} seconds
          </p>
        </div>

        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center mb-4"
          onClick={handleVerifyOTP}
          disabled={isVerifying || otp.some(digit => !digit)}
        >
          {isVerifying ? "Verifying..." : "Verify & Continue"}
        </Button>

        <button
          onClick={handleBackToLogin}
          className="flex items-center justify-center mx-auto text-sm text-gray-600 hover:text-gray-800"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
