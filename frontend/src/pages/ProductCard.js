import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

const ProductCard = ({ 
  product, 
  onWishlist, 
  onAddToCart, 
  onView,
  isWishlisted 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    id,
    name,
    category,
    price,
    originalPrice,
    rating,
    reviews,
    image,
    badge,
    discount,
    inStock
  } = product;

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    onWishlist(id);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    onView(id);
    // Open quick view modal
  };

  return (
    <div 
      className="group cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={`/product/${id}`} className="block">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl mb-3 transform group-hover:scale-105 transition duration-300 overflow-hidden">
          {/* Image with loading skeleton */}
          <div className="aspect-square relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
            )}
            <img
              src={image}
              alt={name}
              className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>
          
          {/* Badge */}
          {badge && (
            <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full z-10 ${
              badge.type === 'bestseller' ? 'bg-green-500 text-white' :
              badge.type === 'hot' ? 'bg-orange-500 text-white' :
              badge.type === 'trending' ? 'bg-blue-500 text-white' :
              'bg-purple-500 text-white'
            }`}>
              {badge.text}
            </span>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}

          {/* Quick Actions - Visible on Hover */}
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <button
              onClick={handleQuickView}
              className="bg-white p-2 rounded-full hover:bg-pink-600 hover:text-white transition"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={handleWishlist}
              className={`bg-white p-2 rounded-full hover:bg-pink-600 hover:text-white transition ${
                isWishlisted ? 'text-pink-600' : ''
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{name}</h3>
        <p className="text-xs text-gray-500 mt-1">{category}</p>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs font-medium ml-1">{rating}</span>
          <span className="text-xs text-gray-400 ml-1">({(reviews / 1000).toFixed(1)}k)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="font-bold text-pink-600">₹{price}</span>
            {originalPrice > price && (
              <span className="text-xs text-gray-400 line-through ml-2">₹{originalPrice}</span>
            )}
          </div>
          
          {/* Stock Status */}
          {inStock ? (
            <button
              onClick={handleAddToCart}
              className="bg-pink-600 text-white p-1.5 rounded-full hover:bg-pink-700 transition transform hover:scale-110"
              aria-label="Add to cart"
            >
              <ShoppingBag size={14} />
            </button>
          ) : (
            <span className="text-xs text-red-500">Out of Stock</span>
          )}
        </div>

        {/* Sold Count */}
        {product.sold && (
          <p className="text-xs text-green-600 mt-1">{product.sold.toLocaleString()}+ sold</p>
        )}
      </a>
    </div>
  );
};

export default ProductCard;