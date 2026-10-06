---
slug: pipeline
order: 2
title: Energy Meter Data Reconstruction Pipeline
short: Meter Pipeline
# TODO confirm the role wording against the employment contract and the audited resume.
role: Data engineering (part-time), CobiNeural
tags:
  - Python
  - pandas
  - NumPy
  - asyncio
  - Athena
  - S3
  - ClickHouse
image: /images/pipeline.png
imageAlt: "Pipeline diagram in three stages: extract from AWS Athena into S3 Parquet, transform with pure functions that fit a per-day least-squares model and rebuild a 15-minute series, then load through a dry-run gate into an S3 archive and ClickHouse."
# TODO confirm the problem line; the build spec flags it as unverified.
problem: Building energy meters had gaps and irregular readings that broke downstream dashboards.
built: A Python ETL pipeline pulls readings from AWS Athena via S3 Parquet, fits a per-day least-squares model and rebuilds clean 15-minute series. Sensors run in parallel while database writes stay serialised, and a dry-run gate previews everything before it is written.
evidence:
  # TODO if this is the same toolkit as the artifact-tier ETL claim in resume.ts, promote to
  # artifact and carry its metrics and history over. Until then it is attested, not artifact.
  tier: attested
  reason: Production codebase at CobiNeural, confidential
  stack:
    - Python
    - pandas
    - NumPy
    - asyncio
    - Athena
    - S3
    - Parquet
    - ClickHouse
  metrics: []
---

## Pure functions in the middle

All the maths lives in functions with no I/O. They are easy to test, and every risky step (reading, writing) sits in one place.

## A dry-run gate before any write

Synthetic data going into production is dangerous, so nothing is written until the output has been previewed and confirmed.
