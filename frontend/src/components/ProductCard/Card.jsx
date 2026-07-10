import axios from 'axios';
import { Link } from 'react-router-dom';
import { Star, Trash2 } from 'lucide-react';

function Card({
  title,
  image,
  description,
  discountedPrice,
  originalPrice,
  rating,
  id,
  handleDelete,
}) {
  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `http://localhost:8080/cart/add-to-cart?token=${token}`,
        { productId: id, quantity: 1 }
      );
      alert('Product Added To Cart Successfully...');
    } catch (er) {
      alert(er.response?.data?.message || er.message);
      console.log(er.message);
    }
  };

  const discountPercent =
    originalPrice > 0
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <Link to={`/product-details/${id}`} className="relative block">
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img
            src={image}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            alt={title || 'Product Image missing'}
          />
        </div>
        {discountPercent > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
            -{discountPercent}%
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-gray-900 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm text-gray-600">{rating}</span>
        </div>

        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{discountedPrice}
          </span>
          {discountPercent > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors duration-200"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <Link to={`/update-form/${id}`}>
            <button className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-600 text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200">
              Update
            </button>
          </Link>
          <button
            className="border border-gray-300 hover:border-red-500 hover:text-red-500 text-gray-500 p-2 rounded-lg transition-colors duration-200"
            onClick={() => handleDelete(id)}
            aria-label="Delete product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
