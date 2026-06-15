"use client";

import PageLayout from "@/components/PageLayout";
import { researchToc } from "@/data/nav";
import Abstract from "@/components/research/Abstract";
import Background from "@/components/research/Background";
import PreLoop from "@/components/research/PreLoop";
import Architecture from "@/components/research/Architecture";
import Retrieval from "@/components/research/Retrieval";
import Results from "@/components/research/Results";
import Benchmarks from "@/components/research/Benchmarks";
import WorkedExample from "@/components/research/WorkedExample";
import Cite from "@/components/research/Cite";
import Acknowledgements from "@/components/research/Acknowledgements";

export default function ResearchPage() {
  return (
    <PageLayout title="Research" subtitle="Feedback-augmented, information-theoretic, and open-source framework for iterative reasoning in LLMs." toc={researchToc} tocTitle="Research">
      <Abstract />
      <Background />
      <PreLoop />
      <Architecture />
      <Retrieval />
      <Results />
      <Benchmarks />
      <WorkedExample />
      <Cite />
      <Acknowledgements />
    </PageLayout>
  );
}
