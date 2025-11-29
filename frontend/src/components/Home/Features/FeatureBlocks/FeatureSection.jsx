import React from "react";
import { motion } from "framer-motion";

const features = [
  { id: 1, title: "FLEXIBLE PLATFORM", tag: "FEATURE 1", highlight: true, row: 1 },
  { id: 2, title: "FULLY SECURED",  tag: "FEATURE 2", highlight: false, row: 1 },
  { id: 3, title: "TIME SAVER",      tag: "FEATURE 3", highlight: true, row: 1 },
  { id: 4, title: "KEEP TRACK",      tag: "FEATURE 4", highlight: false, row: 2 },
  { id: 5, title: "MORE FOCUS",      tag: "FEATURE 5", highlight: true, row: 2 },
  { id: 6, title: "EASY DEPLOY",     tag: "FEATURE 6", highlight: false, row: 2 },
];

// Motion variants
const leftToRight = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const rightToLeft = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

function FeatureSection() {
  return (
    <section className="w-full text-white py-15 px-6">
      <h2 className="text-start text-4xl sm:text-5xl font-light mb-10 mt-5">
        A Seamless User Experience
      </h2>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((f) => (
          <motion.div
            key={f.id}
            className="rounded-2xl overflow-hidden bg-[#1f1f1f] border border-white/10 shadow-lg hover:scale-[1.01] transition duration-300"

            // Animation
            variants={f.row === 1 ? leftToRight : rightToLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Top Bar */}
            <div className="bg-[#2a2a2a] py-4 px-6 text-sm tracking-wider text-gray-300">
              {f.tag}
            </div>

            {/* Content */}
            <div
              className={`py-12 px-6 text-2xl tracking-wide ${
                f.highlight ? "bg-[#5037ff]" : "bg-[#3a3a3a]"
              }`}
            >
              {f.title}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;
