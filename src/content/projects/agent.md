---
slug: agent
order: 1
title: Agentic AI Assistant for Live IoT Building Data
short: AI Assistant
# TODO confirm the role wording against the employment contract and the audited resume.
role: Engineer (part-time), CobiNeural
tags:
  - LangGraph
  - MCP
  - RAG
  - FastAPI
  - GraphQL
  - ClickHouse
image: /images/agent.png
imageAlt: "Architecture diagram: a facility manager's question goes through a FastAPI chat API to a LangGraph agent, which calls typed MCP tools over a GraphQL API backed by ClickHouse."
problem: Facility managers needed answers from thousands of live sensor readings without writing queries.
built: An agent that picks typed tools (sensor discovery, time-series aggregation, peak demand), calls a GraphQL backend over ClickHouse and returns structured reports. RAG adds domain context.
# TODO confirm "shipped to commercial building clients" before using that wording; the resume attests production only.
result: In production at CobiNeural.
evidence:
  tier: attested
  reason: Production codebase at CobiNeural, confidential
  stack:
    - LangGraph
    - Claude SDK
    - MCP
    - FastAPI
  metrics: []
---

## Why typed tools over raw SQL

The agent can only call a fixed set of well-described tools, so it cannot write a query that hurts the database, and each answer is traceable to the tools it used.

## Why a formatter step

Facility managers wanted the same report shape every time, so output structure is enforced after the agent reasons, not left to the model.
