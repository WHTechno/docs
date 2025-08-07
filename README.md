# Documentation Site

A modern, GitBook-like documentation website built with Next.js that automatically generates navigation from Markdown files.

## Features

- **Automatic Navigation**: Files are automatically added to the sidebar based on folder structure
- **GitHub Flavored Markdown**: Full support for tables, code blocks, task lists, and more
- **Copy Code Blocks**: Linux code blocks automatically include copy buttons
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, professional interface using Tailwind CSS and shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd documentation-site
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:8000](http://localhost:8000) in your browser.

## Adding Documentation

### Quick Start

1. Create a new Markdown file in the `content/docs` folder:
```bash
# Example: content/docs/my-new-page.md
```

2. Add your content using standard Markdown syntax:
```markdown
# My New Page

This is my documentation content.

## Code Example

```bash
ls -la
cd /home/user
```
```

3. The page will automatically appear in the navigation!

### Folder Structure

Organize your documentation using folders to create menu sections:

```
content/
  docs/
    introduction.md          # Appears as "Introduction"
    setup/
      installation.md       # Appears under "Setup" section
      configuration.md
    guides/
      getting-started.md     # Appears under "Guides" section
      advanced-usage.md
    api/
      authentication.md      # Appears under "API" section
      endpoints.md
```

### Markdown Features

The site supports GitHub Flavored Markdown including:

- **Headers** (`# ## ### ####`)
- **Text formatting** (bold, italic, strikethrough)
- **Lists** (ordered and unordered)
- **Code blocks** with syntax highlighting
- **Tables**
- **Links and images**
- **Blockquotes**
- **Task lists** (`- [x] completed task`)

### Code Blocks with Copy Buttons

Code blocks automatically include copy buttons:

```bash
# This will have a copy button
sudo apt update
sudo apt install nginx
systemctl start nginx
```

```javascript
// This will also have a copy button
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

## Project Structure

```
├── content/
│   └── docs/                 # Your Markdown documentation files
├── src/
│   ├── app/
│   │   ├── docs/
│   │   │   ├── layout.tsx    # Documentation layout with sidebar
│   │   │   ├── page.tsx      # Main docs page
│   │   │   └── [...slug]/
│   │   │       └── page.tsx  # Dynamic doc pages
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── CodeBlock.tsx     # Code block with copy functionality
│   │   ├── MarkdownRenderer.tsx # Markdown rendering component
│   │   └── ui/               # shadcn/ui components
│   └── lib/
│       └── docs.ts           # Documentation utilities
├── public/                   # Static assets
└── package.json
```

## Customization

### Styling

The site uses Tailwind CSS with a custom design system. You can customize:

- Colors and themes in `src/app/globals.css`
- Component styles in individual component files
- Layout and spacing throughout the application

### Navigation

The sidebar navigation is automatically generated from your folder structure. To customize:

- Modify `src/lib/docs.ts` for different file scanning logic
- Update `src/app/docs/layout.tsx` for different sidebar layouts
- Adjust `src/components/ui/sidebar.tsx` for styling changes

### Markdown Rendering

Customize how Markdown is rendered by modifying:

- `src/components/MarkdownRenderer.tsx` for custom component rendering
- `src/components/CodeBlock.tsx` for code block functionality

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Deploy to Other Platforms

The site generates static files and can be deployed to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add documentation if needed
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
