import axios from 'axios';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageModal from '../components/ImageModal/ImageModal';

function SinglePageProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // get the single product data
    console.log('here....');
    const getProductSingleDetails = async () => {
      const response = await axios.get(
        `http://localhost:8080/product/get-single/${id}`
      );
      console.log(response);
      setProduct(response.data.data);
    };
    getProductSingleDetails();

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(id));
  }, [id]);

  const handleAddToCart = async () => {
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

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updated = isWishlisted
      ? wishlist.filter((pid) => pid !== id)
      : [...wishlist, id];
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setIsWishlisted(!isWishlisted);
  };

  const discountPercent =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.discountedPrice) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {product?.images?.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(idx);
                    setShowImageModal(true);
                  }}
                  className="aspect-[3/4] relative group overflow-hidden rounded-lg bg-white"
                >
                  <img
                    src={image}
                    alt={`${product.title} - view ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.title}
              </h1>
              {product.category && (
                <span className="inline-block mt-2 text-xs font-medium uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {product.category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                <span className="font-semibold">{product.rating}</span>
                <Star className="w-4 h-4 fill-green-700 text-green-700" />
              </div>
              {product.quantity > 0 ? (
                <span className="text-sm text-green-600">In stock</span>
              ) : (
                <span className="text-sm text-red-500">Out of stock</span>
              )}
            </div>

            <div className="border-t border-b py-4 space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-bold">
                  ₹{product.discountedPrice}
                </span>
                {discountPercent > 0 && (
                  <>
                    <span className="text-gray-500 line-through">
                      MRP ₹{product.originalPrice}
                    </span>
                    <span className="text-orange-500">
                      ({discountPercent}% OFF)
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-600 text-sm">inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Product Details
              </h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <ShoppingBag className="w-5 h-5" />
                ADD TO CART
              </button>
              <button
                onClick={toggleWishlist}
                className={`flex-1 border py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200 ${
                  isWishlisted
                    ? 'border-red-300 bg-red-50 text-red-500'
                    : 'border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-500'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`}
                />
                {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
              </button>
            </div>

            {/* Delivery Options */}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <ImageModal
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setShowImageModal={setShowImageModal}
        />
      )}
    </div>
  );
}

export default SinglePageProduct;
