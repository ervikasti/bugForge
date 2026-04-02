![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![MCP](https://img.shields.io/badge/MCP-Compatible-blue)
![npm](https://img.shields.io/badge/npm-ready-red)

# BugForge 
BugForge is an open-source MCP server for AI-powered QA defect reporting.

Drop in your test scenario and error details — BugForge generates a complete 
Jira defect report with business context, reproduction steps, failure 
classification, and priority. Fully config-driven via prompt.md and 
template.json. Customize the format, tone, and fields to match your team's 
standards.

Zero API key required. Works natively inside Claude.ai.

**Folder structure**
```
bugForge/
├── index.js
├── bugforge_prompt.md
├── package.json
├── README.md
└── LICENSE
```

## Prerequisites
- Node.js v18 or higher
- Claude.ai account (Free or Pro)
- Claude Desktop app

## Working
### How Does it work ?
BugForge works inside LLM-connected MCP clients (like Claude.ai).
It assembles a structured prompt from your inputs — the host LLM 
then generates the final defect report automatically. No API key required.

### How do I install it?
```
git clone https://github.com/ervikasti/bugForge.git
cd bugforge
npm install
```

### How do I connect it to Claude Desktop? 

    1. Open your Claude Desktop config file:
    
       - **Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
       - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
    
    2. Add BugForge under `mcpServers`:
    
    \```json
    {
      "mcpServers": {
        "bugforge": {
          "command": "node",
          "args": ["/absolute/path/to/bugForge/src/index.js"]
        }
      }
    }
    \```
    
    3. Restart Claude Desktop

### How do I use it ?

Just describe your bug in Claude:

"Generate a defect report — user clicks checkout, 
payment succeeds but order stays pending"

BugForge will produce a Jira-ready report automatically.

### Customize for Your Project

- Edit `bugforge_prompt.md` to change the report format, tone, or rules.
- Edit `template.json` to add your environments, channels, or team-specific fields.

BugForge is built to be adapted — make it yours.


## Sample Output

<details>
<summary>Click to see a sample BugForge defect report</summary>

**Input provided to Claude:**
```
Generate a defect report — 
Scenario: User completes payment via gateway, gateway returns SUCCESS 
but order remains in PENDING state and UI shows no update.

Error: Payment gateway response: SUCCESS | Order status remains: PENDING 
| Payment status not updated in UI | No failure message shown to user
```

**BugForge generated report:**
```
Business Context
This issue occurs at the final stage of the payment flow — after the user 
submits payment and the gateway confirms success. The order status update 
is a critical post-payment operation. Failure at this step means the system 
accepts payment but does not fulfil the transaction, directly breaking the 
order management capability.

Preconditions
User must have a valid account, items added to cart, and access to a 
payment method accepted by the gateway.

Steps to Reproduce
* Navigate to the checkout page.
* Add items to cart and proceed to payment.
* Enter valid payment details and submit.
* Payment gateway returns a SUCCESS response.
* Verify order status in the UI.

Actual Result
Payment gateway response: SUCCESS. Order status remains: PENDING. 
Payment status not updated in UI. No failure message shown to user.

Expected Result
After gateway returns SUCCESS, order status should update to CONFIRMED 
and payment status should reflect as PAID in both the UI and system.

Business Impact
User has completed payment but order remains pending — creating a ghost 
transaction scenario. Causes customer confusion and potential duplicate payments.

Failure Classification & Priority
* Classification: Functional — Post-payment State Sync Failure
* Priority: High
```

</details>
