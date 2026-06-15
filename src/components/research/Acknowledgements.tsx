import Image from "next/image";
import type { ReactNode } from "react";

const linkClass = "underline decoration-neutral-400 dark:decoration-neutral-500 hover:decoration-neutral-700 dark:hover:decoration-neutral-300 transition-colors";

type Funder = {
  logos: { src: string; alt: string; width: number }[];
  description: ReactNode;
};

const funders: Funder[] = [
  {
    logos: [{ src: "/research_eu.svg", alt: "Co-funded by the European Union", width: 406 }],
    description: <>European Union&apos;s Horizon Europe research and innovation programme under grant agreement No <a href="https://cordis.europa.eu/project/id/101093129" target="_blank" rel="noopener noreferrer" className={linkClass}>101093129</a>.</>,
  },
  {
    logos: [
      { src: "/research_es.svg", alt: "Gobierno de España — Ministerio de Ciencia, Innovación y Universidades", width: 352 },
      { src: "/research_aei.svg", alt: "Agencia Estatal de Investigación", width: 300 },
    ],
    description: <>Spanish Ministry of Science and Agencia Estatal de Investigación (AEI) with projects <a href="https://produccioncientifica.ucm.es/proyectos/921051/detalle?lang=en" target="_blank" rel="noopener noreferrer" className={linkClass}>PID2023-149943OB-I00</a> and <a href="https://ucase.gitlab.io/public/awesome/" target="_blank" rel="noopener noreferrer" className={linkClass}>PID2021-122215NB-C31</a>.</>,
  },
  {
    logos: [{ src: "/research_mad.svg", alt: "Comunidad de Madrid", width: 252 }],
    description: <>Region of Madrid project <a href="https://produccioncientifica.ucm.es/proyectos/1049052/detalle?lang=en" target="_blank" rel="noopener noreferrer" className={linkClass}>TEC-2024/COM-235</a>.</>,
  },
];

export default function Acknowledgements() {
  return (
    <section id="funding" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Acknowledgements</h2>
      <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7 space-y-8">
        <p>This project has received funding from the European Union&apos;s Horizon Europe research and innovation programme under grant agreement No <a href="https://cordis.europa.eu/project/id/101093129" target="_blank" rel="noopener noreferrer" className={linkClass}>101093129</a>, the Spanish Ministry of Science with projects <a href="https://produccioncientifica.ucm.es/proyectos/921051/detalle?lang=en" target="_blank" rel="noopener noreferrer" className={linkClass}>PID2023-149943OB-I00</a> and <a href="https://ucase.gitlab.io/public/awesome/" target="_blank" rel="noopener noreferrer" className={linkClass}>PID2021-122215NB-C31</a>, and the Region of Madrid project <a href="https://produccioncientifica.ucm.es/proyectos/1049052/detalle?lang=en" target="_blank" rel="noopener noreferrer" className={linkClass}>TEC-2024/COM-235</a>.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {funders.map((f) => (
            <div key={f.logos[0].src} className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 p-5">
              <div className="flex flex-col items-center justify-center gap-3 w-full">
                {f.logos.map((l) => (
                  <Image key={l.src} src={l.src} alt={l.alt} width={l.width} height={95} className="h-10 w-auto max-w-full" />
                ))}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
