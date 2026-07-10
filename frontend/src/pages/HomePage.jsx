import { useEffect, useState } from 'react';
import Card from '../components/ProductCard/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HomePage() {
  const dataRedux = useSelector((state) => state.user);
  const [data, setdata] = useState();
  const fetchProduct = async () => {
    const response = await axios.get(
      'http://localhost:8080/product/get-products'
    );
    setdata(response.data.data);
    // console.log(response);
  };

  useEffect(() => {
    console.log('clicked');

    const callhandle = async () => {
      await fetchProduct();
    };
    callhandle();
  }, []);
  console.log(data);
  const handleDelete = async (id) => {
    console.log('id', id);
    const data = await axios.delete(`http://localhost:8080/product/${id}`);
    setdata(data.data.data);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Discover Our Products
          </h1>
          <p className="text-gray-500 mt-1">
            Fresh picks curated just for you
          </p>
        </div>

        {data === undefined ? (
          <div className="text-center text-gray-400 py-24">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-400 py-24">
            No products yet. Add your first product to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((ele, index) => (
              <Card
                key={ele._id}
                title={ele.title}
                image={ele.images[0] ? ele.images[0] : 'Product Image missing'}
                Index={index}
                description={ele.description}
                originalPrice={ele.originalPrice}
                discountedPrice={ele.discountedPrice}
                rating={ele.rating}
                id={ele._id}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;