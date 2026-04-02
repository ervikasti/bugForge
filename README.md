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

**Missing folder structure**

bugForge/
├── src/
│   └── index.js
|── bugforge_prompt.md
│── template.json
├── package.json
├── README.md
└── LICENSE

## Prerequisites
- Node.js v18 or higher
- Claude.ai account (Free or Pro)
- Claude Desktop app

1. How Does it work ?
BugForge works inside LLM-connected MCP clients (like Claude.ai).
It assembles a structured prompt from your inputs — the host LLM 
then generates the final defect report automatically. No API key required.

2. How do I install it?
git clone https://github.com/ervikasti/bugForge.git
cd bugforge
npm install

3. How do I connect it to Claude? 
(User shall refer how there MCP client connect to MCP Server)
// Add to your claude_desktop_config.json
{
  "mcpServers": {
    "bugforge": {
      "command": "node",
      "args": ["/path/to/bugforge/src/index.js"]
    }
  }
}

4. How do I use it ?

Just describe your bug in Claude:

"Generate a defect report — user clicks checkout, 
payment succeeds but order stays pending"

BugForge will produce a Jira-ready report automatically.

### The Customization Section (Differentiator of the project)

## Customize for Your Project

Edit config/prompt.md to change the report format, tone, or rules.
Edit config/template.json to add your environments, channels, or 
team-specific fields.

BugForge is built to be adapted — make it yours.


