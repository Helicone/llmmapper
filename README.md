# LLM Mapper

LLM Mapper is an open-source project that allows seamless integration between OpenAI and Anthropic's Claude models. It acts as a bridge, translating API calls on-the-fly, enabling developers to leverage Claude's capabilities without changing their existing OpenAI-based codebase.

## Features

- Seamless integration with existing OpenAI codebase
- Access to Anthropic's powerful Claude models
- No code changes required in your application
- Support for both streaming and non-streaming responses
- Open-source and free to use

## Getting Started

To use LLM Mapper in your project, follow these simple steps:

1. Change the base URL in your OpenAI configuration:

```typescript
const openai = new OpenAI({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://gateway.llmmapper.com/oai2ant/v1",
});
```

2. Start using Claude models:

```typescript
const chatCompletion = await openai.chat.completions.create({
  model: "claude-3-opus-20240229",
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: "Tell me a short joke about programming.",
    },
  ],
  max_tokens: 100,
  stream: true,
});
```

# How It Works

LLM Mapper intercepts your OpenAI API calls and translates them to Anthropic's API format. It handles both request and response transformations, ensuring compatibility between the two APIs.

# Project Structure

worker/: Contains the Cloudflare Worker code for handling API requests
web/: Next.js-based website for project documentation
src/providers/: Implementation of OpenAI and Anthropic API interfaces
src/router/: Request routing and processing logic

# Contributing

We welcome contributions from the community! Here are some ways you can help:
Report bugs: If you find a bug, please open an issue with a clear description and steps to reproduce.
Suggest enhancements: Have ideas for new features? Open an issue to discuss them.
Submit pull requests: Feel free to work on open issues or your own improvements and submit a PR.

# Development Setup

Clone the repository:

```bash
git clone https://github.com/llmmapper/llmmapper.git
```

Install dependencies:

For the worker:

```bash
cd worker
yarn
```

Run tests:

```bash
yarn test
```

Start the development server:

```bash
yarn dev
```

# Coding Standards

We use TypeScript for type safety
Follow the existing code style (enforced by ESLint and Prettier)
Write unit tests for new features or bug fixes

# Supported and Tested Models

| Source    | Normal      | Streaming   | Tested Models                                                                                                     | Notes                    |
| --------- | ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------ |
| Anthropic | ✅          | ✅          | claude-3-opus-20240229, claude-3-sonnet-20240229, claude-3-haiku-20240307, claude-2.1, claude-3-5-sonnet-20240620 | Launched Beta 09/04/2024 |
| Gemini    | Coming soon | Coming soon | n/a                                                                                                               | n/a                      |

# Future Plans

Add support for Gemini models
Implement more OpenAI API features
Improve error handling and logging
