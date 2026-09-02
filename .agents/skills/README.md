# EArovers Agent Skills

This directory contains specialized Agent Skills for the EArovers project, optimized for use with Google Antigravity / Gemini.

## Available Skills

### 1. prisma-composer
- **What it does:** Provides comprehensive guidance on writing, testing, and deploying applications using Prisma Composer (`@prisma/composer`). It covers service declaration (`compute()`), RPC contracts, module composition, configuration, secret management, testing (`mockService`/`bootstrapService`), local development, and cloud deployment.
- **When Gemini should use it:** Triggered whenever you are building or maintaining a Prisma App, wiring service dependencies, provisioning databases or buckets via Prisma Cloud, writing tests for composed services, running the app locally, or deploying/tearing down environments using the `prisma-composer` CLI.
- **Original skills merged:** `.claude/skills/prisma-composer` (Migrated as a single cohesive skill to preserve the holistic context of the framework).

## Migration Notes

- **Claude-specific functionality:** No Claude-specific tool calls or unsupported formatting were found in the source files. The markdown is standard and fully compatible with Gemini's context window.
- **Conflicts or assumptions:** The source folder only contained one skill (`prisma-composer`). Since it represents a single, cohesive framework, it was kept as one unified skill rather than artificially split. The YAML frontmatter was verified to ensure Gemini can properly index the description and trigger keywords.
