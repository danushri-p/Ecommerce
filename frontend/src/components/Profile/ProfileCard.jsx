import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Mail, UserCircle, MapPin, Trash2, User } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
    {children}
  </div>
);

const IconWrapper = ({ children }) => (
  <div className="bg-blue-50 p-2 rounded-full">{children}</div>
);

const InfoSection = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <IconWrapper>{icon}</IconWrapper>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="text-gray-900">{value}</div>
    </div>
  </div>
);

export function ProfileCard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('Token missing login');
    }
    const response = await axios.get(
      `http://localhost:8080/user/user-data?token=${token}`
    );

    setUserData(response.data.data);
  };
  const data = useSelector((state) => state.user);
  console.log(data);
  useEffect(() => {
    getUserData();
  }, []);

  const handleDeleteAddy = async (id) => {
    const token = localStorage.getItem('token');
    try {
      if (!token) {
        return alert('Token missing');
      }
      const response = await axios.delete(
        `http://localhost:8080/user/delete-address/${id}?token=${token}`
      );
      getUserData();
    } catch (er) {
      console.log(er.response.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden shrink-0">
              {userData?.avatar?.url ? (
                <img
                  src={userData.avatar.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-blue-600" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {userData.Name}
              </h1>
              <span className="text-gray-500 capitalize text-sm">
                {userData.role}
              </span>
            </div>
          </div>

          {/* Info Sections */}
          <div className="space-y-5">
            <InfoSection
              icon={<Fingerprint className="w-5 h-5 text-blue-600" />}
              label="User ID"
              value={
                <span className="font-mono text-sm">{userData._id}</span>
              }
            />

            <InfoSection
              icon={<Mail className="w-5 h-5 text-blue-600" />}
              label="Email"
              value={userData.email}
            />

            <InfoSection
              icon={<UserCircle className="w-5 h-5 text-blue-600" />}
              label="Role"
              value={<span className="capitalize">{userData.role}</span>}
            />

            <InfoSection
              icon={<MapPin className="w-5 h-5 text-blue-600" />}
              label="Addresses"
              value={
                userData?.address?.length > 0 ? (
                  <div className="space-y-2 mt-1">
                    {userData.address.map((SingleAddy) => (
                      <div
                        key={SingleAddy._id}
                        className="border border-gray-200 rounded-lg p-3 flex items-start justify-between gap-3"
                      >
                        <div className="text-sm text-gray-700 space-y-0.5">
                          <p className="font-medium text-gray-900">
                            {SingleAddy.city}, {SingleAddy.country}
                          </p>
                          <p>{SingleAddy.address1}</p>
                          {SingleAddy.address2 && <p>{SingleAddy.address2}</p>}
                          <p>Pin Code: {SingleAddy.zipCode}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteAddy(SingleAddy._id)}
                          className="text-gray-400 hover:text-red-500 shrink-0"
                          aria-label="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 italic">
                    No addresses found
                  </span>
                )
              }
            />
          </div>

          {/* Add Address Button */}
          <button
            onClick={() => navigate('/add-address')}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
          >
            Add Address
          </button>
        </Card>
      </div>
    </div>
  );
}
