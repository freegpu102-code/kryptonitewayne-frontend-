"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { FiMail, FiUser, FiMessageSquare, FiCalendar, FiRefreshCw } from "react-icons/fi";

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}games/adminMessage/`
      );
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black 
                 p-8 rounded-3xl shadow-2xl w-full max-w-6xl mx-auto border border-gray-700"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          📩 Admin Messages
        </h1>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={fetchMessages}
            className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          >
            <FiRefreshCw size={20} />
          </motion.button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-semibold shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-400">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-400">No messages yet 🚀</div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-pink-500 transition"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Left info */}
                <div>
                  <p className="flex items-center gap-2 text-lg font-semibold text-pink-400">
                    <FiUser /> {msg.name}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-300">
                    <FiMail /> {msg.email}
                  </p>
                </div>

                {/* Date */}
                <p className="flex items-center gap-2 text-sm text-gray-400">
                  <FiCalendar /> {msg.date}
                </p>
              </div>

              {/* Message */}
              <p className="mt-4 flex items-start gap-2 text-gray-200 leading-relaxed">
                <FiMessageSquare className="mt-1 text-pink-400" />
                {msg.message}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
