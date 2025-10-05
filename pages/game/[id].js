"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiTag, FiShare2, FiStar } from "react-icons/fi";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * GameDetail component renders a game detail page based on the provided game object.
 * It renders a hero section with the game image, name and description, followed by
 * a main content section with game info, features and a call-to-action button.
 * If the game object is not provided, it renders a "Game not found" message.
 */
/*******  c758a888-0a3c-48d2-b333-8686f1182351  *******/
export default function GameDetail({ game }) {
  console.log(game)
  if (!game) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">
        Game not found 😢
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh]">
        <img
          src={game.image}
          
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-pink-500"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {game.name}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {game.description}
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Info Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={game.image}
            alt={game.name}
            width={500}
            height={350}
            className="rounded-2xl shadow-lg border border-gray-700"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-pink-400">About the Game</h2>
            <p className="text-gray-300 leading-relaxed">{game.description}</p>

            <div className="flex flex-wrap gap-4 mt-6 text-gray-400">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-pink-500" />
                {new Date(game.date).toDateString()}
              </div>
              <div className="flex items-center gap-2">
                <FiTag className="text-pink-500" /> {game.genre || "Action"}
              </div>
              <div className="flex items-center gap-2">
                <FiStar className="text-yellow-400" />{" "}
                {game.rating || "4.5 / 5"}
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              
              <motion.button onClick={() => {window.location.href=game.link}}
                className="px-6 py-2 rounded-full bg-pink-600 hover:bg-pink-700 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Now
              </motion.button>
              
              <motion.button
                className="px-6 py-2 rounded-full bg-gray-800 hover:bg-gray-700 shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShare2 /> Share
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Extra Content: Features */}
        <motion.div
          className="bg-gray-800/60 rounded-2xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-pink-400 mb-4">
            Cool Features
          </h2>
          <ul className="space-y-3 text-gray-300 list-disc pl-6">
            <li>🎮 Smooth gameplay experience</li>
            <li>🌍 Online multiplayer support</li>
            <li>⚡ High performance graphics</li>
            <li>🎵 Immersive soundtrack</li>
            <li>🏆 Leaderboards & achievements</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

// ✅ SSR: fetch game from backend using URL query
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}games/getGame/${id}`
    );
    const data = await res.json();

    return { props: { game: data } };
  } catch (error) {
    console.error("Error fetching game:", error);
    return { props: { game: null } };
  }
}
