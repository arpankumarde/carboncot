# Product Requirements Document (PRD) — **CarbonCot**

## 1. Overview

**Product Name:** CarbonCot  
**Goal:** Build a simple prototype of a carbon credit marketplace (similar to [CarbonMark](https://www.carbonmark.com/buy-carbon-credits)) using dummy data.  
**Purpose:** Provide users a transparent platform to explore, buy, and retire carbon credits with instant retirement certificates.  
**Scope:** Prototype only (no real payments, no backend integrations).

---

## 2. Problem Statement

Carbon credits are difficult to navigate and verify online. Buyers seek an easy, transparent, and credible marketplace to:

- Browse verified carbon projects.
- View certification details and SDG benefits.
- Retire credits and instantly receive a certificate.

---

## 3. Core Objectives

- Enable browsing of carbon projects by category and country.
- Allow purchase and retirement of credits.
- Generate digital retirement certificates.
- Maintain credibility through standard and registry information.

---

## 4. Target Users

- Individuals offsetting personal carbon footprints.
- Businesses seeking ESG or CSR carbon offsetting.
- Sustainability enthusiasts evaluating carbon impact.

---

## 5. Key Features

### 5.1 Browse & Filter

- Filter projects by:
  - Country
  - Project type (Forestry, Renewable Energy, Infrastructure)
  - Certification (Verra, Gold Standard)
  - SDG goals supported
  - Price range

### 5.2 Project Listing Page

Each project card or page must display:

- Project Name
- Standard (Verra / Gold Standard)
- Methodology
- Project Type (Removal / Avoidance)
- Location (Country, Region)
- Vintage Year
- Credits Available
- Price per Credit
- Registry Link
- Certification Status
- SDG Goals Fulfilled

### 5.3 Retirement Process

**User Flow**

1. User selects a project and clicks **“Retire”**.
2. User inputs:
   - Number of credits (tons CO₂e)
   - Beneficiary name (optional)
   - Retirement purpose (e.g., air travel)
3. Dummy payment step (no real transactions).
4. Generate a **Retirement Certificate** instantly.
   - Includes Project name, Tons retired, Beneficiary, Serial numbers.

### 5.4 Certificate Generation

- Instant PDF or digital certificate.
- Shareable on social media.
- Includes:
  - Project details
  - Retirement amount
  - Date and unique certificate ID

### 5.5 Optional Enhancements

- “Add to Portfolio” or “Compare Projects”
- “View Registry Record” (dummy link)
- “Request Quote” (form pop-up)
- Display SDG icons for supported goals.

---

## 6. Data Model (Simplified)

### Table: Projects

| Field               | Type     | Description                  |
| ------------------- | -------- | ---------------------------- |
| project_id          | String   | Unique identifier            |
| name                | String   | Project name                 |
| standard            | String   | Verra, Gold Standard         |
| methodology         | String   | Standard methodology used    |
| project_type        | String   | Removal, Avoidance           |
| country             | String   | Project country              |
| region              | String   | Project region               |
| vintage_year        | Number   | Year of credit issuance      |
| credits_available   | Number   | Total credits                |
| price_per_credit    | Number   | Credit price (USD)           |
| certification_link  | String   | Registry / verification page |
| sdg_list            | [String] | Associated SDG Goals         |
| verification_status | Boolean  | True if verified             |

### Table: Retirements

| Field            | Type   | Description        |
| ---------------- | ------ | ------------------ |
| retirement_id    | String | Unique ID          |
| project_id       | String | Related project    |
| beneficiary_name | String | User input         |
| purpose          | String | Reason for offset  |
| credits_retired  | Number | Quantity retired   |
| retirement_date  | Date   | Timestamp          |
| certificate_id   | String | Linked certificate |

### Table: Certificates

| Field          | Type   | Description            |
| -------------- | ------ | ---------------------- |
| certificate_id | String | Unique ID              |
| retirement_id  | String | Reference              |
| issue_date     | Date   | Issued date            |
| serial_number  | String | Display on certificate |
| file_url       | String | Download link          |

---

## 7. User Journey

| Step | Action                       | Output                            |
| ---- | ---------------------------- | --------------------------------- |
| 1    | User visits homepage         | Sees list of carbon projects      |
| 2    | User filters results         | Projects listed by chosen filters |
| 3    | User clicks a project        | Opens project details             |
| 4    | User clicks “Retire”         | Fills out retirement details      |
| 5    | User “pays” (dummy)          | Purchase simulated                |
| 6    | System generates certificate | Download or share online          |

---

## 8. UI/UX Guidelines

- Minimal, card-based listing grid.
- Project cards must show price, project type, and certification.
- Simple modal or page for “Retire” flow.
- Certificate download button on success screen.
- Color cues:
  - Green for verified projects.
  - Gray for uncertified/dummy data.
- Responsive for desktop and mobile.

---

## 9. Non-Functional Details

- Dummy data only.
- No authentication, backend, or real registry integration.
- Basic dummy payment confirmation.
- Lightweight frontend prototype (can run on static hosting).

---

## 10. Deliverables

- Product prototype (front-end focus).
- Pre-filled dummy data JSON with at least 5 listings.
- Working flow:
  - Browse → Retire → Certificate.
- Downloadable dummy retirement certificate.

---

## 11. Out of Scope

- Real-time payments or APIs.
- Governance/verification integrations.
- Organization-level dashboards.
- Complex project comparison or analytics.

---

## 12. Success Criteria

- All listings contain mandatory fields.
- Functional mock of retirement flow.
- Instantly generated certificate.
- Viewable and testable UI (no broken paths).

---

## 13. Example Listing Format

**Project:** Urunday Afforestation Project  
**Standard:** Verra – VCS  
**Methodology:** VM0007 (Afforestation/Reforestation)  
**Project Type:** Carbon Removal  
**Location:** Corrientes Province, Argentina  
**Vintage Year:** 2022  
**Credits Available:** 125,000 tCO₂e  
**Price:** $12.80 / credit  
**Certifications:** Verified, Verra Registered  
**SDG Goals:** SDG 13 (Climate Action), SDG 15 (Life on Land)  
**Actions:** Buy Now | Retire | View Registry | Add to Portfolio

---

## 14. Step Summary

1. Browse projects
2. Filter by category / country
3. View details
4. Retire credits
5. Confirm purchase (dummy)
6. Generate and download certificate

---

**End of PRD**
