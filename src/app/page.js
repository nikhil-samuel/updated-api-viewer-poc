'use client';

import { useState, useEffect } from 'react';
import { sampleRequests } from '../mockData/sampleRequests';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const router = useRouter();
  
  // Only consider POST /request endpoint (claim submissions)
  const claimRequests = requests.filter(req => 
    req.method === 'POST' && req.endpoint === '/request');
  
  useEffect(() => {
    // Check if user is logged in - if not, redirect to login
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus !== 'true') {
      router.push('/login');
      return;
    }
    
    // Simulate loading data from API
    setTimeout(() => {
      setRequests(sampleRequests);
      setLoading(false);
    }, 800);
  }, [router]);
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Format JSON for better readability
  const formatJson = (data) => {
    return JSON.stringify(data, null, 2);
  };
  
  // Extract member name from request data - get the exact name
  const getMemberInfo = (request) => {
    const memberID = request.request?.request?.member_id || 'Unknown';
    
    // Get the full name for display (in a real app, this would come from a database lookup)
    const names = {
      'MEM12345': 'Charles Heyer',  // Matches the bank_account.holder in the request
      'MEM12346': 'Maria Rodriguez', // Matches the bank_account.holder in the request
      'DEFAULT': 'Unknown Member'
    };
    
    return {
      id: memberID,
      name: names[memberID] || names['DEFAULT']
    };
  };
  
  // Get the request type from the request data
  const getRequestType = (request) => {
    return request.request?.request_type || 'Unknown';
  };

  // Get status code color class based on status code
  const getStatusColorClass = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
      return 'bg-green-100 text-green-800'; // Success
    } else if (statusCode >= 400 && statusCode < 500) {
      return 'bg-yellow-100 text-yellow-800'; // Client error
    } else if (statusCode >= 500) {
      return 'bg-red-100 text-red-800'; // Server error
    } else {
      return 'bg-blue-100 text-blue-800'; // Other
    }
  };
  
  return (
    <div>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-2">Claims Queue <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{claimRequests.length}</span></h1>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <svg className="inline-block animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Loading claims...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {claimRequests.map(claim => {
            const memberInfo = getMemberInfo(claim);
            
            return (
              <div key={claim.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => toggleExpand(claim.id)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{memberInfo.name}</span>
                    <span className="text-gray-500 text-sm">{memberInfo.id}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-medium">Type</span>
                    <span className="text-gray-500 text-sm capitalize">{getRequestType(claim)}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-medium">Amount</span>
                    <span className="text-gray-500 text-sm">{claim.amount}</span>
                  </div>
                  
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(claim.statusCode)}`}>
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {claim.statusCode}
                    </span>
                  </div>
                </div>
                
                {expandedId === claim.id && (
                  <div className="border-t p-4 bg-gray-50">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">API Request:</h3>
                      <pre className="bg-white p-3 rounded border text-xs overflow-auto max-h-60">{formatJson(claim.request)}</pre>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">API Response:</h3>
                      <pre className="bg-white p-3 rounded border text-xs overflow-auto max-h-60">{formatJson(claim.response)}</pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
