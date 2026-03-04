"use client";

import { motion } from "framer-motion";
import { Copy, RefreshCw, Check, Download, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";

interface RoastCardProps {
  roast: string;
  onReset: () => void;
}

export default function RoastCard({ roast, onReset }: RoastCardProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Stop audio when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(roast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `dev-roast-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(roast);
      
      // Try to find a Hindi or Urdu voice for better pronunciation of Roman Urdu
      const voices = window.speechSynthesis.getVoices();
      const desiVoice = voices.find(v => v.lang.includes('hi-IN') || v.lang.includes('ur-PK') || v.lang.includes('en-IN'));
      if (desiVoice) {
        utterance.voice = desiVoice;
      }
      
      // Make it slightly robotic/deadpan
      utterance.pitch = 0.8;
      utterance.rate = 0.9;
      
      utterance.onend = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* The visible and capture-able card */}
      <div 
        ref={cardRef} 
        className="glass-card p-8 md:p-12 rounded-[2rem] relative overflow-hidden group bg-[#0f172a]" 
        style={{ background: "#0f172a" }} 
      >
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-[var(--neon-accent)] rounded-full blur-[80px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-30"></div>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[var(--neon-purple)] rounded-full blur-[80px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-30"></div>
        
        <div className="relative z-10 py-6">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-8xl font-serif text-[var(--neon-purple)] opacity-30 absolute -top-8 -left-4 select-none leading-none"
          >
            "
          </motion.span>
          <p className="text-xl md:text-3xl font-bold text-center leading-relaxed text-white relative z-10 px-4 md:px-8 tracking-wide whitespace-pre-line">
            {roast}
          </p>
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-8xl font-serif text-[var(--neon-accent)] opacity-30 absolute -bottom-16 -right-4 select-none leading-none"
          >
            "
          </motion.span>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700/50 flex items-center justify-between text-slate-400 text-sm font-mono opacity-80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--neon-accent)] opacity-70"></span>
            Dev Roast Generator
          </div>
          <div>Made with ❤️ & Tears</div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 grid grid-cols-2 sm:flex sm:flex-row flex-wrap justify-center gap-3 md:gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleAudio}
          className={`flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl border border-slate-700 font-medium transition-colors backdrop-blur-sm ${isPlaying ? 'bg-[var(--neon-purple)] text-white border-transparent' : 'bg-slate-800/80 text-white hover:bg-slate-700'}`}
        >
          {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[var(--neon-purple)]" />}
          {isPlaying ? "Stop" : "Listen"}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-medium hover:bg-slate-700 transition-colors backdrop-blur-sm"
        >
          {copied ? <Check className="w-5 h-5 text-[var(--neon-accent)]" /> : <Copy className="w-5 h-5 text-gray-400" />}
          {copied ? "Copied" : "Copy"}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-medium hover:bg-slate-700 transition-colors backdrop-blur-sm col-span-2 sm:col-span-1"
        >
          <Download className="w-5 h-5 text-[var(--neon-accent)]" />
          {isDownloading ? "Saving..." : "Save Image"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-medium hover:bg-slate-700 transition-colors backdrop-blur-sm col-span-2 sm:col-span-1"
        >
          <RefreshCw className="w-5 h-5 text-gray-400" />
          Another
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
