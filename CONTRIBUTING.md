# Contributing to StartingPoints

First off, thank you for considering contributing to StartingPoints! It's people like you that make StartingPoints such a great tool for the developer community.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Adding New Rule Files

We're always looking to expand our collection of rule files! Here's how to add new ones:

1. **Create the markdown file** in `templates/` directory
   - Follow the existing naming convention (e.g., `framework-name.md`)
   - Use clear, concise language
   - Include practical examples where helpful

2. **Update the mappings** in `lib/markdown-loader.ts`:
   ```typescript
   const TECH_FILE_MAPPINGS: Record<string, string> = {
     // Add your mapping here
     'your-tech': 'your-tech.md',
   }
   ```

3. **Test your rules**:
   - Run the development server
   - Generate rules with your new file
   - Verify the output is correct

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes**:
   - If you've added code, add tests if applicable
   - Ensure your code follows the existing style
   - Make sure your code lints
3. **Write a good commit message**:
   - Use the present tense ("Add feature" not "Added feature")
   - Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
   - Limit the first line to 72 characters or less
4. **Submit the pull request**:
   - Include a description of what you've done
   - Link any relevant issues

## Development Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/your-username/startingpoints.git
   cd startingpoints
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Make your changes** and test them thoroughly

6. **Run the linter**:
   ```bash
   npm run lint
   ```

7. **Build the project**:
   ```bash
   npm run build
   ```

## Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Prefer functional components and hooks for React

### CSS/Styling

- Use Tailwind CSS classes when possible
- Follow the existing component patterns
- Keep styles consistent with the design system

### Markdown Files

For rule templates in the `templates/` directory:

- Start with a clear heading
- Use bullet points for lists
- Include code examples in code blocks
- Keep language clear and concise
- Focus on practical, actionable advice

## Project Structure

Understanding the project structure will help you make better contributions:

```
startingpoints/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── tool-selector.tsx  # Tool selection component
│   └── ...               # Other feature components
├── templates/             # Markdown rule templates
│   ├── react.md          # React best practices
│   └── ...               # Other rule templates
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   ├── rules-generator.ts # Core generation logic
│   └── ...               # Other utilities
└── types/                 # TypeScript definitions
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers. We're here to help!

## Recognition

Contributors will be recognized in our README. Thank you for helping make StartingPoints better!