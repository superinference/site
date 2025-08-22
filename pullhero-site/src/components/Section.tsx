"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
  delay?: number;
  title?: string;
  subtitle?: string;
}>;

export default function Section({ id, className, delay = 0, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay }}
        className="w-full px-4 sm:px-6"
      >
        {title ? (
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
            {subtitle ? <p className="mt-2 text-base/7 text-neutral-400">{subtitle}</p> : null}
          </div>
        ) : null}
        {children}
      </motion.div>
    </section>
  );
} 