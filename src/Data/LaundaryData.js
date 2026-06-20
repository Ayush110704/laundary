// src/Data/LaundryData.js

// Import service background images
import laundryBg from '../assets/laundry.webp';
import dryCleanBg from '../assets/dryclean.webp';
import ironingBg from '../assets/ironing.webp';
// Import feature icons
import supportIcon from '../assets/customersupport.webp';
import deliveryIcon from '../assets/fastdelivery.webp';
import ecoIcon from '../assets/freshandechofriendly.webp';

// Feature items with image icons
export const features = [
  { icon: supportIcon, title: 'Customer Support', alt: 'Customer Support' },
  { icon: deliveryIcon, title: 'Super Fast Delivery', alt: 'Super Fast Delivery' },
  { icon: ecoIcon, title: 'Fresh & Eco-Friendly', alt: 'Fresh & Eco-Friendly' }
];

// Stats data
export const statsData = [
  { value: '4.0', suffix: 'L', label: 'SATISFIED CUSTOMERS', prefix: '' },
  { value: '30', suffix: '+', label: 'CITIES', prefix: '' },
  { value: '72', suffix: '+', label: 'STORES', prefix: '' },
  { value: '7.0', suffix: 'L', label: 'GARMENTS WASHED', prefix: '' }
];

// Services data with background images
export const allServices = [
  {
    id: 1,
    title: 'Laundry',
    description: 'Enjoy fresh, clean, folded laundry – more time for what matters most.',
    bgImage: laundryBg,
    icon: '🧺'
  },
  {
    id: 2,
    title: 'Dry Cleaning',
    description: 'Refresh your garments with our expert dry cleaning – book now!',
    bgImage: dryCleanBg,
    icon: '👔'
  },
  {
    id: 3,
    title: 'Ironing',
    description: 'Get wrinkle-free perfection – expert ironing that keeps you looking sharp!',
    bgImage: ironingBg,
    icon: '👗'
  },
  {
    id: 4,
    title: 'Wash & Fold',
    description: 'Convenient wash and fold service – save time and enjoy fresh clothes.',
    bgImage: laundryBg,
    icon: '🧦'
  },
  {
    id: 5,
    title: 'Steam Cleaning',
    description: 'Gentle steam cleaning for delicate fabrics – safe and effective.',
    bgImage: dryCleanBg,
    icon: '♨️'
  },
  {
    id: 6,
    title: 'Alterations',
    description: 'Professional alterations and repairs – perfect fit guaranteed.',
    bgImage: ironingBg,
    icon: '✂️'
  }
];

// How It Works steps data
export const howItWorksSteps = [
  {
    step: 'STEP 1',
    title: 'Place your order through App, Website or Call',
    icon: '📱'
  },
  {
    step: 'STEP 2',
    title: 'We pick your clothes in bag',
    icon: '🛍️'
  },
  {
    step: 'STEP 3',
    title: 'We clean your clothes in Laundromat',
    icon: '🧼'
  },
  {
    step: 'STEP 4',
    title: 'Track your Order anytime, anywhere',
    icon: '📍'
  },
  {
    step: 'STEP 5',
    title: 'We deliver fresh, clean, folded clothes',
    icon: '🚚'
  }
];

// Section text configurations
export const sectionTexts = {
  hero: {
    title: 'Premium Laundry & Dry Cleaning Services',
    badge: '✦ Authenura',
    subtitle: 'Trusted care for every garment — pickup, clean & deliver.'
  },
  nearYou: {
    text: 'Near You'
  },
  services: {
    heading: 'Our Services',
    subtitle: 'Discover All That Laundrywala Has to Offer – Tailored Cleaning Services for Your Wardrobe.',
    trustBadge: 'Trusted by Nearly 4 Lakhs Happy Customers – Choose us for Exceptional Care.'
  },
  howItWorks: {
    title: 'We Collect, Clean, and Deliver – Laundrywala Makes',
    highlight: 'Life Easier!',
    description: 'At Laundrywala, we offer reliable laundry and dry cleaning services designed to make your life easier. From careful garment handling to on-time delivery at your doorstep, we ensure your clothes are treated with the utmost care and professionalism. Experience the convenience of premium cleaning services with Laundrywala, where every detail is crafted around you.'
  },
  stats: {
    title: 'Trusted by thousands of people across the nation.'
  }
};

// Button texts
export const buttonTexts = {
  primary: 'Schedule Your Pickup',
  secondary: 'See Our Pricing'
};

// Colors
export const colors = {
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  navy: '#1A1A4E'
};