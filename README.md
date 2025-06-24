# StartingPoints

<p align="center">
  <img src="public/startingpoints-logo.png" alt="StartingPoints Logo" width="400">
</p>

<p align="center">
  <strong>Your Starting Point for AI-Powered Development</strong>
</p>

<p align="center">
  Generate customized rules files for Cursor, Claude, Windsurf, and Aider. Set the perfect foundation for your AI coding assistant with battle-tested best practices.
</p>

<p align="center">
  <a href="https://github.com/Emlembow/startingpoints/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/Emlembow/startingpoints">
  </a>
  <a href="https://github.com/Emlembow/startingpoints/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/Emlembow/startingpoints">
  </a>
  <a href="https://github.com/Emlembow/startingpoints/stargazers">
    <img alt="Stars" src="https://img.shields.io/github/stars/Emlembow/startingpoints">
  </a>
</p>

## 🚀 Features

- **Multi-Tool Support**: Generate rules for Cursor, Claude, Windsurf, and Aider from a single interface
- **Smart Presets**: Pre-configured setups for popular tech stacks (React, Vue, Angular, Laravel, FastAPI, etc.)
- **Customizable**: Build your own configuration by selecting specific technologies and best practices
- **Modern Formats**: 
  - Cursor: MDC format with `.cursor/rules/` structure
  - Claude: `CLAUDE.md` format
  - Windsurf: `.windsurfrules` format
  - Aider: `CONVENTIONS.md` with optional `.aider.yaml`
- **Best Practices**: Includes battle-tested patterns for code quality, security, performance, and more
- **Client-Side Only**: All generation happens in your browser - no data sent to servers
- **Open Source**: MIT licensed and open for contributions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **File Generation**: JSZip for creating archives

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Emlembow/startingpoints.git
cd startingpoints
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

1. **Select Your AI Tool**: Choose between Cursor, Claude, Windsurf, Aider, or generate for all tools
2. **Choose a Preset**: Pick from popular configurations or start with a custom setup
3. **Customize Tech Stack**: Select your frameworks, languages, and tools
4. **Add Best Practices**: Choose which development patterns to include
5. **Generate & Download**: Click generate to download your customized rules

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Rule Files

1. Create a new markdown file in the `files/` directory
2. Follow the existing format and structure
3. Update the mappings in `lib/markdown-loader.ts`
4. Test the generation with your new rules

### Adding New Features

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Reporting Issues

- Use the [GitHub Issues](https://github.com/Emlembow/startingpoints/issues) page
- Include detailed reproduction steps
- Add screenshots if applicable

## 📁 Project Structure

```
startingpoints/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature components
├── files/                 # Markdown rule files
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## 🔧 Configuration

### Adding Support for New Tools

1. Update `ToolType` in `components/tool-selector.tsx`
2. Add file format mappings in `lib/rules-generator.ts`
3. Create generation logic for the new format
4. Update the UI to include the new tool

### Adding New Best Practices

1. Create a markdown file in `files/`
2. Add mapping in `PRACTICE_FILE_MAPPINGS` in `lib/markdown-loader.ts`
3. Update the best practices selector component

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 🚧 Roadmap

- [ ] Add support for more AI coding tools
- [ ] Expand rule files for additional frameworks
- [ ] Add rule file validation
- [ ] Support for team rule templates

## 💬 Community

- Star the project on [GitHub](https://github.com/Emlembow/startingpoints)
- Report issues or request features via [GitHub Issues](https://github.com/Emlembow/startingpoints/issues)
- Contribute to the project by submitting PRs

---

<p align="center">
  Made with ❤️ by the StartingPoints community
</p>