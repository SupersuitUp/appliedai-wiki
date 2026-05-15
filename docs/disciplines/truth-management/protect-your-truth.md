---
title: "Protect Your Truth"
slug: /disciplines/truth-management/protect-your-truth
description: "Match access controls to sensitivity levels. Your truth repository contains your most strategic thinking; treat it accordingly."
---

# Protect Your Truth

*Your truth management repository contains your institution's most strategic thinking. Treat it with appropriate security.*

---

## The risk

Every tool in your truth management workflow (AI assistants, version control, transcription services) is a potential leak point for your competitive advantage. Your documented strategies, failed experiments, and decision frameworks are exactly what competitors would love to access.

## Core principles

### Consider local-first tools

- Use locally-hosted LLMs for processing sensitive documentation.
- Deploy on-premise transcription for strategic conversations.
- Run AI editing tools on company-owned hardware when handling trade secrets.

### Match security to sensitivity

- **Public truth.** Open source repos for public-facing principles.
- **Internal truth.** Private repos with strict access controls.
- **Executive truth.** Air-gapped systems for board-level strategy.

### Architect for access control

Multiple truth repos with different security levels beats one repo with complex permissions:

- `company-public/`: culture and values safe to share.
- `company-internal/`: operational playbooks for employees.
- `company-strategic/`: competitive strategies for leadership only.

### Audit your tool chain

Before documenting sensitive truth, ask:

- Where is this data processed? (OpenAI, Anthropic, local)
- Who has access to the repository? (GitHub, GitLab, self-hosted)
- What leaves your network? (API calls, backups, logs)

## The trade-off

Security measures can create barriers to collaboration. Find your balance:

- What truth creates value by being shared widely?
- What truth loses value if competitors access it?
- What tools enable both protection and productivity?

Your truth management system is only as secure as its weakest integration. Design accordingly.

---

## Further Reading

- [Source Controller](/disciplines/truth-management/source-controller): the platform layer where access control is actually enforced.
- [Empower Your Truth Manager](/disciplines/truth-management/empower-your-truth-manager): the authority needed to set and enforce sensitivity tiers.
- [Make Your Company Refactorable](/disciplines/truth-management/make-your-company-refactorable): how to keep security without sacrificing agent-accessibility.
- [Make Every File Count](/disciplines/truth-management/make-every-file-count): the pruning discipline that reduces surface area for leaks.
