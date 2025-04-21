
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, PurchaseRequest } from "../App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PostNewRequest = () => {
  const { setCurrentRequest } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    deliveryLocation: "",
    requiredDate: "",
    additionalNotes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBackToDashboard = () => {
    navigate("/purchase-requests");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, we would submit to an API
    setTimeout(() => {
      const newRequest: PurchaseRequest = {
        id: `REQ-${Date.now().toString().slice(-6)}`,
        cropName: formData.cropName,
        quantity: Number(formData.quantity),
        deliveryLocation: formData.deliveryLocation,
        requiredDate: formData.requiredDate,
        additionalNotes: formData.additionalNotes,
        status: "open",
        createdAt: new Date().toISOString(),
        farmerDetails: {
          name: "Rajesh Kumar",
          location: "Nashik",
          rating: 4.8
        }
      };
      
      setCurrentRequest(newRequest);
      setIsSubmitting(false);
      navigate(`/request-details/${newRequest.id}`);
    }, 1000);
  };

  // List of crops for dropdown
  const crops = [
    "Rice",
    "Wheat",
    "Maize",
    "Potatoes",
    "Tomatoes",
    "Onions",
    "Organic Tomatoes",
    "Premium Rice"
  ];

  return (
    <div className="min-h-screen bg-green-300">
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-green-600 font-semibold">FC</span>
          </div>
          <span className="ml-2 text-green-700 font-semibold">FarmConnect</span>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </header>

      <main className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-2">Post New Request</h1>
          <p className="text-gray-600 text-sm mb-6">
            Fill in the details below to create a new purchase request
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="cropName" className="block text-sm font-medium text-gray-700 mb-1">
                Crop Name
              </label>
              <Select onValueChange={(value) => handleSelectChange("cropName", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select or type crop name" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (kg)
              </label>
              <div className="relative">
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="Enter quantity in kilograms"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full py-2 pr-12 pl-3 border rounded-md"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  kg
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="deliveryLocation" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Location
              </label>
              <div className="relative">
                <Input
                  id="deliveryLocation"
                  name="deliveryLocation"
                  type="text"
                  placeholder="Select delivery location"
                  value={formData.deliveryLocation}
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
              <label htmlFor="requiredDate" className="block text-sm font-medium text-gray-700 mb-1">
                Required Date
              </label>
              <Input
                id="requiredDate"
                name="requiredDate"
                type="date"
                value={formData.requiredDate}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 border rounded-md"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <Textarea
                id="additionalNotes"
                name="additionalNotes"
                placeholder="Enter any specific requirements or notes"
                value={formData.additionalNotes}
                onChange={handleChange}
                className="w-full py-2 px-3 border rounded-md resize-none h-24"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md"
              disabled={isSubmitting || !formData.cropName || !formData.quantity || !formData.deliveryLocation || !formData.requiredDate}
            >
              {isSubmitting ? "Posting..." : "Post Request"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostNewRequest;
