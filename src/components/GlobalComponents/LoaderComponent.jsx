import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Loader = () => {
  const [displayText, setDisplayText] = useState("ENCRYPTIFY");

  // Characters to randomly swap in the word
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  // Function to randomly mutate the text
  const getRandomizedText = (text) => {
    return text
      .split("")
      .map((char) => (Math.random() > 0.7 ? characters[Math.floor(Math.random() * characters.length)] : char))
      .join("");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prevText) => getRandomizedText("ENCRYPTIFY"));
    }, 200); // Update every 200ms

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const textVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: [1, 0.8, 1],
      scale: [1, 1.1, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const barVariants = {
    initial: { scaleY: 0.5, opacity: 0 },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1,
        ease: "circIn",
      },
    },
  };

  return (
    <div className="h-screen w-screen bg-[#111827] flex flex-col items-center justify-center gap-8">
      <motion.span
        className="self-center text-7xl font-semibold sm:text-2xl whitespace-nowrap text-white"
        initial="initial"
        animate="animate"
        variants={textVariants}
      >
        {displayText}
      </motion.span>
      <motion.div
        transition={{ staggerChildren: 0.25 }}
        initial="initial"
        animate="animate"
        className="flex gap-2"
      >
        <motion.div variants={barVariants} className="h-12 w-2 bg-white" />
        <motion.div variants={barVariants} className="h-12 w-2 bg-white" />
        <motion.div variants={barVariants} className="h-12 w-2 bg-white" />
        <motion.div variants={barVariants} className="h-12 w-2 bg-white" />
        <motion.div variants={barVariants} className="h-12 w-2 bg-white" />
      </motion.div>
    </div>
  );
};

export default Loader;
