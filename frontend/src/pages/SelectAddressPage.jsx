import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddressList from '../components/AllAddresses/Addresses';

export default function SelectAddres() {
  const [AllAddresses, setAllAddresses] = useState([]);
  useEffect(() => {
    //api call to get addresses
    const fetchAddress = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('token missing please login again');
      }
      const response = await axios.get(
        `http://localhost:8080/user/get-addresses?token=${token}`
      );
      console.log(response.data.userInfo);
      setAllAddresses(response.data.userInfo.address);
    };
    fetchAddress();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Select Address</h1>
          <Link
            to="/add-address"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Add New Address
          </Link>
        </div>
        <AddressList addresses={AllAddresses} />
      </div>
    </div>
  );
}