import axios from 'axios';
import { useEffect, useState } from 'react';
import CartCard from '../components/ProductCard/CartCard';
import { useNavigate } from 'react-router-dom';
import { handlePay } from '../Utils/Razorpay';
export default function OrderConfirmation() {
  const [cartData, setUsersCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [userAddress, setAddress] = useState(
    JSON.parse(localStorage.getItem('address')) || {}
  );
  const navigate = useNavigate();
  // totoal
  // address
  // cart data
  useEffect(() => {
    const getCartData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return alert('Token is missing , Please login');
      }
      const response = await axios.get(
        `http://localhost:8080/cart/get-user-cart-data?token=${token}`
      );

      let sum = 0;
      response.data.cartData.forEach((ele, index) => {
        sum = sum + ele.productId.discountedPrice;
      });
      setTotal(sum);

      setUsersCartData(response.data.cartData);
    };

    getCartData();
  }, []);
  const OrderConfirmation = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('Token is missing please signup');
    }
    const response = await axios.post(
      `http://localhost:8080/orders/confirm-order?token=${token}`,
      {
        Items: cartData,
        address: userAddress,
        totalAmount: total,
      }
    );
    handlePay(total, token, cartData)
      .then((res) => {
        navigate('/order-history');
      })
      .catch((er) => console.log(er.message));

    console.log(response);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Order Confirmation
        </h1>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Delivery Address
            </h3>
            <button
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => navigate('/select-address')}
            >
              Change
            </button>
          </div>
          <div className="mt-3">
            <p className="font-medium text-gray-900 capitalize">
              {userAddress.addressType || 'Address'}
            </p>
            <div className="text-gray-600 text-sm mt-1">
              <p>{userAddress.address1}</p>
              {userAddress.address2 && <p>{userAddress.address2}</p>}
              <p>
                {userAddress.city}
                {userAddress.zipCode && `, ${userAddress.zipCode}`}
              </p>
              <p>{userAddress.country}</p>
            </div>
          </div>
        </div>

        {cartData &&
          cartData.map(({ productId }) => (
            <CartCard
              key={productId._id}
              title={productId.title}
              description={productId.description}
              createdBy={productId.userEmail}
              discountedPrice={productId.discountedPrice}
              images={productId.images}
              originalPrice={productId.originalPrice}
            />
          ))}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Order Total</p>
            <p className="text-xl font-bold text-gray-900">₹{total}</p>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200"
            onClick={OrderConfirmation}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}