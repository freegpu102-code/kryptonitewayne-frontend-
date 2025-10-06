"use client";

import { motion } from "framer-motion";


export default function Home() {
  const features = [
    { title: "Games", desc: "Play exciting games with friends, online or offline!" },
    { title: "Donate", desc: "Support our platform and creators directly." },
    { title: "Chats", desc: "Connect instantly with your community." },
    { title: "Contact", desc: "Reach out for support anytime." },
    { title: "About", desc: "Learn more about our journey and mission." },
  ];

  const testimonials = [
    { name: "Alex P.", msg: "This site is so interactive! I love the animations." },
    { name: "Samantha R.", msg: "Amazing design and smooth experience everywhere!" },
    { name: "Jordan K.", msg: "I feel like this platform really stands out from the rest." },
  ];

  return (
    <div className="relative bg-gray-900 text-white overflow-x-hidden">
      {/* Navbar */}
      

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 overflow-hidden">
        {/* Background floating shapes */}
        <motion.div
          className="absolute top-10 left-1/4 w-56 h-56 bg-pink-500 rounded-full mix-blend-multiply opacity-20 animate-spin-slow"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 right-1/3 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply opacity-20 animate-spin-slow"
          animate={{ rotate: [360, 0] }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        />

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold mb-6"
        >
          Welcome to <span className="text-pink-500">Kryptonitewayne</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-2xl text-gray-300 mb-8 max-w-xl"
        >
          Explore the most interactive and animated platform ever built. Everything is designed for engagement and fun!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex space-x-4"
        >
          <motion.a
            href="#features"
            className="px-6 py-3 bg-pink-500 rounded-lg shadow-lg hover:bg-pink-600 transition"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #ec4899" }}
          >
            Get Started
          </motion.a>
          <motion.a
            href="#about"
            className="px-6 py-3 border border-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition"
            whileHover={{ scale: 1.1 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <h3 className="text-2xl font-bold text-pink-500 mb-3">{feature.title}</h3>
            <p className="text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-pink-500"
        >
          What People Say
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center"
            >
              <p className="text-gray-200 italic mb-4">{t.msg}</p>
              <h4 className="text-pink-400 font-bold">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-pink-500"
        >
          Join the Fun Today!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-300 max-w-xl mx-auto mb-8"
        >
          Sign up and explore all our features, engage with others, and enjoy a fully animated experience.
        </motion.p>
        <motion.a
          href="/games"
          className="px-8 py-4 bg-pink-500 rounded-full text-white font-bold shadow-lg hover:bg-pink-600 transition inline-block"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #ec4899" }}
        >
          Sign Up Now
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900 text-gray-400 text-center">
        <p>© 2025 MyWebsite. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-pink-500 transition">Privacy</a>
          <a href="#" className="hover:text-pink-500 transition">Terms</a>
          <a href="#" className="hover:text-pink-500 transition">Contact</a>
        </div>
      </footer>
    </div>
  );
}
