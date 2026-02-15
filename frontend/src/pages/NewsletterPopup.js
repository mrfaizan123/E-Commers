import React, { useState } from 'react';
import { X, Mail, Gift, Percent, Sparkles, TrendingUp } from 'lucide-react';

const NewsletterPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ 
        type: 'error', 
        text: 'Please enter a valid email address' 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // API call to subscribe
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Thank you! Check your email for 10% off coupon!' 
        });
        setEmail('');
        
        // Track conversion
        if (window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            'event_category': 'engagement',
            'event_label': 'popup'
          });
        }

        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full relative animate-slideUp shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition z-10 bg-white/80 backdrop-blur-sm p-1 rounded-full"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <Mail size={36} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Get 10% OFF! 🎉
            </h2>
            <p className="text-gray-600 text-sm">
              Subscribe to our newsletter and get <span className="font-bold text-pink-600">10% off</span> on your first order + exclusive offers!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-pink-50 p-3 rounded-lg text-center">
              <Gift size={20} className="text-pink-600 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Welcome Gift</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <Percent size={20} className="text-purple-600 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Exclusive Deals</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <Sparkles size={20} className="text-blue-600 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">New Launches</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <TrendingUp size={20} className="text-green-600 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Beauty Tips</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
                disabled={isSubmitting}
              />
            </div>

            {message.text && (
              <div className={`text-sm text-center py-2 px-3 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition duration-300 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </span>
              ) : (
                'Get 10% Discount'
              )}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>

          <button 
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-600 block text-center mt-3 underline w-full"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;