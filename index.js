#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync } from "fs";
import path from "path";
import { z } from "zod";
import { fileURLToPath } from "url";

const mcpServer = new McpServer({ name: "bugForge", version: "2.0.0" });

export const currentFolder = path.dirname(fileURLToPath(import.meta.url));


mcpServer.registerTool("generate_defect",
    {
        description: `Generate a structured enterprise-grade defect report based on user-provided testing details.
        
User must provide:
- errorDetails (required): The error or issue observed

User can optionally provide any of these:
- masterScenario (optional): A combined free-form field containing test scenario, test steps, validation points, and any other details the user wishes to include,

- testScenario (optional): The scenario being tested
- testSteps (optional): Step by step actions performed

💡 Tip: Share a screenshot in the same message — BugForge will 
automatically include it in the defect analysis.`,


        inputSchema: {
            jiraTitle: z.string().optional().describe("Jira ticket title or summary"),
            errorDetails: z.string().describe("Error or issue observed during testing"),
            masterScenario: z.string().optional().describe("Combined field: test scenario + test steps + validation points + any other details"),
            testScenario: z.string().optional().describe("The scenario being tested"),
            testSteps: z.string().optional().describe("Step by step actions performed")
        }

    },
    async ({ jiraTitle, errorDetails, masterScenario, testScenario, testSteps }) => {

        // Read prompt fresh on every tool call
        let bugforgePrompt;
        try {
            bugforgePrompt = readFileSync(path.join(currentFolder, "bugforge_prompt.md"), "utf-8");
        } catch (err) {
            return {
                content: [{ type: "text", text: "BugForge error: Could not load bugforge_prompt.md. Please verify the file exists." }]
            };
        }


        if (!errorDetails.trim()) {
            return {
                content: [{ type: "text", text: "BugForge error: errorDetails cannot be empty." }]
            };
        }

        // Build context from whatever the user provided
        let context = "";

        if (jiraTitle) context += `Jira Title: ${jiraTitle}\n`;
        context += `Error Details: ${errorDetails}`;

        if (masterScenario) {
            context += `\nMaster Scenario: ${masterScenario}`;
        } else {
            if (testScenario) context += `\nTest Scenario: ${testScenario}`;
            if (testSteps) context += `\nTest Steps: ${testSteps}`;
        }

        const prompt = `${bugforgePrompt}\n\n---\n\n## Input Provided\n\n${context}`;

        return {
            content: [{ type: "text", text: prompt }]
        };
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);
    console.error("BugForge MCP server is running...");
}

main().catch(console.error);