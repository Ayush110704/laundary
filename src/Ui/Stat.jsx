import {motion} from 'framer-motion'

export default function Stat({ value, title,delay=0}) {
    return (

        <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay, ease: "easeOut", }}
            className="bg-white rounded-2xl py-1 px-2 shadow-lg text-center " >
            <h2 className="  text-lg md:text-xl font-bold text-[#1916c7] ">{value} </h2>

            <p className=" text-gray-500  text-sm md:text-md "  >{title} </p>

        </motion.div>

    );
}