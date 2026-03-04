"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import RoastForm from "@/components/RoastForm";
import RoastCard from "@/components/RoastCard";

export default function Home() {
  const [roast, setRoast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (name: string, tech: string) => {
    setIsLoading(true);
    setRoast(null); // Clear previous roast while loading
    
    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, tech }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch roast");
      }

      setRoast(data.roast);
    } catch (error) {
      console.error(error);
      setRoast(`Aray ${name}, tera code itna bura tha ke AI ne bhi roast generate karne se inkaar kar diya!`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRoast(null);
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-[var(--neon-purple)]/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto z-10 flex flex-col items-center px-2">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 w-full"
        >
          <div className="inline-flex items-center justify-center p-3 glass-card rounded-2xl mb-6 shadow-[0_0_30px_rgba(0,255,204,0.15)] mx-auto">
             <Terminal className="w-8 h-8 text-[var(--neon-accent)]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4">
            Dev <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-purple)]">Roast</span> Generator
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mt-4 px-4 leading-relaxed">
            Get obliterated by a brutally honest AI trained on pure developer trauma. No holding back.
          </p>
        </motion.div>

        <div className="w-full max-w-md md:max-w-2xl mx-auto min-h-[400px] flex items-start justify-center">
          <AnimatePresence mode="wait">
            {!roast ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <RoastForm onGenerate={handleGenerate} isLoading={isLoading} />
              </motion.div>
            ) : (
              <motion.div
                key="roast"
                initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <RoastCard roast={roast} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="mt-auto pt-16 pb-4 text-center text-sm text-gray-500 z-10 font-mono tracking-wider">
         Built by a <a href="https://github.com/hafizabdullah1" target="_blank" rel="noopener noreferrer" className="text-[var(--neon-accent)] hover:text-white transition-colors underline decoration-dotted underline-offset-4">dev</a> for the devs who can take a joke.
      </footer>
    </main>
  );
}
