"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiBell } from "react-icons/fi";
import { useRouter } from "next/router";

export default function Navbar() {
  const router= useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["Games", "Donate", "Chats", "Contact", "About",'Admin'];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gray-900/80 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={30}
            height={30}
            className="rounded-md"
          />
          <Link href= '/' className="text-2xl font-extrabold text-pink-500 tracking-wide">
            Kryptonitewayne
          </Link>
        </div>

        {/* Desktop Menu (center) */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-lg font-medium">
          {navItems.map((item, i) => (
            <Link key={item} href={`/${item.toLowerCase()}`} passHref>
              <motion.span
                className={`text-gray-300 hover:text-pink-400 transition relative group cursor-pointer ${router.pathname === `/${item.toLowerCase()}` ? "border-b-3 border-cyan-500" : ""}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all group-hover:w-full"></span>
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Right Corner Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Notification Bell */}
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer text-gray-300"
          >
            <FiBell size={20} />
          </motion.div>

          {/* Sign In Button */}
          <Link href="/videos" passHref>
            <motion.span
              className="px-4 py-2 rounded-full bg-pink-500 text-white font-semibold shadow-lg hover:bg-pink-600 transition cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #ec4899" }}
              whileTap={{ scale: 0.95 }}
            >
              Videos
            </motion.span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-pink-400 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800/95 backdrop-blur-lg shadow-lg"
          >
            <div className="flex flex-col items-center py-6 space-y-6 text-lg font-medium">
              {navItems.map((item, i) => (
                <Link key={item} href={`/${item.toLowerCase()}`} passHref>
                  <motion.span
                    className="relative group text-gray-300 hover:text-pink-400 transition cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all group-hover:w-full"></span>
                  </motion.span>
                </Link>
              ))}

              {/* Mobile Sign In Button */}
              <Link href="#login" passHref>
                <motion.span
                  className="px-4 py-2 rounded-full bg-pink-500 text-white font-semibold shadow-lg hover:bg-pink-600 transition cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </motion.span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
