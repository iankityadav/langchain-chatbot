# LangChain Chatbot with Llama3.1, Redis & Docker

A complete Node.js chatbot project using LangChain.js with Llama 3.1 model, Redis-backed memory, and custom tools.

## Features

- **LangChain.js** integration with Ollama (Llama 3.1)
- **Redis-backed memory** for persistent chat history
- **Custom tools** for policy management (getPolicyInfo, updatePolicyStatus)
- **Web UI** with real-time chat interface
- **Docker Compose** setup for easy deployment

## Prerequisites

1. **Install Ollama** and pull the Llama 3 model:
   ```bash
   ollama run llama3
   ```

2. **Docker & Docker Compose** installed on your system

## Quick Start

1. **Clone/extract the project**
2. **Run the complete stack:**
   ```bash
   docker-compose up --build
   ```
3. **Open browser:** [http://localhost:3000](http://localhost:3000)
4. **Start chatting!** Try asking: "Show me policy details for policy 123"

## Services

- **Chatbot**: http://localhost:3000 (Main app + Web UI)
- **Mock API**: http://localhost:3001 (Policy data)
- **Redis**: localhost:6379 (Memory storage)

## Project Structure

```
├── index.js              # Main chatbot server
├── mockApi.js            # Mock policy API
├── index.html            # Chat web interface
├── package.json          # Dependencies
├── Dockerfile            # Node.js container
├── docker-compose.yml    # Multi-service setup
└── README.md            # This file
```

## Usage Examples

- "Show me policy details for policy 101"
- "Update policy 101 status to inactive"
- "What is the coverage for policy 123?"

## Customization

- Add more tools in `index.js`
- Modify policy data structure in `mockApi.js`
- Enhance UI styling in `index.html`
- Adjust Redis TTL and session management

## Stopping

```bash
docker-compose down
```
