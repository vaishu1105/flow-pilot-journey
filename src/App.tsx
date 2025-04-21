import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import BuyerLogin from "./pages/BuyerLogin";
import VerifyOTP from "./pages/VerifyOTP";
import CompleteProfile from "./pages/CompleteProfile";
import PurchaseRequests from "./pages/PurchaseRequests";
import PostNewRequest from "./pages/PostNewRequest";
import RequestDetails from "./pages/RequestDetails";
import NotFound from "./pages/NotFound";

// Create a Context to manage user state across the app
import { createContext } from "react";

// User context type definition
interface UserContextType {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  profileCompleted: boolean;
  setProfileCompleted: (completed: boolean) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  currentRequest: PurchaseRequest | null;
  setCurrentRequest: (request: PurchaseRequest | null) => void;
}

export interface UserProfile {
  fullName: string;
  location: string;
  phoneNumber: string;
  emailAddress: string;
}

export interface PurchaseRequest {
  id: string;
  cropName: string;
  quantity: number;
  deliveryLocation: string;
  requiredDate: string;
  additionalNotes?: string;
  status: 'open' | 'accepted' | 'completed';
  createdAt: string;
  farmerDetails?: {
    name: string;
    location: string;
    rating: number;
  };
}

export const UserContext = createContext<UserContextType>({
  phoneNumber: '',
  setPhoneNumber: () => {},
  profileCompleted: false,
  setProfileCompleted: () => {},
  userProfile: null,
  setUserProfile: () => {},
  currentRequest: null,
  setCurrentRequest: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  // Set up state for the user context
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentRequest, setCurrentRequest] = useState<PurchaseRequest | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{
        phoneNumber,
        setPhoneNumber,
        profileCompleted,
        setProfileCompleted,
        userProfile,
        setUserProfile,
        currentRequest,
        setCurrentRequest
      }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<BuyerLogin />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/complete-profile" element={<CompleteProfile />} />
              <Route path="/purchase-requests" element={<PurchaseRequests />} />
              <Route path="/post-request" element={<PostNewRequest />} />
              <Route path="/request-details/:id" element={<RequestDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
