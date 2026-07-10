import { Link } from 'react-router-dom';
import { X, RotateCcw, PackageCheck } from 'lucide-react';

const statusStyles = {
  Processing: 'bg-blue-100 text-blue-800',
  Shipped: 'bg-amber-100 text-amber-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export default function CartCard({
  title,
  images,
  Index,
  description,
  originalPrice,
  discountedPrice,
  rating,
  id,
  createdBy,
  orderStatus,
  handleCancel,
  handleMarkDelivered,
}) {
  const discountPercent =
    originalPrice > 0
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  const canMarkDelivered =
    orderStatus && orderStatus !== 'Delivered' && orderStatus !== 'Cancelled';

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      {orderStatus && (
        <div className="flex items-center justify-between mb-4">
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              statusStyles[orderStatus] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {orderStatus}
          </div>
          {canMarkDelivered && (
            <button
              onClick={() => handleMarkDelivered(id)}
              className="flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800"
            >
              <PackageCheck className="w-4 h-4" />
              Mark as Delivered
            </button>
          )}
        </div>
      )}
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="relative w-32 sm:w-48 shrink-0">
          <Link to={`/product-details/${id}`}>
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={
                  typeof images == 'string'
                    ? images
                    : images?.[0] || 'Product Image missing'
                }
                alt={title || 'Product Image'}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {title}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                {description}
              </p>
              {createdBy && (
                <p className="text-xs text-gray-400 mt-1">
                  Sold by: {createdBy}
                </p>
              )}
            </div>

            {orderStatus && (
              <button
                className="text-gray-400 hover:text-gray-600 shrink-0"
                onClick={() => handleCancel(id)}
                aria-label="Cancel order"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Price Information */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900">
              ₹{discountedPrice}
            </span>
            {discountPercent > 0 && (
              <>
                <span className="text-gray-400 line-through text-sm">
                  ₹{originalPrice}
                </span>
                <span className="text-red-500 text-sm font-medium">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Return Policy */}
          <div className="mt-3 flex items-center gap-2 text-gray-500 text-sm">
            <RotateCcw className="w-4 h-4" />
            <span>14 days return available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
