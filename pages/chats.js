"use client";
import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

const avatars = ["🔥", "⚡", "🌸", "🌀", "🎭", "👾", "🦄", "🐉"];
const getRandomAvatar = () =>
  avatars[Math.floor(Math.random() * avatars.length)];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}games/get-messages/`
        );
        const data = await res.json();
        setMessages(data || []);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", (data) => {
      setMessages((prev) => [...prev, data]);
      setSending(false);
    });

    return () => {
      pusher.unsubscribe("chat");
      pusher.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;

    setSending(true);
    const newMessage = {
      sender: "Anonymous",
      avatar: getRandomAvatar(),
      text: input,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}games/send-message/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
      setInput("");
      setTyping(false);
    } catch (err) {
      console.error("Failed to send:", err);
      setSending(false);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md h-[80vh] bg-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <header className="bg-pink-600 p-4 font-bold text-lg flex justify-between items-center">
          🔥 Global Chat Room
          <span className="text-sm text-gray-100">Anonymous</span>
        </header>

        {/* Messages */}
        <main className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-20">
              No messages yet. Start chatting 🚀
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start space-x-3"
            >
              <div className="text-2xl">{msg.avatar || getRandomAvatar()}</div>
              <div className="bg-gray-700 rounded-2xl p-3 shadow-md max-w-xs">
                <div className="text-sm font-semibold text-pink-400">
                  {msg.sender}
                </div>
                <div>{msg.text}</div>
                {msg.timestamp && (
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {sending && (
            <div className="text-gray-400 text-sm animate-pulse ml-10">
              Sending message...
            </div>
          )}
          {typing && !sending && (
            <div className="text-gray-400 text-sm animate-pulse ml-10">
              Someone is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        {/* Footer Input */}
        <footer className="p-4 flex items-center space-x-3 border-t border-gray-700">
          <input
            type="text"
            value={input}
            disabled={sending}
            onChange={(e) => {
              setInput(e.target.value);
              setTyping(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={sending ? "Wait..." : "Type a message..."}
            className={`flex-1 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              sending ? "bg-gray-600 cursor-not-allowed" : "bg-gray-700"
            }`}
          />
          <motion.button
            whileHover={{ scale: sending ? 1 : 1.05 }}
            whileTap={{ scale: sending ? 1 : 0.95 }}
            onClick={sendMessage}
            disabled={sending}
            className={`p-3 rounded-xl shadow-md ${
              sending ? "bg-gray-600 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            <FiSend size={20} />
          </motion.button>
        </footer>
      </motion.div>
    </div>
  );
}
