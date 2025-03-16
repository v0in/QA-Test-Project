Celtra QA Automation Test

This repository contains an automated test script for Celtra's QA evaluation, written using CodeceptJS for end-to-end testing.

📌 Project Overview

The test script celtra_test.js performs automated validation of a banner ad within an iframe to ensure its correct rendering and functionality.

🛠 Tech Stack

CodeceptJS (Test framework)

Playwright (Browser automation)

Node.js (JavaScript runtime)

GitHub Actions (CI/CD - optional for test execution)

🚀 Getting Started

Prerequisites

Ensure you have the following installed:

Node.js (LTS version recommended)

npm (Comes with Node.js)

Git (For cloning the repository)

Installation

Clone the repository and install dependencies:

NPM required
npm install

Running the Test

Execute the test with:

npx codeceptjs run --steps

To run the test in headless mode (without opening a browser):

npx codeceptjs run --headless --steps

To run the test in multiple browsers (Chrome, Firefox, WebKit):

npx codeceptjs run-multiple parallel

🏗 Test Scenarios

1️⃣ Creative Filtering Test

Verifies filtering functionality within the Celtra interface.
Checks that creatives update correctly when filters are applied (Format, Size, etc.).
Ensures the reset button restores all creatives.

2️⃣ Creative Sorting Test
Validates default and custom sorting mechanisms.
Confirms that creatives are sorted by "Last Modified" order by default.
Checks sorting by size (Larger to Smaller) and verifies order consistency.

3️⃣ Creative Data Validation Test
Ensures correct banner rendering within an iframe.
Verifies that the text "Banner" is present inside the 300×250 Universal Banner.
Handles iframe interactions and grabs text from within the embedded content.

🐞 Debugging & Troubleshooting

If a test fails, check the CodeceptJS logs for details.

Use headless mode to run tests in the background.

Run in specific browsers using Playwright (npx codeceptjs run --browser=firefox).

👤 Author

V0in

