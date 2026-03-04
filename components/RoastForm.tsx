"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface RoastFormProps {
  onGenerate: (name: string, tech: string) => void;
  isLoading: boolean;
}

export default function RoastForm({ onGenerate, isLoading }: RoastFormProps) {
  const [name, setName] = useState("");
  const [tech, setTech] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onGenerate(name.trim(), tech);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-md mx-auto space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Developer Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Abdullah"
          className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--neon-accent)] focus:border-transparent transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tech" className="text-sm font-medium text-gray-300 ml-1">Tech Stack (Optional)</label>
        <div className="relative">
          <select
            id="tech"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--neon-purple)] focus:border-transparent transition-all"
          >
            <option value="">Select a stack...</option>
            <option value="html_css">HTML / CSS Only</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Full Stack Developer</option>
            <option value="react">React / Next.js</option>
            <option value="node">Node.js / Express</option>
            <option value="python">Python / Django</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isLoading || !name.trim()}
        className="w-full relative group overflow-hidden rounded-xl font-bold text-lg p-[1px]"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-purple)] rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
        <span className="absolute inset-0 bg-gradient-to-r from-[var(--neon-accent)] to-[var(--neon-purple)] rounded-xl"></span>
        <div className="cursor-pointer relative bg-slate-900 px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-opacity-0 group-hover:text-white">
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Flame className="w-5 h-5 text-[var(--neon-accent)] group-hover:text-white transition-colors" />
              <span>Roast Me</span>
            </>
          )}
        </div>
      </motion.button>
    </motion.form>
  );
}
