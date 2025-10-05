"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

export default function AdminLogin({ onSuccess }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}games/adminAuth/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        Cookies.set("auth_token", code, { expires: 3000 }); // 1 day
        onSuccess();
      } else {
        setError("❌ Invalid admin code");
      }
    } else {
      setError("⚠️ Server error, try again later");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black 
                 p-10 rounded-2xl shadow-2xl w-96 border border-gray-700"
    >
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-6">
        🔐 Admin Access
      </h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Enter Secret Admin Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm text-center"
          >
            {error}
          </motion.p>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 
                     hover:from-blue-600 hover:to-purple-700 
                     transition p-3 rounded-lg font-semibold text-white"
        >
          Login
        </motion.button>
      </form>
    </motion.div>
  );
}
