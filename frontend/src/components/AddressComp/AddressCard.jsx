import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddressCard = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [add1, setAdd1] = useState('');
  const [add2, setAdd2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [addressType, setAddressType] = useState('');
  const [state, setState] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressData = {
      city,
      country,
      address1: add1,
      address2: add2,
      zipCode,
      addressType,
      state,
    };

    console.log(addressData);

    const token = localStorage.getItem('token');
    if (!token) {
      return alert('Token missing, please login again');
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/user/add-address?token=${token}`,
        addressData
      );
      navigate('/profile');
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const inputClass =
    'w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition duration-150';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Enter Your Address
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClass}
            />
          </div>
          <input
            type="text"
            placeholder="Address Line 1"
            value={add1}
            onChange={(e) => setAdd1(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Address Line 2"
            value={add2}
            onChange={(e) => setAdd2(e.target.value)}
            className={inputClass}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="State/Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={inputClass}
            />
          </div>
          <select
            value={addressType}
            onChange={(e) => setAddressType(e.target.value)}
            className={`${inputClass} text-gray-600`}
          >
            <option value="">Select Address Type</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Shipping">Shipping</option>
            <option value="Billing">Billing</option>
          </select>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressCard;
