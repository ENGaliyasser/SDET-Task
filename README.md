# SDET-Task

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/ENGaliyasser/SDET-Task/tree/main.svg?style=svg\&circle-token=CCIPRJ_DAJQBoT1YHdpJeTToMKGQr_ff5e6d7e59008e04d954be8bbccead2883a5d3df)](https://dl.circleci.com/status-badge/redirect/gh/ENGaliyasser/SDET-Task/tree/main)

📌 **Author**: [Ali Yasser Ali Abdallah](https://www.linkedin.com/in/engaliyasser/)
📧 **Email**: [engaliyasser7@gmail.com](mailto:engaliyasser7@gmail.com)
📱 **Phone**: [+20 01154784667](tel:+201154784667)
📂 **Repository**: [ENGaliyasser/SDET-Task](https://github.com/ENGaliyasser/SDET-Task)

---

## 📖 Project Overview

This repository contains **UI and API automated tests** for different scenarios, implemented using:

* **UI Automation** → [NightwatchJS](https://nightwatchjs.org/) (Page Object Model, no hardcoded selectors)
* **API Automation** → [Supertest](https://github.com/ladjs/supertest) + Jest/Mocha
* **Reports** → HTML/XML + PDF for bugs/test cases
* **CI/CD** → [CircleCI](https://circleci.com/) pipeline (UI → API sequentially)

---

## 📂 Project Structure

```plaintext
.
├── .circleci/
│   └── config.yml
├── api-tests
│   ├── __tests__                  # API tests (Supertest + Jest/Mocha)
│   ├── html_reports               # API HTML/XML reports
│   └── utils                      # App/client setup, helpers
├── ui-tests
│   ├── data                       # Test data (LinkedIn registration JSON)
│   ├── html_reports               # UI HTML reports
│   ├── pages                      # Page Objects (NightwatchJS)
│   ├── screenshots                # Failure screenshots
│   ├── tests                      # Nightwatch test scripts
│   └── nightwatch.conf.js         # Nightwatch config
├── reports
│   ├── bug_reports                # Bug reports (PDF)
│   └── test_cases                 # Test cases (PDF)
├── package.json
└── README.md
```

---

## 📑 Deliverables

### 🔹 HTML Reports

* [UI HTML Reports](ui-tests/html_reports/)
* [API HTML Reports](api-tests/html_reports/)

### 🔹 PDF Reports

* [📄 Bug Reports (PDF)](reports/bug_report.pdf)
* [📄 Test Cases (PDF)](reports/test_cases.pdf)

### 🔹 Task Mapping

* **Task 1 – Sample Site Review Automation**

  * [Navigation Page Object](ui-tests/pages/task1_navigation_page.js)
  * [Navigation Test](ui-tests/tests/task1_navigation.test.js)

* **Task 2 – LinkedIn Registration**

  * [User Data](ui-tests/data/task2_linkedin_user.json)
  * [Page Object](ui-tests/pages/task2_linkedin_register_page.js)
  * [Test Script](ui-tests/tests/task2_linkedin_register.test.js)

* **Task 3 – My Store (multiformis.com)**

  * [Search Page Object](ui-tests/pages/task3_my_store_search_page.js)
  * [Search Test](ui-tests/tests/task3_my_store_search.test.js)

* **Task 4 – API Tests (mock-user-auth + Supertest)**

  * [API Test Scripts](api-tests/__tests__/)

---

## ⚙️ Setup & Installation

### ✅ Requirements

* [Node.js LTS (>=18)](https://nodejs.org/en/download/)
* [Google Chrome (latest)](https://www.google.com/chrome/)

### 🚀 Install Dependencies

```bash
npm install
```

---

## 🧪 Running Tests

### UI Tests

```bash
npm run test:UI
```

### API Tests

* **Linux/Unix**

```bash
npm run test:API:unix
```

* **Windows PowerShell**

```bash
npm run test:API:win
```

---

## 🔍 Run Individual API Routes

You can also run the mock server and target specific routes:

1. Start the server:

```bash
npm run dev
```

2. Run route-specific tests:
   
| Route        | Command                   |
|--------------|---------------------------|
| Create       | `npm run test:create`     |
| Authenticate | `npm run test:authenticate` |
| Read         | `npm run test:read`       |
| Update       | `npm run test:update`     |
| Delete       | `npm run test:delete`     |

---

## 📌 Notes

* LinkedIn automation may trigger anti-bot checks → test asserts security verification page.
* Some tests are **expected to fail** intentionally (to surface known defects).
* `coverage/`, `logs/`, and `node_modules/` are excluded via `.gitignore`.

