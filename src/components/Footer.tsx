"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Footer() {
  const emojis = ["😢", "❤️", "💪", "🍺", "🔥", "😎", "🍕", "🔋"];
  const [emojiIndex, setEmojiIndex] = useState(
    Math.floor(Math.random() * emojis.length),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiIndex(Math.floor(Math.random() * emojis.length));
    }, 4000);

    return () => clearInterval(interval);
  }, [emojis.length]);

  return (
    <footer className="bg-foreground text-background flex w-full flex-col items-center justify-center gap-4 p-8 text-center md:px-8">
      <p>
        Made with{" "}
        <motion.span
          key={emojiIndex}
					className="relative inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {emojis[emojiIndex]}
        </motion.span>{" "}
        during JunctionX Delft 2025
      </p>
      <div className="text-background/50 font-light flex flex-col items-center gap-2 md:flex-row">
        <p>Vladimirs Kirils Bickovs</p>
        <div className="bg-background/50 h-px w-16 rounded-full md:h-1 md:w-1"></div>
        <p>Fiodar Prystauka</p>
        <div className="bg-background/50 h-px w-16 rounded-full md:h-1 md:w-1"></div>
        <p>Emmy Rotariu</p>
        <div className="bg-background/50 h-px w-16 rounded-full md:h-1 md:w-1"></div>
        <p>Șerban Untu</p>
      </div>
    </footer>
  );
}
