"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Games() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch games when query changes
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}games/getGames/?query=${query}`
        );
        setGames(res.data || []);
      } catch (err) {
        console.error("Error fetching games:", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchGames, 500); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[50vh] px-6 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20"
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent"
        >
          Explore Games
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-300 max-w-2xl text-lg md:text-xl"
        >
          Dive into a variety of exciting games, each crafted to entertain and challenge you!
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 w-full max-w-lg relative"
        >
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-full bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-lg"
          />
        </motion.div>
      </section>

      {/* Games Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
  {loading ? (
    [...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="w-full h-72 bg-gray-800 rounded-2xl animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
      />
    ))
  ) : games.length > 0 ? (
    <AnimatePresence>
      {games.map((game, i) => {
        // Format Django datetime (ISO string) into readable format
        const formattedTime = new Date(game.date).toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <motion.div
            key={game._id || i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
            className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl group"
          >
            {/* Game Image */}
            <motion.img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover rounded-t-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Info Section */}
            <div className="p-5 flex flex-col justify-between h-40">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-100 to-cyan-800 bg-clip-text text-transparent">
                {game.name}
              </h3>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {game.description}
              </p>
              <p className="text-xs text-pink-300 mt-3 italic">
                Released: {formattedTime}
              </p>
            </div>

            {/* Hover Overlay CTA */}
            <Link href={'/game/' + game.id} target={'_blank'} className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end justify-center p-6">
              <motion.p
                href="#"
                className="px-6 py-3 bg-pink-500 text-white rounded-full font-semibold shadow-lg"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 20px #ec4899",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Doiwnload Now 🎮
              </motion.p>
            </Link>
          </motion.div>
        );
      })}
    </AnimatePresence>
  ) : (
    <p className="text-gray-400 col-span-full text-center text-lg">
      No games found. Try another search!
    </p>
  )}
</section>


      {/* Footer */}
      
    </div>
  );
}
