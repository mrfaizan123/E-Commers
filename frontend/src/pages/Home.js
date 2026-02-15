import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { 
  ChevronLeft, ChevronRight, Star, Truck, Shield, RotateCcw, 
  Gift, Flame, TrendingUp, Clock, X, Mail, Gift as GiftIcon,
  Percent, Sparkles, CheckCircle, Heart, ShoppingBag, 
  Eye, Award, Zap, Leaf, Droplets, Users, ThumbsUp,
  Tag, AlertCircle, Info, ChevronDown, Menu, Search,
  User, ShoppingCart, Moon, Sun, Facebook, Instagram,
  Twitter, Youtube, Linkedin, MapPin, Phone, Clock as ClockIcon
} from 'lucide-react';

import { ChevronUp } from 'lucide-react';
// Lazy load non-critical components
const NewsletterPopup = lazy(() => import('./NewsletterPopup'));
const ProductCard = lazy(() => import('./ProductCard'));
const FeaturesMarquee = lazy(() => import('./FeaturesMarquee'));

// Custom hooks
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

const Home = () => {
  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('bestsellers');
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const [cart, setCart] = useLocalStorage('cart', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('recentlyViewed', []);
  
  // Hero Slider Images with optimized image sizes
  const heroSlides = useMemo(() => [
    {
      id: 1,
      title: "Buy 1 Get 1 Free",
      subtitle: "On All Vitamin C Products",
      description: "Limited time offer. Grab your favorites now!",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80",
      mobileImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
      bgColor: "from-pink-600 to-rose-600",
      offer: "BOGO",
      cta: "Shop Now",
      ctaLink: "/shop/vitamin-c"
    },
    {
      id: 2,
      title: "Flat 30% Off",
      subtitle: "On Top Selling Face Washes",
      description: "Best sellers at best prices. Offer ends soon!",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80",
      mobileImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
      bgColor: "from-purple-600 to-indigo-600",
      offer: "30% OFF",
      cta: "Shop Face Wash",
      ctaLink: "/shop/face-wash"
    },
    {
      id: 3,
      title: "Combo Offers",
      subtitle: "Hair Care Essentials",
      description: "Shampoo + Conditioner + Hair Mask at ₹999",
      image: "https://images.unsplash.com/photo-1526947425960-945c6e72858c?w=1200&q=80",
      mobileImage: "https://images.unsplash.com/photo-1526947425960-945c6e72858c?w=600&q=80",
      bgColor: "from-blue-600 to-cyan-600",
      offer: "Combo",
      cta: "View Combos",
      ctaLink: "/shop/combos"
    },
    {
      id: 4,
      title: "New Launches",
      subtitle: "Introducing GlowNatural Organics",
      description: "100% natural, toxin-free, and cruelty-free",
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80",
      mobileImage: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80",
      bgColor: "from-green-600 to-emerald-600",
      offer: "NEW",
      cta: "Explore Now",
      ctaLink: "/shop/new-launches"
    }
  ], []);

  // Products data with actual image URLs
  const products = useMemo(() => ({
    bestsellers: [
      {
        id: "vitamin-c-face-wash",
        name: "Vitamin C Face Wash",
        category: "Face",
        price: 349,
        originalPrice: 499,
        rating: 4.8,
        reviews: 12500,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&q=80",
        badge: { type: 'bestseller', text: 'Bestseller' },
        sold: 15000,
        inStock: true,
        discount: 30,
        tags: ['vitamin-c', 'face-wash', 'brightening']
      },
      {
        id: "onion-hair-oil",
        name: "Onion Hair Oil",
        category: "Hair",
        price: 499,
        originalPrice: 799,
        rating: 4.9,
        reviews: 10200,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
        badge: { type: 'hot', text: 'Hot' },
        sold: 12000,
        inStock: true,
        discount: 38,
        tags: ['hair-oil', 'onion', 'hair-growth']
      },
      {
        id: "matte-lipstick",
        name: "Matte Lipstick - Ruby Red",
        category: "Makeup",
        price: 299,
        originalPrice: 499,
        rating: 4.7,
        reviews: 8300,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
        badge: { type: 'trending', text: 'Trending' },
        sold: 9000,
        inStock: true,
        discount: 40,
        tags: ['lipstick', 'makeup', 'matte']
      },
      {
        id: "sunscreen-spf50",
        name: "Sunscreen SPF 50 PA+++",
        category: "Face",
        price: 399,
        originalPrice: 599,
        rating: 4.8,
        reviews: 7800,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&q=80",
        badge: { type: 'bestseller', text: 'Bestseller' },
        sold: 11000,
        inStock: true,
        discount: 33,
        tags: ['sunscreen', 'spf', 'face']
      },
      {
        id: "coffee-body-scrub",
        name: "Coffee Body Scrub",
        category: "Body",
        price: 449,
        originalPrice: 699,
        rating: 4.9,
        reviews: 6200,
        image: "https://images.unsplash.com/photo-1608248594873-8afa07c4b47f?w=400&q=80",
        badge: { type: 'hot', text: 'Hot' },
        sold: 8000,
        inStock: true,
        discount: 36,
        tags: ['body-scrub', 'coffee', 'exfoliator']
      },
      {
        id: "almond-oil",
        name: "Sweet Almond Oil",
        category: "Oil",
        price: 299,
        originalPrice: 449,
        rating: 4.8,
        reviews: 9100,
        image: "https://images.unsplash.com/photo-1608248594873-8afa07c4b47f?w=400&q=80",
        badge: { type: 'bestseller', text: 'Bestseller' },
        sold: 14000,
        inStock: true,
        discount: 33,
        tags: ['almond-oil', 'hair-oil', 'body-oil']
      }
    ],
    trending: [
      // Similar structure for trending products
    ],
    new: [
      // Similar structure for new arrivals
    ]
  }), []);

  // Limited Time Offers
  const limitedOffers = useMemo(() => [
    {
      title: "Flash Sale",
      discount: "40% Off",
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      products: "On Face Washes",
      bg: "from-red-600 to-pink-600",
      icon: Zap
    },
    {
      title: "Happy Hours",
      discount: "Buy 2 Get 1",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
      products: "On All Makeup",
      bg: "from-purple-600 to-indigo-600",
      icon: Gift
    },
    {
      title: "Weekend Special",
      discount: "Flat 30%",
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      products: "On Hair Care",
      bg: "from-green-600 to-teal-600",
      icon: Clock
    }
  ], []);

  // Categories data
  const categories = useMemo(() => [
    { id: 'face', name: 'Face', icon: '🧴', count: 45, color: 'from-pink-400 to-rose-400' },
    { id: 'hair', name: 'Hair', icon: '💇‍♀️', count: 32, color: 'from-purple-400 to-indigo-400' },
    { id: 'body', name: 'Body', icon: '🧖‍♀️', count: 28, color: 'from-green-400 to-teal-400' },
    { id: 'makeup', name: 'Makeup', icon: '💄', count: 56, color: 'from-red-400 to-pink-400' },
    { id: 'natural', name: 'Natural', icon: '🌿', count: 23, color: 'from-emerald-400 to-green-400' },
    { id: 'combos', name: 'Combos', icon: '🎁', count: 15, color: 'from-orange-400 to-amber-400' }
  ], []);

  // Auto slide effect with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Check for newsletter popup
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('glowNaturalPopupShown');
    const lastPopupTime = localStorage.getItem('lastPopupTime');
    const now = Date.now();
    
    // Show popup if not seen in last 7 days
    if (!hasSeenPopup || (lastPopupTime && now - parseInt(lastPopupTime) > 7 * 24 * 60 * 60 * 1000)) {
      const timer = setTimeout(() => {
        setShowNewsletter(true);
        localStorage.setItem('glowNaturalPopupShown', 'true');
        localStorage.setItem('lastPopupTime', now.toString());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Track recently viewed products
  const trackProductView = useCallback((productId) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  }, [setRecentlyViewed]);

  // Handle wishlist toggle
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  }, [setWishlist]);

  // Handle add to cart
  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
    
    // Show success notification
    // You can implement a toast notification here
  }, [setCart]);

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Countdown timer component
  const CountdownTimer = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
      const difference = new Date(endTime) - new Date();
      if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };
      
      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }, [endTime]);

    return (
      <div className="flex space-x-2">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[60px]">
            <span className="text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
            <span className="text-xs block capitalize">{unit}</span>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading GlowNatural...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-pink-600 text-white px-4 py-2 rounded-lg z-50">
        Skip to main content
      </a>

      {/* Newsletter Popup Modal with Lazy Loading */}
      {showNewsletter && (
        <Suspense fallback={null}>
          <NewsletterPopup onClose={() => setShowNewsletter(false)} />
        </Suspense>
      )}

      {/* Top Bar - Announcement */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 overflow-hidden">
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-4">🎉 Free Shipping on orders above ₹499</span>
            <span className="mx-4">✨ Buy 1 Get 1 Free on all Vitamin C products</span>
            <span className="mx-4">🎁 Free Gift with every order</span>
            <span className="mx-4">🌟 New customer? Get 10% off</span>
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
            <span className="mx-4">🎉 Free Shipping on orders above ₹499</span>
            <span className="mx-4">✨ Buy 1 Get 1 Free on all Vitamin C products</span>
            <span className="mx-4">🎁 Free Gift with every order</span>
            <span className="mx-4">🌟 New customer? Get 10% off</span>
          </div>
        </div>
      </div>

      {/* Header */}
      {/*  */}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileMenu(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-4 animate-slideInLeft">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setShowMobileMenu(false)}>
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-4">
              <a href="/shop" className="block text-gray-700 hover:text-pink-600">Shop</a>
              <a href="/new" className="block text-gray-700 hover:text-pink-600">New</a>
              <a href="/bestsellers" className="block text-gray-700 hover:text-pink-600">Bestsellers</a>
              <a href="/offers" className="block text-gray-700 hover:text-pink-600">Offers</a>
              <a href="/blog" className="block text-gray-700 hover:text-pink-600">Blog</a>
              <hr className="my-4" />
              <a href="/account" className="block text-gray-700 hover:text-pink-600">My Account</a>
              <a href="/orders" className="block text-gray-700 hover:text-pink-600">Orders</a>
              <a href="/wishlist" className="block text-gray-700 hover:text-pink-600">Wishlist</a>
            </nav>
          </div>
        </div>
      )}

      <main id="main-content">
        {/* Hero Slider Section */}
        <section className="relative h-[500px] lg:h-[600px] overflow-hidden" aria-label="Hero Slider">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-hidden={index !== currentSlide}
            >
              {/* Responsive Image */}
              <picture>
                <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </picture>
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-90`}></div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
                <div className="text-white max-w-2xl animate-fadeInUp">
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <span className="text-sm font-semibold">{slide.offer}</span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                  <h2 className="text-2xl lg:text-4xl font-light mb-4">{slide.subtitle}</h2>
                  <p className="text-lg mb-8 text-white/90">{slide.description}</p>
                  
                  <a 
                    href={slide.ctaLink}
                    className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition duration-300"
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Features Bar with Lazy Loading */}
        <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse" />}>
          <FeaturesMarquee />
        </Suspense>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Shop by Category
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our wide range of natural and organic beauty products
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-center transform hover:scale-105 transition duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
                  <div className="relative z-10">
                    <span className="text-4xl mb-2 block">{category.icon}</span>
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.count} Products</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* BOGO Offers Section */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center mb-2">
                  <Gift className="text-pink-600 mr-3" size={36} />
                  Buy 1 Get 1 Free
                </h2>
                <p className="text-gray-600">Limited time offers. Grab before they're gone!</p>
              </div>
              <a href="/offers/bogo" className="mt-4 md:mt-0 inline-flex items-center text-pink-600 font-semibold hover:underline group">
                View All Offers
                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition" />
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {products.bestsellers.slice(0, 4).map((product) => (
                <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
                  <ProductCard
                    product={product}
                    onWishlist={toggleWishlist}
                    onAddToCart={addToCart}
                    onView={trackProductView}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                </Suspense>
              ))}
            </div>
          </div>
        </section>

        {/* Top Selling Products */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center mb-2">
                  <Flame className="text-orange-500 mr-3" size={36} />
                  Top Selling Products
                </h2>
                <p className="text-gray-600">Most loved by our customers</p>
              </div>
              
              {/* Tabs */}
              <div className="mt-4 md:mt-0 flex space-x-2 bg-gray-100 p-1 rounded-full">
                {['bestsellers', 'trending', 'new'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition ${
                      activeTab === tab
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {products[activeTab]?.map((product) => (
                <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
                  <ProductCard
                    product={product}
                    onWishlist={toggleWishlist}
                    onAddToCart={addToCart}
                    onView={trackProductView}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                </Suspense>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <a 
                href={`/shop/${activeTab}`}
                className="inline-flex items-center bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition transform hover:scale-105"
              >
                View All {activeTab}
                <ChevronRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </section>

        {/* Limited Time Offers with Countdown */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center justify-center">
                <Clock className="mr-3" size={36} />
                Limited Time Offers
              </h2>
              <p className="text-gray-300">Hurry! These offers won't last long</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {limitedOffers.map((offer, index) => {
                const Icon = offer.icon;
                return (
                  <div key={index} className={`bg-gradient-to-r ${offer.bg} rounded-2xl p-8 text-white transform hover:scale-105 transition duration-300`}>
                    <Icon size={40} className="mb-4" />
                    <p className="text-sm opacity-90">{offer.title}</p>
                    <h3 className="text-3xl font-bold mt-2">{offer.discount}</h3>
                    <p className="mt-1 text-lg">{offer.products}</p>
                    
                    <div className="mt-6">
                      <p className="text-sm mb-3">Ends in:</p>
                      <CountdownTimer endTime={offer.endTime} />
                    </div>

                    <a 
                      href="/offers"
                      className="inline-block mt-6 bg-white text-gray-900 px-6 py-3 rounded-lg text-sm font-semibold hover:shadow-lg transition transform hover:translate-x-2"
                    >
                      Grab Offer →
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brand Promise Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Why Choose GlowNatural?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to providing you with the best natural beauty products
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Leaf, title: "100% Natural", desc: "All ingredients are natural and organic" },
                { icon: Droplets, title: "Cruelty Free", desc: "Never tested on animals" },
                { icon: Users, title: "Happy Customers", desc: "Over 1M+ satisfied customers" },
                { icon: Award, title: "Premium Quality", desc: "Highest quality standards" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                    <item.icon size={32} className="text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Feed Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Follow Us on Instagram
              </h2>
              <p className="text-gray-600">@glownatural</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <a
                  key={item}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${1600000000000 + item}?w=300&q=80`}
                    alt={`Instagram post ${item}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Instagram size={24} className="text-white" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Recently Viewed
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {recentlyViewed.slice(0, 5).map((productId) => {
                  const product = Object.values(products)
                    .flat()
                    .find(p => p.id === productId);
                  
                  if (!product) return null;

                  return (
                    <Suspense key={productId} fallback={<ProductCardSkeleton />}>
                      <ProductCard
                        product={product}
                        onWishlist={toggleWishlist}
                        onAddToCart={addToCart}
                        onView={trackProductView}
                        isWishlisted={wishlist.includes(product.id)}
                      />
                    </Suspense>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Get 10% off on your first order and exclusive offers
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-800"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>

            <p className="text-sm opacity-75 mt-4">
              By subscribing, you agree to our Privacy Policy
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* About */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">GlowNatural</h3>
              <p className="text-gray-400 mb-4">
                Your one-stop destination for natural and organic beauty products. 
                We bring you the best of nature with the promise of quality and authenticity.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-pink-400 transition">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-pink-400 transition">
                  <Instagram size={20} />
                </a>
                <a href="#" className="hover:text-pink-400 transition">
                  <Twitter size={20} />
                </a>
                <a href="#" className="hover:text-pink-400 transition">
                  <Youtube size={20} />
                </a>
                <a href="#" className="hover:text-pink-400 transition">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="/faq" className="text-gray-400 hover:text-white transition">FAQs</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-white transition">Careers</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="/category/face" className="text-gray-400 hover:text-white transition">Face</a></li>
                <li><a href="/category/hair" className="text-gray-400 hover:text-white transition">Hair</a></li>
                <li><a href="/category/body" className="text-gray-400 hover:text-white transition">Body</a></li>
                <li><a href="/category/makeup" className="text-gray-400 hover:text-white transition">Makeup</a></li>
                <li><a href="/category/natural" className="text-gray-400 hover:text-white transition">Natural</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">123, Beauty Street, Mumbai - 400001</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="text-gray-400" />
                  <span className="text-gray-400">+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="text-gray-400" />
                  <span className="text-gray-400">support@glownatural.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ClockIcon size={18} className="text-gray-400" />
                  <span className="text-gray-400">Mon-Sat: 9AM - 8PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
              © 2024 GlowNatural. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
              <a href="/shipping" className="text-gray-400 hover:text-white text-sm transition">Shipping Policy</a>
              <a href="/returns" className="text-gray-400 hover:text-white text-sm transition">Returns</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
};

// Skeleton Loader for Product Card
const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 aspect-square rounded-xl mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
  </div>
);

// Missing ChevronUp import


export default Home;