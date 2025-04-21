
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, PurchaseRequest } from "../App";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PurchaseRequests = () => {
  const { setCurrentRequest } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // Sample purchase requests data
  const [requests] = useState<PurchaseRequest[]>([
    {
      id: "REQ-2024-01",
      cropName: "Organic Tomatoes",
      quantity: 100,
      deliveryLocation: "Mumbai",
      requiredDate: "2024-01-25",
      status: "open",
      createdAt: "2024-01-15",
    },
    {
      id: "REQ-2024-02",
      cropName: "Premium Rice",
      quantity: 500,
      deliveryLocation: "Delhi",
      requiredDate: "2024-01-20",
      status: "accepted",
      createdAt: "2024-01-10",
    },
    {
      id: "REQ-2024-03",
      cropName: "Fresh Potatoes",
      quantity: 250,
      deliveryLocation: "Bangalore",
      requiredDate: "2024-01-12",
      status: "completed",
      createdAt: "2024-01-05",
    },
  ]);

  const handlePostNewRequest = () => {
    navigate("/post-request");
  };

  const handleViewRequest = (request: PurchaseRequest) => {
    setCurrentRequest(request);
    navigate(`/request-details/${request.id}`);
  };

  const filteredRequests = activeTab === "all" 
    ? requests 
    : requests.filter(request => request.status === activeTab);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md">Open</span>;
      case "accepted":
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-md">Accepted</span>;
      case "completed":
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-md">Completed</span>;
      default:
        return null;
    }
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
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
            <span className="text-sm">TH</span>
          </div>
          <span className="text-sm">Tej Hotel</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Purchase Requests</h1>
          <Button
            onClick={handlePostNewRequest}
            className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Post New Request
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="flex border-b">
              <TabsTrigger value="all" className="flex-1 py-3 text-center">All Requests</TabsTrigger>
              <TabsTrigger value="open" className="flex-1 py-3 text-center">Open</TabsTrigger>
              <TabsTrigger value="accepted" className="flex-1 py-3 text-center">Accepted</TabsTrigger>
              <TabsTrigger value="completed" className="flex-1 py-3 text-center">Completed</TabsTrigger>
              <div className="flex-1 py-3 text-center border-l">
                <button className="flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1">Filters</span>
                </button>
              </div>
            </TabsList>

            <TabsContent value={activeTab} className="p-4">
              <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No requests found
                  </div>
                ) : (
                  filteredRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold">{request.cropName}</h3>
                          <p className="text-sm text-gray-500">Quantity: {request.quantity} kg</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right mr-4">
                          <p className="text-sm text-gray-500">Jan {new Date(request.createdAt).getDate()}, {new Date(request.createdAt).getFullYear()}</p>
                          {getStatusBadge(request.status)}
                        </div>
                        <button 
                          onClick={() => handleViewRequest(request)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PurchaseRequests;
