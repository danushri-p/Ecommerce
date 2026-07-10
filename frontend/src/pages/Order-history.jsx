import axios from 'axios';
import { useEffect, useState } from 'react';
import CartCard from '../components/ProductCard/CartCard';

function OrderHistory() {
  const [OrderedData, SetOrderedData] = useState([]);
  const fetchedOrderedProducts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('Token is missing , Please login');
    }
    const response = await axios.get(
      `http://localhost:8080/orders/user-orders-data?token=${token}`
    );
    const reversedData = response.data.orders?.reverse();

    console.log(response.data.orders);
    SetOrderedData(reversedData);
  };
  useEffect(() => {
    fetchedOrderedProducts();
  }, []);
  const handleCancel = async (id) => {
    console.log(id);
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('Token is missing , Please login');
    }
    await axios.patch(
      `http://localhost:8080/orders/cancel-order?token=${token}&orderId=${id}`
    );
    fetchedOrderedProducts();
  };
  const handleMarkDelivered = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('Token is missing , Please login');
    }
    await axios.patch(
      `http://localhost:8080/orders/mark-delivered?token=${token}&orderId=${id}`
    );
    fetchedOrderedProducts();
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>

        {OrderedData?.length > 0 ? (
          OrderedData.map((singleCartObject, index) => {
            if (!singleCartObject.orderItems) {
              return (
                <div
                  key={singleCartObject._id || index}
                  className="p-4 text-gray-500 italic bg-white rounded-xl border border-gray-100 mb-4"
                >
                  This product is no longer available
                </div>
              );
            }
            return (
              <CartCard
                key={singleCartObject._id}
                title={singleCartObject.orderItems.title}
                images={singleCartObject.orderItems.images[0]}
                description={singleCartObject.orderItems.description}
                originalPrice={singleCartObject.orderItems.originalPrice}
                discountedPrice={singleCartObject.orderItems.discountedPrice}
                id={singleCartObject._id}
                orderStatus={singleCartObject.orderStatus}
                createdBy={singleCartObject.orderItems.userEmail}
                handleCancel={handleCancel}
                handleMarkDelivered={handleMarkDelivered}
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center py-24">
            <h1 className="text-gray-400 text-lg">No orders yet</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;