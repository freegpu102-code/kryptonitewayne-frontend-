"use client";
import LoadingBar from "react-top-loading-bar";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import CustomChatBot from "@/components/CustomBot";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [pages, setPages] = useState({});
  const [progress, setProgress] = useState(0); 
  
    // Use effect to change the loader on route start and end
  useEffect(() => {
    const handleStart = () => setProgress(40);
    const handleComplete = () => setProgress(100);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }) 

  // Cache pages by full URL (so /games/1 and /games/2 are distinct)
  if (!pages[router.asPath]) {
    setPages((prev) => ({
      ...prev,
      [router.asPath]: <Component {...pageProps} key={router.asPath} />,
    }));
  }

  return (
    <>
      <LoadingBar
        color="#f50057"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      <CustomChatBot />
      {Object.entries(pages).map(([path, page]) => (
        <div
          key={path}
          style={{ display: path === router.asPath ? "block" : "none" }}
        >
          {page}
        </div>
      ))}
    </>
  );
}
