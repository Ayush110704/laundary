import React , {useState , useEffect} from 'react'
import {Sun,SunMedium,Moon,CircleCheckBig,CalendarDays, ChevronLeft, ChevronRight} from 'lucide-react'
import {motion} from 'framer-motion'
import {getCheckoutData,saveCheckoutData,} from "../utils/checkoutStorage";

const Schedule = () => {

// const [date, setDate] = useState(new Date());
const [selectedSlot, setSelectedSlot] = useState("");
 const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    return start;
  });

   const [selected, setSelected] = useState(new Date());
   

    const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });

  const changeWeek = (direction) => {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + direction * 7);
    setStartDate(newDate);
  };

useEffect(() => {
  console.log("useEffect is running");

  const checkout = getCheckoutData();
  console.log("Before Update:", checkout);

  checkout.schedule = {
    date: selected.toISOString(),
    time: selectedSlot,
  };

  console.log("After Update:", checkout);

  saveCheckoutData(checkout);

  console.log("Saved to localStorage");
}, [selected, selectedSlot]);

useEffect(() => {
  console.log("selectedSlot changed:", selectedSlot);
}, [selectedSlot]);


 const slots = [
  {
    id: 1,
    title: "Morning",
    time: "8 AM - 11 AM",
    icon: Sun,
  },
  {
    id: 2,
    title: "Afternoon",
    time: "1 PM - 4 PM",
    icon: SunMedium,
  },
  {
    id: 3,
    title: "Night",
    time: "6 PM - 9 PM",
    icon: Moon,
  },
];

  return (
    <>
     <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-5">
            Schedule Pickup
          </h2>

           <div className="w-full max-w-5xl bg-blue-50 mx-auto  rounded-2xl  shadow-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-blue-700" />
          <h2 className="text-xl md:text-2xl font-bold">Select Date</h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => changeWeek(-1)}
            className="p-2 border rounded-lg hover:bg-blue-50"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => changeWeek(1)}
            className="p-2 border rounded-lg hover:bg-blue-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day,index) => (
          <div
             key={`${day}-${index}`}
            className="text-center text-xs md:text-sm font-semibold text-gray-500"
          >
            {day}
          </div>
        ))}

        {days.map((date, index) => {
          const isSelected =
            selected.toDateString() === date.toDateString();

          const isCurrentMonth =
            date.getMonth() === new Date().getMonth();

          return (
            <button
              key={index}
              onClick={() => setSelected(date)}
              className={`py-3 px-2 rounded-xl flex items-center justify-center font-medium transition-all duration-300
                ${
                  isSelected
                    ? " bg-blue-800 text-white  font-bold"
                    : isCurrentMonth
                    ? "text-gray-800 hover:bg-blue-50"
                    : "text-gray-300 hover:bg-gray-100"
                }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>

          <h3 className="font-semibold mt-8 mb-4">
            Select Time Slot
          </h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
  {slots.map((slot) => {
    const Icon = slot.icon;

    return (
      <button
        key={slot.id}
        onClick={() => {
          console.log("Clicked:", slot.time);
          setSelectedSlot(slot.time)}
        }
        className={`relative p-5 rounded-2xl border text-left transition-all duration-300 hover:scale-105
          ${
            selectedSlot === slot.time
              ? "bg-blue-900 text-white border-blue-900"
              : "bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100"
          }`}
      >
        {/* Selection Icon */}
        <div className="absolute top-3 right-3">
          <CircleCheckBig
            size={22}
            className={
              selectedSlot === slot.time
                ? "text-white"
                : "text-gray-300"
            }
          />
        </div>

        <Icon className="h-8 w-8 mb-3" />

        <h3 className="font-semibold text-lg">
          {slot.title}
        </h3>

        <p
          className={`text-sm mt-1 ${
            selectedSlot === slot.time
              ? "text-blue-100"
              : "text-gray-600"
          }`}
        >
          {slot.time}
        </p>
      </button>
    );
  })}
</div>
        </motion.div>
    
    </>
  )
}

export default Schedule