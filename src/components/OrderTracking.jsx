import { Check } from "lucide-react";

export default function OrderTracking() {
  const order = {
    id: "ATH-29482",
    orderDate: "24 June 2026",
    deliveryDate: "26 June 2026",

    status: 3,

    items: [
      "3 Shirts",
      "2 Trousers",
      "1 Bedsheet",
      "1 Curtain",
    ],
  };

  const steps = [
    "Order Placed",
    "Pickup Complete",
    "Washing",
    "Ironing",
    "Out For Delivery",
    "Delivered",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-5">

        <div>

          <p className="text-gray-500 text-sm">
            ORDER ID
          </p>

          <h2 className="text-2xl font-bold text-blue-950">
            {order.id}
          </h2>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            ORDER DATE
          </p>

          <h3 className="font-semibold">
            {order.orderDate}
          </h3>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            ESTIMATED DELIVERY
          </p>

          <h3 className="font-semibold text-green-600">
            {order.deliveryDate}
          </h3>

        </div>

      </div>

      {/* Timeline */}

      <div className="mt-16 relative">

        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full" />

        <div
          className="absolute top-5 left-0 h-1 bg-blue-700 rounded-full transition-all duration-700"
          style={{
            width: `${
              (order.status /
                (steps.length - 1)) *
              100
            }%`,
          }}
        />

        <div className="flex justify-between relative">

          {steps.map((step, index) => (

            <div
              key={index}
              className="flex flex-col items-center flex-1"
            >

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center z-10

                ${
                  index <= order.status
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-500"
                }
                
                `}
              >

                {index <= order.status ? (
                  <Check size={20} />
                ) : (
                  index + 1
                )}

              </div>

              <p
                className={`text-sm text-center mt-4 font-medium

                ${
                  index <= order.status
                    ? "text-blue-900"
                    : "text-gray-500"
                }
                
                `}
              >

                {step}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Items */}

      <div className="mt-16">

        <h3 className="font-bold text-lg mb-4">
          Laundry Items
        </h3>

        <div className="flex flex-wrap gap-3">

          {order.items.map((item, index) => (

            <div
              key={index}
              className="bg-blue-50 text-blue-900 px-4 py-2 rounded-full"
            >

              {item}

            </div>

          ))}

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-10 flex gap-4">

        <button className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 duration-300">

          View Details

        </button>

        <button className="border border-blue-700 text-blue-700 px-6 py-3 rounded-xl hover:bg-blue-50 duration-300">

          Download Invoice

        </button>

      </div>

    </div>
  );
}