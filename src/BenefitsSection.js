import React from "react";
import { motion } from "framer-motion";
import handshakeVideo from "./assets/handshake_animation.mp4";

export default function BenefitsSection() {
  return (
    <div className="relative w-full h-[34.57vh] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={handshakeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-[#fdf6e3]/80 flex items-center justify-between px-6 text-[#3b2f2f] font-semibold">
        {/* Left Text */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-1/3 text-left text-xs md:text-base"
        >
          <p>
            <span className="font-bold">For entrepreneurs:</span> Access to capital, specialized services, expert advice, networking opportunities, risk mitigation tools, and the chance to scale their businesses and expand into new markets.
          </p>
        </motion.div>

        {/* Center Text */}
        <div className="text-center text-sm md:text-2xl font-bold w-1/3">
          Benefits for both parties
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-1/3 text-right text-xs md:text-base"
        >
          <p>
            <span className="font-bold">For banks:</span> Increased customer loyalty and retention, new revenue streams, deeper insights into customer behavior, a competitive edge, and a reputation for supporting local commerce and community impact.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
