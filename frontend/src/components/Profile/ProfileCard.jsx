import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Fingerprint,
  Mail,
  UserCircle,
  MapPin,
  Trash2,
  User,
  Pencil,
  Check,
  X,
  Heart,
} from 'lucide-react';

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

const addressFields = [
  { name: 'city', placeholder: 'City' },
  { name: 'country', placeholder: 'Country' },
  { name: 'address1', placeholder: 'Address Line 1' },
  { name: 'address2', placeholder: 'Address Line 2' },
  { name: 'zipCode', placeholder: 'Zip Code' },
];

const inputClass =
  'w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600';

export function ProfileCard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressDraft, setAddressDraft] = useState({});
  const [wishlistProducts, setWishlistProducts] = useState([]);

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
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const results = await Promise.all(
      wishlistIds.map((id) =>
        axios
          .get(`http://localhost:8080/product/get-single/${id}`)
          .then((res) => res.data.data)
          .catch(() => null)
      )
    );
    setWishlistProducts(results.filter(Boolean));
  };

  const removeFromWishlist = (id) => {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updated = wishlistIds.filter((pid) => pid !== id);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setWishlistProducts((prev) => prev.filter((p) => p._id !== id));
  };

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

  const startEditingName = () => {
    setNameDraft(userData.Name || '');
    setIsEditingName(true);
  };

  const saveName = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:8080/user/update-profile?token=${token}`,
        { Name: nameDraft }
      );
      setIsEditingName(false);
      getUserData();
    } catch (er) {
      alert(er.response?.data?.message || er.message);
    }
  };

  const startEditingAddress = (address) => {
    setEditingAddressId(address._id);
    setAddressDraft({ ...address });
  };

  const saveAddress = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:8080/user/update-address/${id}?token=${token}`,
        addressDraft
      );
      setEditingAddressId(null);
      getUserData();
    } catch (er) {
      alert(er.response?.data?.message || er.message);
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
            <div className="flex-1">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    className={inputClass}
                  />
                  <button
                    onClick={saveName}
                    className="text-green-600 hover:text-green-700"
                    aria-label="Save name"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Cancel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900">
                    {userData.Name}
                  </h1>
                  <button
                    onClick={startEditingName}
                    className="text-gray-400 hover:text-blue-600"
                    aria-label="Edit name"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
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
                    {userData.address.map((SingleAddy) =>
                      editingAddressId === SingleAddy._id ? (
                        <div
                          key={SingleAddy._id}
                          className="border border-blue-200 rounded-lg p-3 space-y-2"
                        >
                          {addressFields.map((f) => (
                            <input
                              key={f.name}
                              placeholder={f.placeholder}
                              value={addressDraft[f.name] || ''}
                              onChange={(e) =>
                                setAddressDraft({
                                  ...addressDraft,
                                  [f.name]: e.target.value,
                                })
                              }
                              className={inputClass}
                            />
                          ))}
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => saveAddress(SingleAddy._id)}
                              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingAddressId(null)}
                              className="text-sm border border-gray-300 px-3 py-1.5 rounded-md text-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={SingleAddy._id}
                          className="border border-gray-200 rounded-lg p-3 flex items-start justify-between gap-3"
                        >
                          <div className="text-sm text-gray-700 space-y-0.5">
                            <p className="font-medium text-gray-900">
                              {SingleAddy.city}, {SingleAddy.country}
                            </p>
                            <p>{SingleAddy.address1}</p>
                            {SingleAddy.address2 && (
                              <p>{SingleAddy.address2}</p>
                            )}
                            <p>Pin Code: {SingleAddy.zipCode}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => startEditingAddress(SingleAddy)}
                              className="text-gray-400 hover:text-blue-600"
                              aria-label="Edit address"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAddy(SingleAddy._id)}
                              className="text-gray-400 hover:text-red-500"
                              aria-label="Delete address"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    )}
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

        {/* Wishlist Section */}
        <Card className="mt-6">
          <div className="flex items-center gap-3 mb-5">
            <IconWrapper>
              <Heart className="w-5 h-5 text-blue-600" />
            </IconWrapper>
            <h2 className="text-lg font-semibold text-gray-900">
              Your Wishlist
            </h2>
          </div>

          {wishlistProducts.length > 0 ? (
            <div className="space-y-3">
              {wishlistProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-3 border border-gray-200 rounded-lg p-3"
                >
                  <Link
                    to={`/product-details/${product._id}`}
                    className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 shrink-0"
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product-details/${product._id}`}
                      className="font-medium text-gray-900 hover:text-blue-600 truncate block"
                    >
                      {product.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                      ₹{product.discountedPrice}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="text-red-400 hover:text-red-600 shrink-0"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 italic">
              No items in your wishlist yet
            </span>
          )}
        </Card>
      </div>
    </div>
  );
}
