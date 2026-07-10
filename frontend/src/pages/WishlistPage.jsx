import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';

function WishlistPage() {
  const [products, setProducts] = useState(null);

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
    setProducts(results.filter(Boolean));
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeFromWishlist = (id) => {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updated = wishlistIds.filter((pid) => pid !== id);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `http://localhost:8080/cart/add-to-cart?token=${token}`,
        { productId: id, quantity: 1 }
      );
      alert('Product Added To Cart Successfully...');
    } catch (er) {
      alert(er.response?.data?.message || er.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Wishlist</h1>
          <p className="text-gray-500 mt-1">Products you've saved for later</p>
        </div>

        {products === null ? (
          <div className="text-center text-gray-400 py-24">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-400 py-24">
            Your wishlist is empty. Tap the heart icon on any product to save
            it here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const discountPercent =
                product.originalPrice > 0
                  ? Math.round(
                      ((product.originalPrice - product.discountedPrice) /
                        product.originalPrice) *
                        100
                    )
                  : 0;
              return (
                <div
                  key={product._id}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                >
                  <Link
                    to={`/product-details/${product._id}`}
                    className="relative block"
                  >
                    <div className="aspect-square bg-gray-50 overflow-hidden">
                      <img
                        src={product.images?.[0]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={product.title}
                      />
                    </div>
                    {discountPercent > 0 && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                        -{discountPercent}%
                      </span>
                    )}
                  </Link>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-baseline gap-2 mt-3">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.discountedPrice}
                      </span>
                      {discountPercent > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5"
                        onClick={() => handleAddToCart(product._id)}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add to cart
                      </button>
                      <button
                        className="border border-gray-300 hover:border-red-500 hover:text-red-500 text-gray-500 p-2 rounded-lg transition-colors duration-200"
                        onClick={() => removeFromWishlist(product._id)}
                        aria-label="Remove from wishlist"
                      >
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
