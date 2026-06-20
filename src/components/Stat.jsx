export default function Stat({ value, title }) {
    return (

        <div
            className="bg-white rounded-2xl p-3 shadow-lg text-center " >
            <h2 className=" text-xl font-bold text-[#1916c7] ">{value} </h2>

                <p className=" text-gray-500 text-md "  >{title} </p>

        </div>

    );
}