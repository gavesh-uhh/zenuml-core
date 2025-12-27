![editor](./docs/images/editor-sample.png)

# ZenUML/Core - Enhanced Fork with AI Generation

This is an enhanced fork of [mermaid-js/zenuml-core](https://github.com/mermaid-js/zenuml-core) with additional features.

## 🌟 What's Different in This Fork

### 🤖 AI-Powered Diagram Generation
- **Google Gemini 2.0 Integration**: Generate sequence diagrams from natural language descriptions using Google's Gemini 2.0 Flash model
- **Intelligent Code Generation**: Simply describe your use case, and the AI will create syntactically correct ZenUML diagrams
- **Interactive Editor**: Real-time preview and editing capabilities with CodeMirror

### 🔒 Enhanced Security
- **Environment Variables**: API keys are now managed through environment variables instead of hardcoded values
- **Secure Configuration**: Uses `VITE_GENAI_API_KEY` environment variable for Google GenAI API authentication

### 🚀 Modern Stack
- **Vue.js 3.x**: Built with Vue.js 3.x for component-based UI (vs React 19 in upstream)
- **pnpm Package Manager**: Uses pnpm for efficient dependency management
- **Docker Support**: Full Docker containerization for easy deployment

---

## About ZenUML

ZenUML is JavaScript-based diagramming tool that requires **no server**. It uses Markdown-inspired text definitions
and a renderer to create and modify sequence diagrams. The main purpose of ZenUML is to
help documentation catch up with development.

ZenUML allows even non-programmers to easily create beautiful sequence diagrams through
the [ZenUML Live Editor](https://app.zenuml.com).

You can use ZenUML on your favorite platforms and applications:

- [Confluence](https://marketplace.atlassian.com/apps/1218380/zenuml-diagrams-for-confluence-freemium?hosting=cloud&tab=overview)
- [Web App](https://app.zenuml.com/)
- [JetBrains Plugin](https://plugins.jetbrains.com/plugin/12437-zenuml-support)
- [Chrome Extension](https://chrome.google.com/webstore/detail/zenuml-sequence/kcpganeflmhffnlofpdmcjklmdpbbmef)

# Integrations

ZenUML can be integrated with your favorite tools and platforms as a library or an embeddable widget.
Please follow the [integration guide](./docs/asciidoc/integration-guide.adoc) for detailed steps.

---

## 🚀 Quick Start

### Prerequisites

These are the tools we use for working with the code and documentation:

- [volta](https://volta.sh/) to manage node versions
- [Node.js](https://nodejs.org/en/) - `volta install node`
- [pnpm](https://pnpm.io/) package manager - `volta install pnpm`
- [npx](https://docs.npmjs.com/cli/v8/commands/npx) the packaged executor in npm

### Setting Up AI Features

To use the AI-powered diagram generation feature:

1. **Get a Google GenAI API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Create or sign in to your account
   - Generate an API key

2. **Configure Environment Variables**:
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your API key:
   ```bash
   VITE_GENAI_API_KEY=your_api_key_here
   ```
   
   ⚠️ **Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gavesh-uhh/zenuml-core.git
   cd zenuml-core
   ```

2. **Install dependencies**:
   ```bash
   npx pnpm install  # npx is required for first install
   ```

3. **Set up your API key** (see above)

4. **Launch the development server**:
   ```bash
   npx pnpm run dev
   ```

5. **Open your browser** to `http://localhost:8080`

### Using AI Generation

Once the application is running:

1. Look for the input box at the top of the editor (placeholder: "Generate with Gemini 2.0")
2. Type a natural language description of your sequence diagram, for example:
   - "User logs into the system and checks their profile"
   - "Order processing system with payment validation"
   - "Microservice authentication flow"
3. Click the ✨ button or press Enter
4. Watch as the AI generates a complete ZenUML diagram!

### Example Prompts

Try these prompts to see the AI in action:

- **Simple Login**: "User enters credentials and system validates them"
- **E-commerce**: "Customer adds items to cart, proceeds to checkout, and makes payment"
- **API Flow**: "Client sends request to API gateway, which authenticates and forwards to backend service"

# Development

## For Contributors

### Technical Requirements

These are the tools we use for working with the code and documentation:

- [volta](https://volta.sh/) to manage node versions.
- [Node.js](https://nodejs.org/en/). `volta install node`
- [pnpm](https://pnpm.io/) package manager. `volta install pnpm`
- [npx](https://docs.npmjs.com/cli/v8/commands/npx) the packaged executor in npm. This is needed [to install pnpm.](#install-packages)

Follow the setup steps below to install them and start the development.

### Switch to project

Once you have cloned the repository onto your development machine, change into the `zenuml-core` project folder (the top level directory of the @zenuml/core project repository)

```bash
cd zenuml-core
```

### Install packages

Run `npx pnpm install`. You will need `npx` for this because volta doesn't support it yet.

```bash
npx pnpm install # npx is required for first install
```

### Launch

```bash
npx pnpm run dev
```

## Technology Stack

This fork uses the following key technologies:

- **Frontend Framework**: Vue.js 3.x (vs React 19 in upstream)
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Parser**: ANTLR4 for ZenUML DSL
- **Styling**: Tailwind CSS + SCSS
- **AI Integration**: Google GenAI SDK (@google/genai)
- **Code Editor**: CodeMirror 5.x with Dracula theme

## Key Differences from Upstream

| Feature | This Fork | Upstream (mermaid-js/zenuml-core) |
|---------|-----------|-----------------------------------|
| **UI Framework** | Vue.js 3.x | React 19 |
| **Package Manager** | pnpm | bun |
| **AI Features** | ✅ Google Gemini 2.0 integration | ❌ None |
| **Environment Config** | ✅ .env file support | ❌ None |
| **Editor Theme** | Dracula | Material Darker |
| **Documentation** | integration-guide.adoc | TUTORIAL.md |
| **Export Feature** | JPEG export via html-to-image-more | PNG export via html-to-image |

## CI/CD

CI/CD is done with GitHub Actions. The workflow is defined in `.github/workflows/*.yml`.

## gh-pages.yml

This workflow has two jobs: `build` -> `deploy`.

```text
test  -> npm publish
      -> cy tests
      -> build site -> deploy gh-pages
```

This workflow is triggered on every push to the `main` branch.
It will build the project and publish the `dist` folder to the `gh-pages` branch.

## Put localhost on the internet

We sometimes need to put our localhost on the internet so that we can test it remotely.

Ngrok is a good tool for this. It is free for personal use. But if you want to use a
custom domain, you have to pay. If you want to use custom domain, we suggest Cloudflare
tunnels for this.

### Ngrok [TODO]

### Cloudflare tunnels [for collaborators only]

1. Start your local dev server at `8080` with `pnpm dev`.
2. Request a subdomain from the team. For example, `air.zenuml.com`.
3. You will be given a command that install a service locally. Run it.
4. Your localhost:8080 will be available at `air.zenuml.com`.

### Docker

#### Running with Docker

To run the application using Docker, follow these steps:

1. **Build the Docker image**:
   Navigate to the root directory of the project and run the following command to build the Docker image:

   ```bash
   docker build -t zenuml-core .
   ```

2. **Run the Docker container**:
   After building the image, you can run the Docker container with the following command:

   ```bash
   docker run -p 8080:8080 zenuml-core
   ```
   
   **With environment variables** (for AI features):
   ```bash
   docker run -p 8080:8080 -e VITE_GENAI_API_KEY=your_api_key_here zenuml-core
   ```

3. **Access the application**:
   Open your web browser and navigate to `http://localhost:8080` to access the application.

Make sure Docker is installed and running on your machine before executing these commands.

#### Docker Image Details

The Dockerfile uses a multi-stage build process:
- **Base**: Node.js 20-slim with pnpm configured
- **Dependencies**: Separate layers for production and development dependencies
- **Build**: Compiles the application for production
- **Runtime**: Serves the built application using `serve` on port 8080

This optimized build process ensures:
- ✅ Smaller final image size
- ✅ Faster rebuilds with layer caching
- ✅ Secure production deployment

# Code Structure

This repository contains both the DSL parser and the renderer.

The parser is generated with Antlr4. You can find the definition at `src/g4`. Generated parser is at `src/generated-parser`.
Parser enhancement with customised functionalities is in the `src/parser` folder.

Almost everything else under src are for the renderer. The renderer is based on **Vue.js 3.x**.

## Directory Structure

```
zenuml-core/
├── src/
│   ├── components/          # Vue.js components for diagram rendering
│   │   ├── DiagramFrame/   # Main diagram frame components
│   │   └── ...
│   ├── g4/                 # ANTLR4 grammar definitions
│   ├── generated-parser/   # Auto-generated parser code
│   ├── parser/             # Parser enhancements
│   ├── store/              # Vuex state management
│   ├── themes/             # Theme definitions
│   └── main.ts             # Application entry point
├── docs/                   # Documentation
├── public/                 # Static assets
├── index.html              # Main HTML with AI integration
├── Dockerfile              # Docker configuration
├── .env                    # Environment variables (not in git)
└── vite.config.ts          # Vite build configuration
```

## Dependencies

### Core Dependencies
- **@google/genai** & **@google/generative-ai**: Google Gemini AI integration
- **vue**: Vue.js 3.x framework
- **vuex**: State management for Vue.js
- **antlr4**: Parser runtime
- **tailwindcss**: Utility-first CSS framework
- **html-to-image**: Diagram export functionality
- **dompurify**: XSS protection for user-generated content

### Development Tools
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **vitest**: Unit testing framework
- **eslint** & **prettier**: Code quality and formatting

---

## 🔐 Security Considerations

### API Key Management
- ✅ API keys are stored in environment variables, not in code
- ✅ `.env` file is gitignored to prevent accidental commits
- ✅ `.env.example` template provided for easy setup
- ⚠️ **Important**: Always use environment variables for sensitive data
- ⚠️ Never share your `.env` file or API keys publicly

### Security Improvements in This Fork
- **Fixed**: Removed hardcoded API key from source code (replaced with environment variable)
- **Fixed**: Added .env to .gitignore to prevent future API key exposure
- **Added**: .env.example template for safe configuration

⚠️ **Note**: If you cloned this repository before the security fix, the old .env file with the API key may have been exposed. Please rotate your API keys if you were affected.

### XSS Protection
- Uses DOMPurify to sanitize user-generated content
- Validates and sanitizes AI-generated code before rendering

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Original ZenUML Core by [mermaid-js](https://github.com/mermaid-js/zenuml-core)
- Enhanced with AI capabilities by [Gavesh Saparamadu](https://github.com/gavesh-uhh)
- Powered by Google Gemini 2.0 Flash

---

## 📞 Support

For issues and questions:
- **Original ZenUML Issues**: [mermaid-js/zenuml-core/issues](https://github.com/mermaid-js/zenuml-core/issues)
- **Fork-specific Issues**: [gavesh-uhh/zenuml-core/issues](https://github.com/gavesh-uhh/zenuml-core/issues)

## 🔗 Related Links

- [ZenUML Documentation](https://zenuml.com/docs)
- [Google AI Studio](https://aistudio.google.com/)
- [Vue.js Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
