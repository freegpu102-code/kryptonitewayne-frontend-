"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiSend, FiX, FiCpu } from "react-icons/fi";

export default function CustomChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}games/chatbot/?query=${encodeURIComponent(
          input
        )}`
      );
      const data = await res.json();

      const botMessage = {
        sender: "bot",
        text: data.answer || "🤖 Sorry, I didn’t understand that.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error fetching response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Chat Icon */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-4 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.7)] hover:shadow-[0_0_25px_rgba(236,72,153,0.9)] transition-all duration-300"
        >
          {isOpen ? (
            <FiX size={24} className="drop-shadow-md" />
          ) : (
            <FiCpu size={24} className="drop-shadow-md" />
          )}
        </motion.button>

        {/* Small hint popover */}
        <AnimatePresence>
          {showHint && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: -10, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-16 right-0 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg"
            >
              🤖 I’m your AI assistant!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 backdrop-blur-lg"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 font-semibold flex justify-between items-center shadow-md">
              <span className="flex items-center gap-2">
                <FiCpu size={18} /> <span>AI ChatBot</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-200 hover:text-white"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Info Banner */}
            <div className="bg-yellow-500/20 text-yellow-300 text-xs px-3 py-2 text-center">
              ⚠️ Ask questions related to this website only.
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm scrollbar-thin scrollbar-thumb-gray-700">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-2 rounded-xl max-w-[75%] ${
                    msg.sender === "user"
                      ? "ml-auto bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                      : "mr-auto bg-gray-700 text-gray-200"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}

              {loading && (
                <div className="mr-auto bg-gray-700 text-gray-300 p-2 rounded-lg italic animate-pulse">
                  🤖 Typing...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 flex items-center border-t border-gray-700 bg-gray-900/60 backdrop-blur-md">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
                placeholder={loading ? "Wait..." : "Ask me anything..."}
                disabled={loading}
              />
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.1 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                onClick={sendMessage}
                disabled={loading}
                className={`ml-2 p-2 rounded-lg text-white ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md"
                }`}
              >
                <FiSend size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
