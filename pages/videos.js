// app/videos/page.jsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST}&key=${process.env.NEXT_PUBLIC_GOOGLE_YOUTUBE}&part=snippet&maxResults=50`
        );
        const data = await res.json();
        setVideos(data.items || []);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-pink-500 text-center">
        📺 My YouTube Videos
      </h1>

      {loading ? (
        <div className="text-gray-400 text-center mt-20 text-lg">
          Loading videos...
        </div>
      ) : videos.length === 0 ? (
        <div className="text-gray-400 text-center mt-20 text-lg">
          No videos found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {videos.map((video, index) => {
            const snippet = video.snippet;
            const videoId = snippet.resourceId.videoId;

            return (
              <motion.a
                key={index}
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      snippet.thumbnails.high?.url ||
                      snippet.thumbnails.default.url
                    }
                    alt={snippet.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-pink-500 px-2 py-1 rounded-full text-xs font-semibold">
                    🔴 YouTube
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                    {snippet.title}
                  </h2>
                  <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                    {snippet.description}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {new Date(snippet.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      )}
    </div>
  );
}
