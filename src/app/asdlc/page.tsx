"use client";

import PageLayout from "@/components/PageLayout";
import { asdlcToc } from "@/data/nav";
import Overview from "@/components/asdlc/Overview";
import Phases from "@/components/asdlc/Phases";
import Engine from "@/components/asdlc/Engine";
import Integration from "@/components/asdlc/Integration";

export default function AsdlcPage() {
  return (
    <PageLayout title="Agentic SDLC" subtitle="How AI agents transform the software development lifecycle — and how AMI implements it." toc={asdlcToc} tocTitle="ASDLC">
      <Overview />
      <Phases />
      <Engine />
      <Integration />
    </PageLayout>
  );
}
