"use client";

import { useEffect, useState } from "react";

const messages = [
  "Understanding your travel preferences...",
  "Analyzing destinations and routes...",
  "Evaluating budget and duration...",
  "Scanning seasonal conditions...",
  "Matching experiences to your interests...",
  "Optimizing travel flow...",
  "Selecting must-see attractions...",
  "Balancing relaxation and exploration...",
  "Crafting day-by-day itinerary...",
  "Refining logistics and timing...",
  "Adding local insights...",
  "Finalizing your personalized plan...",
];

const AiLoader = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Rotate text every 2 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1.5 * 1000);

    return () => clearInterval(messageInterval);
  }, []);

  // Hide the loader after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 15 * 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="text-white font-raleway bg-black flex justify-center items-center fixed top-0 left-0 w-dvw h-dvh z-50">
      <div className="flex justify-center items-center gap-11">
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <h1
          key={index}
          className="text-3xl flex items-center gap-2 font-semibold text-transparent bg-clip-text bg-linear-to-r from-gray-400 via-gray-200 to-gray-500 animate-fade-in-out"
        >
          {messages[index]}
        </h1>
      </div>
    </div>
  );
};

export default AiLoader;
