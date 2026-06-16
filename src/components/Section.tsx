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
      >
        {title ? (
          <div className="mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">{title}</h2>
            {subtitle ? <p className="mt-2 text-base/7 text-neutral-600 dark:text-neutral-400">{subtitle}</p> : null}
          </div>
        ) : null}
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
          {children}
        </div>
      </motion.div>
    </section>
  );
} 