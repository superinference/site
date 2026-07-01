"use client";

import PageLayout from "@/components/PageLayout";
import { docsToc } from "@/data/nav";

import Installation from "@/components/docs/Installation";
import QuickStart from "@/components/docs/QuickStart";
import CliReference from "@/components/docs/CliReference";
import Providers from "@/components/docs/Providers";
import Frito from "@/components/docs/Frito";
import FritoCommands from "@/components/docs/FritoCommands";
import FritoProviders from "@/components/docs/FritoProviders";
import Environment from "@/components/docs/Environment";
import PromptMode from "@/components/docs/PromptMode";
import Permissions from "@/components/docs/Permissions";
import Sessions from "@/components/docs/Sessions";
import Security from "@/components/docs/Security";
import VsCode from "@/components/docs/VsCode";
import Troubleshooting from "@/components/docs/Troubleshooting";

import OSOverview from "@/components/openshell/Overview";
import OSQuickStart from "@/components/openshell/QuickStart";
import OSImageArchitecture from "@/components/openshell/ImageArchitecture";
import OSOnDemandDeps from "@/components/openshell/OnDemandDeps";
import OSDetachedExecution from "@/components/openshell/DetachedExecution";
import OSMultiProvider from "@/components/openshell/MultiProvider";
import OSAirGapped from "@/components/openshell/AirGapped";
import OSContainerfile from "@/components/openshell/Containerfile";
import OSSecurityModel from "@/components/openshell/SecurityModel";
import OSAdvantages from "@/components/openshell/Advantages";
import OSUseCases from "@/components/openshell/UseCases";

import AsdlcOverview from "@/components/asdlc/Overview";
import AsdlcPhases from "@/components/asdlc/Phases";
import AsdlcEngine from "@/components/asdlc/Engine";
import AsdlcIntegration from "@/components/asdlc/Integration";

import Challenges from "@/components/challenges/Challenges";

export default function DocsPage() {
  return (
    <PageLayout title="Documentation" subtitle="AMI CLI, FRITO cost-optimization, providers, and configuration reference." toc={docsToc} tocTitle="Docs">

      {/* Documentation */}
      <div id="documentation" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Documentation</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">AMI CLI reference, providers, FRITO, and configuration.</p>
        </div>
        <div className="mt-8 space-y-10">
          <Installation />
          <QuickStart />
          <CliReference />
          <Providers />
          <Frito />
          <FritoCommands />
          <FritoProviders />
          <Environment />
          <PromptMode />
          <Permissions />
          <Sessions />
          <Security />
          <VsCode />
          <Troubleshooting />
        </div>
      </div>

      {/* OpenShell */}
      <div id="openshell" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">OpenShell</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">Container-native AMI deployment for autonomous software engineering.</p>
        </div>
        <div className="mt-8 space-y-10">
          <OSOverview />
          <OSQuickStart />
          <OSImageArchitecture />
          <OSOnDemandDeps />
          <OSDetachedExecution />
          <OSMultiProvider />
          <OSAirGapped />
          <OSContainerfile />
          <OSSecurityModel />
          <OSAdvantages />
          <OSUseCases />
        </div>
      </div>

      {/* ASDLC */}
      <div id="asdlc" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Agentic SDLC</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">How AMI maps to the full software development lifecycle.</p>
        </div>
        <div className="mt-8 space-y-10">
          <AsdlcOverview />
          <AsdlcPhases />
          <AsdlcEngine />
          <AsdlcIntegration />
        </div>
      </div>

      {/* Challenges */}
      <div id="challenges" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Challenges</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">Programming challenge evaluations using FRITO free-tier multi-provider routing.</p>
        </div>
        <div className="mt-8 space-y-10">
          <Challenges />
        </div>
      </div>

    </PageLayout>
  );
}
