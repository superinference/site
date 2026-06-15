"use client";

import PageLayout from "@/components/PageLayout";
import { challengesToc } from "@/data/nav";
import Challenges from "@/components/challenges/Challenges";

export default function ChallengesPage() {
  return (
    <PageLayout title="Challenges" subtitle="Programming challenge evaluations using FRITO free-tier multi-provider routing." toc={challengesToc} tocTitle="Challenges">
      <Challenges />
    </PageLayout>
  );
}
