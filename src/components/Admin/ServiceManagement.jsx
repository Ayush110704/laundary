import React, { useState, useEffect } from "react";

import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Package,
  IndianRupee,
  Clock,
  CheckCircle,
  XCircle,
  Shirt,
  Sofa,
  BrushCleaning,
} from "lucide-react";


// ======================================================
// MOCK SERVICES DATA
// ======================================================

const MOCK_SERVICES = [
  {
    id: "SRV001",
    name: "Laundry",
    category: "Clothes",
    price: 120,
    duration: "24 Hours",
    status: "Active",
    description:
      "Professional wash, dry and fold service for everyday clothes.",
    createdDate: "2026-06-20",
  },

  {
    id: "SRV002",
    name: "Dry Cleaning",
    category: "Premium",
    price: 250,
    duration: "48 Hours",
    status: "Active",
    description:
      "Premium dry cleaning for delicate garments.",
    createdDate: "2026-06-19",
  },

  {
    id: "SRV003",
    name: "Ironing",
    category: "Clothes",
    price: 80,
    duration: "12 Hours",
    status: "Active",
    description:
      "Steam ironing for wrinkle free clothes.",
    createdDate: "2026-06-18",
  },

  {
    id: "SRV004",
    name: "Carpet Cleaning",
    category: "Home Care",
    price: 650,
    duration: "72 Hours",
    status: "Active",
    description:
      "Deep carpet cleaning with stain removal.",
    createdDate: "2026-06-17",
  },

  {
    id: "SRV005",
    name: "Curtain Cleaning",
    category: "Home Care",
    price: 550,
    duration: "48 Hours",
    status: "Inactive",
    description:
      "Dust removal and deep cleaning for curtains.",
    createdDate: "2026-06-16",
  },

  {
    id: "SRV006",
    name: "Shoe Cleaning",
    category: "Accessories",
    price: 300,
    duration: "24 Hours",
    status: "Active",
    description:
      "Premium shoe cleaning and polishing.",
    createdDate: "2026-06-15",
  },


];


// ======================================================
// DETAIL VIEW COMPONENT
// ======================================================

function ServiceDetail({ service, onBack }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 mb-6"
      >
        <ChevronLeft className="w-5 h-5" />

        Back
      </button>

      <h1 className="text-3xl font-bold text-gray-900">
        {service.name}
      </h1>

      <p className="text-gray-500 mt-2">
        {service.description}
      </p>

      <div className="grid md:grid-cols-2 gap-5 mt-8">

        <div className="bg-gray-50 p-5 rounded-xl">

          <p className="text-gray-500 text-sm">
            Category
          </p>

          <p className="font-semibold">
            {service.category}
          </p>

        </div>

        <div className="bg-gray-50 p-5 rounded-xl">

          <p className="text-gray-500 text-sm">
            Price
          </p>

          <p className="font-semibold">
            ₹{service.price}
          </p>

        </div>

        <div className="bg-gray-50 p-5 rounded-xl">

          <p className="text-gray-500 text-sm">
            Duration
          </p>

          <p className="font-semibold">
            {service.duration}
          </p>

        </div>

        <div className="bg-gray-50 p-5 rounded-xl">

          <p className="text-gray-500 text-sm">
            Status
          </p>

          <p className="font-semibold">
            {service.status}
          </p>

        </div>

      </div>
    </div>
  );
}



// ======================================================
// MAIN COMPONENT
// ======================================================
const ServiceManagement=()=> {

  const [services, setServices] =
    useState(MOCK_SERVICES);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterCategory, setFilterCategory] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedService, setSelectedService] =
    useState(null);

  const [showDetail, setShowDetail] =
    useState(false);

  const itemsPerPage = 5;


// ======================================================
// STATS
// ======================================================

  const stats = {

    total: services.length,

    active: services.filter(
      (s) => s.status === "Active"
    ).length,

    inactive: services.filter(
      (s) => s.status === "Inactive"
    ).length,

    categories: new Set(
      services.map((s) => s.category)
    ).size,

    revenue: services.reduce(
      (sum, s) => sum + s.price,
      0
    ),
  };


