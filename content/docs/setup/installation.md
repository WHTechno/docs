# Installation Guide

This guide will help you set up the documentation system.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/docs-site.git
cd docs-site
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Build for Production

```bash
npm run build
npm start
```

## Configuration

The documentation system automatically scans the `content/docs` folder for Markdown files.

### File Structure

```
content/
  docs/
    introduction.md
    setup/
      installation.md
      configuration.md
    guides/
      getting-started.md
      advanced-usage.md
```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SITE_NAME="My Documentation"
NEXT_PUBLIC_SITE_URL="https://docs.example.com"
```

## Troubleshooting

If you encounter issues:

1. Clear the cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node.js version: `node --version`
