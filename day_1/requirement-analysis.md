# Mobile Recharge Web App (MERN) — Requirement Analysis

## Scope
Web application for prepaid/postpaid mobile recharges. Users can browse operator plans, validate numbers, pay securely, and track history. Admins manage operators, plans, offers, and monitor transactions.

## Functional Requirements
- Account lifecycle: email/phone signup, login, logout, password reset (email/OTP), profile update.
- Mobile input and validation: format checks by country code, detect/preselect operator and circle when possible, allow manual override.
- Plan catalog: browse prepaid/postpaid plans, categories (data/voice/SMS/combo), search, filter, sort, view plan details and offers.
- Cartless selection: select plan and proceed directly to payment; allow changing plan before pay.
- Payment: integrate payment gateway mock/live toggle, accept cards/UPI/net-banking/wallet, handle success/failure/webhook, retry failed payments.
- Recharge execution: trigger recharge request to operator/mock API, receive status, update user and admin views.
- Notifications: confirmation via on-screen, email, and optional SMS; show transaction IDs.
- History: list recharges, statuses, amounts, payment refs; downloadable receipt; filters by date/status/operator.
- Wallet/credits (optional): store value, deduct on recharge, show balance and transactions.
- Offers & promos: apply promo codes, show applied discounts.
- Admin data management: CRUD for operators, circles, plans, offers, and user account status (lock/unlock).
- Admin monitoring: dashboards for volumes, failures, revenue, top plans; export data.
- Support: user can raise ticket for failed recharge; admin/support can update status and notes.

## Non-Functional Requirements
- Performance: typical reads <500ms server time; plan list pagination/infinite scroll; graceful degradation for slow networks.
- Availability & resilience: stateless servers; retries with idempotency keys for payments/recharges; retry background jobs.
- Security: HTTPS, JWT access + refresh tokens, hashed passwords (bcrypt/argon2), rate limits on auth, input validation, RBAC on APIs.
- Privacy & compliance: mask sensitive fields (card digits, tokens), log redaction, data retention rules.
- Scalability: horizontal scaling for API; CDN/static caching for assets; separate read vs write DB patterns when needed.
- Reliability: transactional updates for payment + recharge records; at-least-once notification with dedupe by id.
- Observability: structured logs, request IDs, metrics (latency, errors, payment success), uptime checks.
- Usability & accessibility: responsive layout, keyboard navigation, ARIA labels, clear error states; support light/dark theming.
- Compatibility: modern evergreen browsers; adaptive for mobile web.

## User Roles & Capabilities
- User: signup/login/logout/reset password; manage profile; validate number; browse/select plans; apply promo; pay; view/download receipts; view history; raise support ticket.
- Admin: manage operators/circles/plans/offers; view dashboards and exports; view users and lock/unlock accounts; view transactions and update recharge/payment status; manage support tickets.

## Feature List
- Auth (signup/login/reset); profile management.
- Mobile number validation and operator detection.
- Plan browsing (prepaid/postpaid), search, filters, sorting, details.
- Promotions and offers application.
- Payment integration (gateway mock/live), success/failure handling, retries.
- Recharge execution and confirmation with notifications.
- Recharge history with receipts and filters.
- Wallet/credits (optional) with balance and ledger.
- Support tickets for failed/contested recharges.
- Admin dashboards and CRUD for catalog (operators, plans, offers).

## Navigation Flow (happy path)
1) User lands → login/signup.
2) Enters mobile number, detects/selects operator & circle.
3) Picks prepaid/postpaid tab → browses/searches plans → selects plan.
4) Applies promo (optional) → payment method selection → pay.
5) Payment success triggers recharge; show confirmation with IDs and amount.
6) User dashboard shows latest recharge and history; can download receipt or retry failed payments.
7) Admin dashboard monitors transactions, edits plans/offers, handles tickets.

## Wireframe Sketches (ASCII)

### Login / Signup
```
+--------------------------------------+
|  Logo                                |
|  [ Email ]                           |
|  [ Password ]          (Forgot?)     |
|  ( Login )             (Signup link) |
|  [ Continue with Google ]            |
+--------------------------------------+
```

### Mobile Number & Operator
```
+--------------------------------------+
|  Enter Number: [ +91 |__________ ]   |
|  Operator: [Auto-detected v]         |
|  Circle:   [Select v ]               |
|  Buttons: (Prepaid) (Postpaid)       |
|  [ Continue to Plans ]               |
+--------------------------------------+
```

### Plan Selection
```
+--------------------------------------------------+
| Tabs: Prepaid | Postpaid | Offers                |
| Filters: [Price v] [Data v] [Validity v] [Sort]  |
| ------------------------------------------------ |
| Plan Card:  ₹199 | 1.5GB/day | 28d | Details >   |
| Plan Card:  ₹399 | 2GB/day  | 56d | Details >    |
| ...                                              |
| [ Select ] moves to payment summary              |
+--------------------------------------------------+
```

### Payment Page
```
+--------------------------------------+
|  Plan: ₹199 | 1.5GB/day | 28d        |
|  Promo Code: [____] (Apply)          |
|  Methods: (UPI) (Card) (NetBanking)  |
|  [ Pay ₹199 ]                        |
|  Secure badge + support link         |
+--------------------------------------+
```

### Recharge Confirmation
```
+--------------------------------------+
|  Success! ✅                          |
|  Mobile: +91-98xxxxxx12              |
|  Plan: ₹199 | Txn ID: TX12345        |
|  Status: Recharge Initiated/Done     |
|  [ Download Receipt ] [ Go to Dashboard ]
+--------------------------------------+
```

### User Dashboard
```
+--------------------------------------------------+
|  Balance/Wallet | Last Recharge | Quick Recharge |
|  Recent History (table)                           |
|  Date | Plan | Amount | Status | Actions         |
|  Filters: [Date] [Status] [Operator]              |
+--------------------------------------------------+
```

### Admin Dashboard
```
+--------------------------------------------------+
|  KPIs: Total Recharges | Failures | Revenue      |
|  Charts: Volume over time | Top Plans            |
|  Management: [Plans] [Offers] [Operators] [Users]|
|  Support Tickets (list with status)              |
+--------------------------------------------------+
```

## Notes
- Build MERN: MongoDB (recharges, users, plans, tickets), Express/Node for APIs and operator integrations, React for UI.
- Use environment-based configs for payment gateways and operator endpoints; mock APIs for dev.
- Prefer server-side validation plus client hints to reduce failed transactions.