// ======================================================
// CATEGORY LIST
// ======================================================

  const categories = [

    "All",

    ...new Set(
      services.map(
        (service) => service.category
      )
    ),
  ];


// ======================================================
// FILTER SERVICES
// ======================================================

  const filteredServices = services.filter(
    (service) => {

      const matchesSearch =

        service.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        service.id
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );


      const matchesCategory =

        filterCategory === "All"

        ||

        service.category ===
        filterCategory;


      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );


// ======================================================
// PAGINATION
// ======================================================

  const totalPages = Math.ceil(
    filteredServices.length /
    itemsPerPage
  );

  const paginatedServices =
    filteredServices.slice(

      (currentPage - 1)
      * itemsPerPage,

      currentPage
      * itemsPerPage
    );


// ======================================================
// RESET PAGE
// ======================================================

  useEffect(() => {

    setCurrentPage(1);

  }, [searchTerm, filterCategory]);


// ======================================================
// HANDLERS
// ======================================================

const handleView = (service) => {

  setSelectedService(service);

  setShowDetail(true);

};


const handleBack = () => {

  setSelectedService(null);

  setShowDetail(false);

};


const handleDelete = (id) => {

  const confirmDelete = window.confirm(
    "Delete this service?"
  );

  if (!confirmDelete) return;

  setServices(
    services.filter(
      (service) => service.id !== id
    )
  );
};


const handleEdit = (id) => {

  alert(`Edit Service ${id}`);

};


// ======================================================
// STATUS BADGE
// ======================================================

const getStatusBadge = (status) => {

  if (status === "Active") {

    return (

      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1 w-fit">

        <CheckCircle className="w-3 h-3" />

        Active

      </span>
    );
  }

  return (

    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1 w-fit">

      <XCircle className="w-3 h-3" />

      Inactive

    </span>
  );
};


// ======================================================
// DETAIL PAGE
// ======================================================

if (showDetail && selectedService) {

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">

        <ServiceDetail

          service={selectedService}

          onBack={handleBack}

        />

      </div>

    </div>
  );
}


// ======================================================
// CARD DATA
// ======================================================

const statCards = [

  {
    title: "Total",

    value: stats.total,

    icon: Package,

    border: "border-blue-500",

    text: "text-blue-600",
  },

  {
    title: "Active",

    value: stats.active,

    icon: CheckCircle,

    border: "border-green-500",

    text: "text-green-600",
  },

  {
    title: "Inactive",

    value: stats.inactive,

    icon: XCircle,

    border: "border-red-500",

    text: "text-red-600",
  },

  {
    title: "Categories",

    value: stats.categories,

    icon: BrushCleaning,

    border: "border-yellow-500",

    text: "text-yellow-600",
  },



];


// ======================================================
// TABLE HEADERS
// ======================================================

const tableHeaders = [

  "Service ID",

  "Service",

  "Category",

  "Price",

  "Duration",

  "Status",

  "Action",
];

