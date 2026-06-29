import React ,{useState,useEffect}from 'react';
import {motion} from 'framer-motion';
import {ShoppingBag } from 'lucide-react';
import {getCheckoutData,saveCheckoutData,} from "../utils/checkoutStorage";
import AddressForm from './AddressForm';

const Address = () => {

    const [selectedAddress, setSelectedAddress] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    

     const initialAddresses = [
  {
    id: 1,
    type: "Home",
    name: "Address 1",
    phone: "+91 98765 43210",
    address:
      "House No. 24, Shankar Nagar, Raipur, Chhattisgarh - 492001",
    default: true,
  },
  {
    id: 2,
    type: "Work",
    name: "Address 2",
    phone: "+91 98765 43210",
    address:
      "Office No. 12, Civil Lines, Raipur, Chhattisgarh - 492001",
    default: false,
  },
];

const [addresses, setAddresses] = useState(initialAddresses);


useEffect(() => {
  const selected = addresses.find(
    (address) => address.id === selectedAddress
  );

  if (!selected) return;

  const checkout = getCheckoutData();

  checkout.address = selected;

  saveCheckoutData(checkout);

  console.log("Selected Address Saved:", checkout);
}, [selectedAddress, addresses]);

const handleSaveAddress = (newAddress) => {
  setAddresses((prev) => [...prev, newAddress]);
   setSelectedAddress(newAddress.id);
};

   



  return (
    <>

  {/* Left Section */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="lg:col-span-2"
  >
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 md:p-8">
     
     <div className='w-full flex justify-between items-center'>
      <div>
       <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
        Select Address
      </h2>

      <p className="text-gray-500 mt-2 text-sm md:text-base">
        Tell us what needs clinical-grade care today.
      </p>
      </div>
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
      onClick={() => setOpenModal(true)}
    className=" rounded-2xl border-2 b py-2 px-2 font-semibold text-blue-700 transition-all duration-500 hover:bg-blue-800 hover:text-white"
  >
    +  New Address
  </motion.button>
  <AddressForm
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  onSave={handleSaveAddress}
/>
  </div>
      {/* address div */}
    
<div className="mt-8 space-y-4">
  {addresses.map((item) => (
    <motion.div
      key={item.id}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => setSelectedAddress(item.id)}
      className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300
      ${
        selectedAddress === item.id
          ? "border-blue-700 bg-blue-50 shadow-lg"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 flex-1">
          {/* Radio */}
          <div className="mt-1">
            <div
              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all
              ${
                selectedAddress === item.id
                  ? "border-blue-700"
                  : "border-gray-300"
              }`}
            >
              {selectedAddress === item.id && (
                <div className="h-2.5 w-2.5 rounded-full bg-blue-700"></div>
              )}
            </div>
          </div>

          {/* Address Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.type}
              </h3>

              {item.default && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Default
                </span>
              )}
            </div>

            <p className="mt-2 font-medium text-gray-800">
              {item.name}
            </p>

            <p className="text-sm text-gray-600">
              {item.phone}
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {item.address}
            </p>
          </div>
        </div>

        {/* Selected Badge */}
        {selectedAddress === item.id && (
          <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
            Selected
          </span>
        )}
      </div>
    </motion.div>
  ))}
  </div>

    </div>
  </motion.div>
  </>
  )
}

export default Address