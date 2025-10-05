"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTwitter,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}games/adminMessage/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (data.success) {
        setStatus({ type: "success", text: data.message });
        setForm({ name: "", email: "", message: "" }); // reset form
      } else {
        setStatus({ type: "error", text: data.message });
      }
    } catch (error) {
      setStatus({ type: "error", text: "Something went wrong. Try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center px-6 py-12 pt-24">
      {/* Header */}
      <motion.h1
        className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact Us
      </motion.h1>

      <p className="text-gray-400 mb-12 text-center max-w-2xl">
        Got questions, feedback, or just want to say hi?  
        We’d love to hear from you! Reach out through the form or our socials below.
      </p>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Left: Info + Socials */}
        <div className="flex flex-col gap-8 justify-center">
          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-pink-500 text-2xl" />
              <span>support@example.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-pink-500 text-2xl" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-pink-500 text-2xl" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-6 mt-6">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition"
            >
              <FaTwitter className="text-white text-xl" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="p-3 bg-gray-800 rounded-full hover:bg-red-600 transition"
            >
              <FaYoutube className="text-white text-xl" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="p-3 bg-gray-800 rounded-full hover:bg-indigo-600 transition"
            >
              <FaDiscord className="text-white text-xl" />
            </motion.a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-4 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-pink-500 transition"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-4 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-pink-500 transition"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="p-4 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-pink-500 transition"
            required
          ></textarea>

          {/* Status message */}
          {status && (
            <div
              className={`p-3 rounded-lg text-center text-sm ${
                status.type === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {status.text}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-4 rounded-xl font-semibold shadow-lg transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90"
            }`}
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
