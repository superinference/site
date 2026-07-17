---
title: "SuperInference Paper Now Available"
subtitle: "Supervised Inference for Partially Observable Environments"
abstract: "We are releasing the SuperInference preprint — a formal framework that treats LLM reasoning as inference under uncertainty, replacing heuristic retry limits with information-theoretic stopping criteria."
date: "2026-05-15"
author: "Carlos Camacho-Gonzalez"
categories: ["Research"]
heroImage: "/blog/images/superinference-paper.jpg"
---

## The paper

SuperInference: Supervised Inference for Partially Observable Environments is now available as a preprint from Universidad Complutense de Madrid.

The paper introduces a model-agnostic framework that formalizes LLM reasoning as a noisy decision process. It combines tools from information theory and partially observable decision processes (POMDPs) to provide principled answers to the question: "When should an AI agent stop thinking?"

## Key contributions

- **Formal stopping criteria** based on Expected Information Gain (EIG), replacing ad-hoc retry limits
- **Critic-gated memory** with a positive predictive value of approximately 0.977
- **Noisy retrieval channel** formalization that accounts for imperfect vector similarity search
- **Belief state tracking** that adapts iteration depth to problem difficulty

## Results

On DABStep Hard Tasks, SuperInference + Gemini 2.5 Pro achieved a 3.25x improvement over the base model, reaching 41.3% hard accuracy. Performance gains are concentrated in the first 1-3 reasoning rounds — validating the information-theoretic predictions of the framework.

## Acknowledgements

This work was supported by EU Horizon Europe grant No 101093129, Spanish Ministry of Science projects PID2023-149943OB-I00 and PID2021-122215NB-C31, and the Region of Madrid project TEC-2024/COM-235.
