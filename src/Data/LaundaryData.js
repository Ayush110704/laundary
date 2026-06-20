

 

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
 
export const faqData = [
  {
    id: 1,
    category: "Booking",
    question: "Why is Laundrywala the best laundry and dry cleaner?",
    answer:
      "Laundrywala offers premium laundry and dry cleaning services with doorstep pickup and delivery, quality care, affordable pricing, and eco-friendly cleaning methods."
  },
  {
    id: 2,
    category: "Booking",
    question: "How do I place an order?",
    answer:
      "You can schedule a pickup through our website, mobile app, or by contacting customer support."
  },
  {
    id: 3,
    category: "Booking",
    question: "Can I schedule pickup for a specific time?",
    answer:
      "Yes, you can choose a convenient pickup slot based on availability in your area."
  },
  {
    id: 4,
    category: "Services",
    question: "Do you provide dry cleaning services?",
    answer:
      "Yes, we provide professional dry cleaning for suits, dresses, wedding wear, delicate fabrics, and premium garments."
  },
  {
    id: 5,
    category: "Services",
    question: "Do you provide shoe cleaning services?",
    answer:
      "Yes, we clean sneakers, leather shoes, suede shoes, sports shoes, and more."
  },
  {
    id: 6,
    category: "Services",
    question: "What types of clothes can be cleaned?",
    answer:
      "We clean everyday wear, office wear, ethnic wear, winter garments, delicate fabrics, and household items."
  },
  {
    id: 7,
    category: "Delivery",
    question: "How long does the cleaning process take?",
    answer:
      "Most orders are completed within 24–48 hours depending on garment type and service selected."
  },
  {
    id: 8,
    category: "Delivery",
    question: "Do you provide free pickup and delivery?",
    answer:
      "Yes, free pickup and delivery are available for eligible orders and locations."
  },
  {
    id: 9,
    category: "Delivery",
    question: "Can I track my order?",
    answer:
      "Yes, order tracking is available through the website and mobile app."
  },
  {
    id: 10,
    category: "Pricing",
    question: "How are laundry prices calculated?",
    answer:
      "Pricing depends on garment type, service selected, quantity, and special cleaning requirements."
  },
  {
    id: 11,
    category: "Pricing",
    question: "Are there any membership benefits?",
    answer:
      "Yes, members receive discounts, exclusive offers, and priority services."
  },
  {
    id: 12,
    category: "General",
    question: "Do you have a mobile application?",
    answer:
      "Yes, our mobile app is available for Android and iOS devices."
  },
  {
    id: 13,
    category: "General",
    question: "What if my garment gets damaged?",
    answer:
      "We follow strict quality standards. In rare cases, our support team reviews the issue according to company policies."
  }
];

export const serviceFaqs = [
  {
    keyword: "laundry",
    question: "What is included in Laundry Service?",
    answer:
      "Our laundry service includes washing, drying, folding, stain treatment, and quality inspection."
  },

  {
    keyword: "dry cleaning",
    question: "What garments are suitable for Dry Cleaning?",
    answer:
      "Suits, blazers, sarees, lehengas, coats, silk garments, and delicate fabrics are best suited for dry cleaning."
  },

  {
    keyword: "ironing",
    question: "Do you provide professional Ironing Services?",
    answer:
      "Yes, we provide steam ironing and professional pressing for all types of garments."
  },

  {
    keyword: "wash and fold",
    question: "What is Wash & Fold Service?",
    answer:
      "Clothes are washed, dried, neatly folded, and packed for delivery without ironing."
  },

  {
    keyword: "steam cleaning",
    question: "What is Steam Cleaning?",
    answer:
      "Steam cleaning removes bacteria, odors, and wrinkles using high-temperature steam without damaging fabrics."
  },

  {
    keyword: "alterations",
    question: "Do you provide Clothing Alteration Services?",
    answer:
      "Yes, we provide hemming, resizing, fitting adjustments, zipper replacement, and other tailoring services."
  }
]; 

