---
slug: studyhub
order: 3
title: "StudyHub: Booking and Billing Platform for a Tuition Centre"
short: StudyHub
role: Full-stack developer, solo
tags:
  - Go
  - JavaScript
  - PostgreSQL
  - DigitalOcean
image: /images/studyhub.png
imageAlt: StudyHub admin dashboard showing today's classes, overdue invoices and this week's attendance, populated with sample data.
problem: A tuition centre was running classes, attendance and fees by hand.
built: "A custom platform on its own domain: family bills for siblings, make-up class credits, parent absence reports, attendance and separate admin, teacher and parent views."
# TODO confirm the screenshot comes from a demo account with fixture data, never real students.
result: Live in production. Screenshot shows sample data.
evidence:
  tier: live
  href: https://studyhub.fit
  linkLabel: studyhub.fit
  stack:
    - Go (chi, pgx)
    - PostgreSQL
    - WebSocket
    - JWT
  metrics:
    - 143 REST routes
    - 25-table schema
    - 81 backend tests
    - "~22k LOC"
---
