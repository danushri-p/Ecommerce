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
    <div>
      <div className="flex justify-end p-4">
        <Link
          to="/add-address"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Address
        </Link>
      </div>
      <AddressList addresses={AllAddresses} />
    </div>
  );
}