return (

<div className="min-h-screen bg-gray-50 p-6">

<div className="max-w-7xl mx-auto">

{/* HEADER */}

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

<div>

<h1 className="text-3xl font-bold text-gray-900">

Service Management

</h1>

<p className="text-gray-500">

Manage all laundry services

</p>

</div>

<button className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">

<Plus className="w-5 h-5" />

Add Service

</button>

</div>


{/* STATS */}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

{statCards.map((card,index)=>{

const Icon=card.icon;

return(

<div

key={index}

className={`bg-white border-l-4 ${card.border} rounded-xl p-5 shadow-sm`}

>

<div className="flex items-center justify-between">

<div>

<p className="text-gray-500 text-sm">

{card.title}

</p>

<h2 className={`text-2xl font-bold ${card.text}`}>

{card.value}

</h2>

</div>

<Icon className={`w-7 h-7 ${card.text}`} />

</div>

</div>

)

})}

</div>


{/* TOOLBAR */}

<div className="bg-white rounded-xl shadow-sm p-4 mb-6">

<div className="flex flex-col md:flex-row gap-4">

<div className="relative flex-1">

<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

<input

type="text"

placeholder="Search services..."

value={searchTerm}

onChange={(e)=>setSearchTerm(e.target.value)}

className="w-full pl-10 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"

/>

</div>

<select

value={filterCategory}

onChange={(e)=>setFilterCategory(e.target.value)}

className="px-4 py-3 border rounded-lg outline-none"

>

{categories.map((category)=>(

<option

key={category}

value={category}

>

{category}

</option>

))}

</select>

</div>

</div>


{/* TABLE */}

<div className="bg-white rounded-xl shadow-sm overflow-hidden">

<div className="overflow-x-auto">

<table className="w-full">

<thead className="bg-gray-100">

<tr>

{tableHeaders.map((header)=>(

<th

key={header}

className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase"

>

{header}

</th>

))}

</tr>

</thead>


<tbody>

{paginatedServices.map((service)=>(

<tr

key={service.id}

className="border-t hover:bg-gray-50 transition"

>

<td className="px-5 py-4 text-blue-600 font-semibold">

{service.id}

</td>

<td className="px-5 py-4">

{service.name}

</td>

<td className="px-5 py-4">

{service.category}

</td>

<td className="px-5 py-4">

₹{service.price}

</td>

<td className="px-5 py-4">

<div className="flex items-center gap-2">

<Clock className="w-4 h-4 text-gray-400"/>

{service.duration}

</div>

</td>

<td className="px-5 py-4">

{getStatusBadge(service.status)}

</td>

<td className="px-5 py-4">

<div className="flex gap-2">

<button

onClick={()=>handleView(service)}

className="p-2 rounded hover:bg-blue-100"

>

<Eye className="w-4 h-4 text-blue-600"/>

</button>

<button

onClick={()=>handleEdit(service.id)}

className="p-2 rounded hover:bg-yellow-100"

>

<Edit className="w-4 h-4 text-yellow-600"/>

</button>

<button

onClick={()=>handleDelete(service.id)}

className="p-2 rounded hover:bg-red-100"

>

<Trash2 className="w-4 h-4 text-red-600"/>

</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>


{/* EMPTY STATE */}

{filteredServices.length===0 &&(

<div className="text-center py-12">

<Package className="w-14 h-14 text-gray-300 mx-auto mb-4"/>

<h2 className="text-lg font-semibold text-gray-700">

No Services Found

</h2>

<p className="text-gray-500">

Try changing filters

</p>

</div>

)}


{/* PAGINATION */}

{filteredServices.length>0 &&(

<div className="flex flex-col md:flex-row justify-between items-center p-5 border-t gap-4">

<p className="text-sm text-gray-500">

Showing

{" "}

{(currentPage-1)*itemsPerPage+1}

{" "}

to

{" "}

{Math.min(

currentPage*itemsPerPage,

filteredServices.length

)}

{" "}

of

{" "}

{filteredServices.length}

</p>

<div className="flex gap-2">

<button

onClick={()=>

setCurrentPage(

Math.max(

currentPage-1,

1

)

)

}

disabled={currentPage===1}

className="border rounded px-3 py-2 disabled:opacity-50"

>

<ChevronLeft className="w-4 h-4"/>

</button>


{Array.from(

{length:totalPages},

(_,i)=>i+1

).map((page)=>(

<button

key={page}

onClick={()=>setCurrentPage(page)}

className={`px-4 py-2 rounded border

${currentPage===page

? "bg-blue-600 text-white"

: ""

}

`}

>

{page}

</button>

))}


<button

onClick={()=>

setCurrentPage(

Math.min(

currentPage+1,

totalPages

)

)

}

disabled={currentPage===totalPages}

className="border rounded px-3 py-2 disabled:opacity-50"

>

<ChevronRight className="w-4 h-4"/>

</button>

</div>

</div>

)}

</div>

</div>

</div>

);

}

export default ServiceManagement;