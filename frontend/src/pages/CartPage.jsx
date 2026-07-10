import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartCard from '../components/ProductCard/CartCard';
import { Link } from 'react-router-dom';
function CardPage() {
  const [UsersCartData, setUsersCartData] = useState([]);
  useEffect(() => {
    const getCartData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return alert('Token is missing , Please login');
      }
      const response = await axios.get(
        `http://localhost:8080/cart/get-user-cart-data?token=${token}`
      );
      console.log(response);
      setUsersCartData(response.data.cartData);
    };

    getCartData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          {UsersCartData.length > 0 && (
            <Link to={`/select-address`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200">
                Checkout
              </button>
            </Link>
          )}
        </div>

        {UsersCartData.length > 0 ? (
          UsersCartData.map((singleCartObject) => (
            <CartCard
              key={singleCartObject._id}
              title={singleCartObject.productId.title}
              images={
                singleCartObject.productId.images[0] ||
                'Product Image missing'
              }
              description={singleCartObject.productId.description}
              originalPrice={singleCartObject.productId.originalPrice}
              discountedPrice={singleCartObject.productId.discountedPrice}
              id={singleCartObject.productId._id}
              createdBy={singleCartObject.productId.userEmail}
            />
          ))
        ) : (
          <div className="flex justify-center items-center py-24">
            <h1 className="text-gray-400 text-lg">Your cart is empty</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardPage;