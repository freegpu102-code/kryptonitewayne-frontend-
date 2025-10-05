"use client";

import { motion } from "framer-motion";
import { FaGamepad, FaUsers, FaRocket, FaHeart, FaDiscord, FaYoutube, FaTwitter } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[70vh] px-6 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20"
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-300 max-w-2xl text-lg md:text-xl"
        >
          We’re not just building games. We’re building a universe of fun, creativity, 
          and connection where every player feels like a hero.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-10 text-pink-400"
        >
          Our Mission 🚀
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          At <span className="text-pink-400 font-semibold">Kryptonite Wayne</span>, our mission is to
          create experiences that inspire, challenge, and connect. We combine cutting-edge technology
          with creativity to design platforms that bring joy, foster friendships, and empower gamers
          across the world.
        </motion.p>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          {
            icon: <FaGamepad className="text-5xl text-pink-500 mb-4" />,
            title: "Innovation",
            desc: "We’re always pushing boundaries to make gaming more immersive and engaging.",
          },
          {
            icon: <FaUsers className="text-5xl text-purple-400 mb-4" />,
            title: "Community",
            desc: "Players come first. We thrive on creating spaces where friendships are forged.",
          },
          {
            icon: <FaRocket className="text-5xl text-indigo-400 mb-4" />,
            title: "Excellence",
            desc: "From gameplay to design, we aim for nothing short of world-class experiences.",
          },
          {
            icon: <FaHeart className="text-5xl text-red-400 mb-4" />,
            title: "Passion",
            desc: "We love what we do — and that passion fuels every project we bring to life.",
          },
        ].map((value, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition-all"
          >
            {value.icon}
            <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
            <p className="text-gray-400">{value.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Owner Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-10 text-purple-400"
        >
          Meet the Owner 👑
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-gray-800 rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 hover:shadow-pink-500/30 transition-all"
        >
          <img
           src="/logo.webp"
            className="w-32 h-32 rounded-full border-4 border-pink-500 shadow-lg"
          />
          <h3 className="text-2xl font-bold text-pink-400">Wayne</h3>
          <p className="text-gray-400 max-w-xl">
            Creator of <span className="text-pink-400">Kryptonite Wayne</span>. Passionate gamer,
            developer, and community builder who loves connecting people through tech & creativity.
          </p>
          {/* Social Links */}
          <div className="flex gap-6 mt-4">
            <motion.a
              href="https://discord.com"
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className="text-3xl text-indigo-400 hover:text-indigo-300"
            >
              <FaDiscord />
            </motion.a>
            <motion.a
              href="https://youtube.com/@kryptonitewayne"
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className="text-3xl text-red-500 hover:text-red-400"
            >
              <FaYoutube />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className="text-3xl text-blue-400 hover:text-blue-300"
            >
              <FaTwitter />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 border-t border-gray-800">
        <p>
          © {new Date().getFullYear()} Kryptonite Wayne. Built with ❤️ and passion for gamers.
        </p>
      </footer>
    </div>
  );
}
