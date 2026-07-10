import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const AddressList = ({ addresses }) => {
  const navigate = useNavigate();
  if (!addresses || addresses.length === 0) {
    return (
      <div className="text-center text-gray-400 py-16">No addresses found</div>
    );
  }
  const handleClickAddress = (addressId) => {
    const SingleAddress = addresses.find((addr) => addr._id === addressId);
    localStorage.setItem('address', JSON.stringify(SingleAddress));
    navigate('/order-confirmation');
  };

  return (
    <div className="flex flex-col gap-4">
      {addresses.map((address, index) => (
        <div
          key={address._id || index}
          onClick={() => handleClickAddress(address._id)}
          className="flex items-start gap-3 border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-150 cursor-pointer"
        >
          <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900 capitalize mb-1">
              {address.addressType || 'Address'} {index + 1}
            </h3>
            <div className="text-sm text-gray-600 space-y-0.5">
              <p>{address.address1}</p>
              {address.address2 && <p>{address.address2}</p>}
              <p>
                {address.city}
                {address.zipCode && `, ${address.zipCode}`}
              </p>
              <p>{address.country}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
