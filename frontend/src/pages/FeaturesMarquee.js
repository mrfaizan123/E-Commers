import React from 'react';
import { Truck, Shield, RotateCcw, Gift, Award, Clock, CreditCard } from 'lucide-react';

const FeaturesMarquee = () => {
  const features = [
    { icon: Truck, text: 'Free Shipping', subtext: 'On orders above ₹499' },
    { icon: Shield, text: '100% Authentic', subtext: 'Genuine products' },
    { icon: RotateCcw, text: '7 Days Return', subtext: 'Easy returns' },
    { icon: Gift, text: 'Free Gifts', subtext: 'On every order' },
    { icon: Award, text: 'Premium Quality', subtext: 'Certified products' },
    { icon: Clock, text: 'Fast Delivery', subtext: 'Within 3-5 days' },
    { icon: CreditCard, text: 'Secure Payment', subtext: '100% secure' }
  ];

  return (
    <section className="bg-white shadow-sm py-4 overflow-hidden">
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} />
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex">
          {features.map((feature, index) => (
            <FeatureItem key={`dup-${index}`} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ feature }) => {
  const Icon = feature.icon;
  
  return (
    <div className="inline-flex items-center space-x-3 mx-8">
      <Icon className="text-pink-600 flex-shrink-0" size={24} />
      <div>
        <p className="font-semibold text-gray-800 text-sm">{feature.text}</p>
        <p className="text-xs text-gray-500">{feature.subtext}</p>
      </div>
    </div>
  );
};

export default FeaturesMarquee;