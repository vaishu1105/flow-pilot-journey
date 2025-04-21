
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import { Button } from "@/components/ui/button";

const RequestDetails = () => {
  const { currentRequest } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // In a real app, if currentRequest is null, we would fetch the request by id
  if (!currentRequest) {
    return (
      <div className="min-h-screen bg-green-300 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-xl font-bold mb-4">Request not found</h1>
          <Button
            onClick={() => navigate("/purchase-requests")}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Back to Purchase Requests
          </Button>
        </div>
      </div>
    );
  }

  const handleBackToDashboard = () => {
    navigate("/purchase-requests");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };

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

      <main className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold">{currentRequest.cropName}</h1>
              {currentRequest.status === "accepted" && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Accepted
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Request ID: {currentRequest.id}
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div>
                <h3 className="text-gray-500 text-sm">Quantity</h3>
                <p className="font-medium">{currentRequest.quantity} kg</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Required Date</h3>
                <p className="font-medium">{formatDate(currentRequest.requiredDate)}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Delivery Location</h3>
                <p className="font-medium">{currentRequest.deliveryLocation}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Request Created</h3>
                <p className="font-medium">{formatDate(currentRequest.createdAt)}</p>
              </div>
            </div>

            {currentRequest.additionalNotes && (
              <div className="mb-6">
                <h3 className="text-gray-500 text-sm mb-1">Additional Notes</h3>
                <p className="p-3 bg-gray-50 rounded-md text-gray-800">
                  {currentRequest.additionalNotes || "Need fresh ripe tomatoes for restaurant use. Prefer locally grown."}
                </p>
              </div>
            )}

            {currentRequest.farmerDetails && (
              <div>
                <h3 className="font-bold mb-3">Farmer Details</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mr-3">
                      {currentRequest.farmerDetails.name.split(' ').map(name => name[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{currentRequest.farmerDetails.name}</p>
                      <p className="text-sm text-gray-500">{currentRequest.farmerDetails.location}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(currentRequest.farmerDetails!.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-1">{currentRequest.farmerDetails.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    Contact Farmer
                  </Button>
                </div>
              </div>
            )}
          </div>

          {currentRequest.status === "accepted" && (
            <div className="p-4 border-t">
              <Button
                className="w-full flex items-center justify-center bg-white border border-green-500 text-green-500 hover:bg-green-50"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mark as Fulfilled
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RequestDetails;
