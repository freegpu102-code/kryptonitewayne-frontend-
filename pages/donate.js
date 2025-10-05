// pages/donate.jsx
import { motion } from "framer-motion";

export default function DonatePage() {
  const amounts = [5, 10, 20, 50];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center px-6">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Support Our Mission ❤️
      </motion.h1>

      <motion.p
        className="text-gray-400 mb-8 max-w-xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Your donation helps us keep this platform alive and improving.  
        Choose an amount below or enter your own.
      </motion.p>

      <div className="flex gap-4 flex-wrap justify-center mb-6">
        {amounts.map((amt, i) => (
          <motion.button
            key={amt}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-pink-600 rounded-2xl shadow-md hover:bg-pink-500 transition"
          >
            ${amt}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <input
          type="number"
          placeholder="Custom amount"
          className="px-4 py-3 rounded-xl text-black outline-none w-64"
        />
        <button className="px-6 py-3 bg-green-600 rounded-2xl shadow-md hover:bg-green-500 transition">
          Donate Now
        </button>
      </motion.div>
    </div>
  );
}
    