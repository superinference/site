"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-4 border-t border-neutral-200 dark:border-white/10 text-center text-sm text-neutral-600 dark:text-neutral-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Image src="/research_eu.svg" alt="Co-funded by the European Union" width={406} height={95} className="h-8 sm:h-10 w-auto" />
          <Image src="/research_es.svg" alt="Gobierno de España — Ministerio de Ciencia, Innovación y Universidades" width={352} height={95} className="h-8 sm:h-10 w-auto" />
          <Image src="/research_aei.svg" alt="Agencia Estatal de Investigación" width={300} height={95} className="h-8 sm:h-10 w-auto" />
          <Image src="/research_mad.svg" alt="Comunidad de Madrid" width={252} height={95} className="h-8 sm:h-10 w-auto" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Image src="/logo.svg" alt="SuperInference" width={18} height={18} />
          <span>SuperInference</span>
        </div>
      </div>
    </footer>
  );
}
