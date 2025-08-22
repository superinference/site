"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export type MotionCardProps = PropsWithChildren<{
  delay?: number;
  title?: string;
  className?: string;
}>;

export default function MotionCard({ delay = 0, title, className, children }: MotionCardProps) {
  return (
    <motion.div
      className={"rounded-xl border border-white/10 bg-black/20 p-5 " + (className ?? "")}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      {title ? <div className="text-2xl font-semibold mb-2">{title}</div> : null}
      {children}
    </motion.div>
  );
} 