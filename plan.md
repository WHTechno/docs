Below is a detailed, step-by-step implementation plan to build a GitBook-like documentation website that automatically reads Markdown files, builds side menus from the folder structure, renders GitHub-flavored Markdown (including Linux code blocks with a “Copy” button), and integrates seamlessly with the existing Next.js project.

---

**1. Create a Dedicated Content Folder**

- Create a new folder at the project root called:
  
  content/docs  
  
 – This directory will hold all Markdown (.md) files. Organize documentation in subfolders if needed (e.g. content/docs/setup, content/docs/guides).

- Update README.md to instruct users that any new .md file added to this folder (or its subdirectories) will automatically be rendered on the website.

---

**2. Install Required npm Dependencies**

- Add the following packages (if not already installed) for markdown parsing and GitHub-flavored Markdown support:  
  - react-markdown  
  - remark-gfm  
  - (Optional) rehype-sanitize for sanitization

Example install command:  
  npm install react-markdown remark-gfm rehype-sanitize

---

**3. Create Utility Functions to Read Documentation Files**

File: src/lib/docs.ts  
 - Implement functions using Node’s fs and path modules (server side only):  
  - getDocPaths(): Recursively read the “content/docs” folder and return an array of file paths.  
  - getDocContent(slug: string[]): Given a dynamic route slug, construct the real file path (e.g. content/docs + joined slug + .md) and return the file content.  
  - getDocsTree(): Build a hierarchical tree structure representing directories and markdown files for the sidebar navigation.  
 - Wrap all file operations in try/catch blocks with meaningful error logging.

---

**4. Build a Markdown Renderer Component**

File: src/components/MarkdownRenderer.tsx  
 - Create a React component that:  
  - Accepts markdown text as a prop.  
  - Uses react-markdown with remark-gfm to support GitHub Markdown syntax.  
  - Overrides code block rendering by handing off code blocks to a custom CodeBlock component.  
 - Ensure proper fallback so that if markdown rendering fails, the raw text appears.

---

**5. Implement a Custom Code Block Component with “Copy” Functionality**

File: src/components/CodeBlock.tsx  
 - Develop a component that receives code content and language as props.  
 - Render the code block using a preformatted block with a “Copy” button in the top-right corner.  
  - Use a button styled with Tailwind CSS (modern typography, spacing, subtle borders) and text labels instead of icons.  
  - On click, attempt to use navigator.clipboard.writeText; on success, show a temporary “Copied!” message; on failure, log the error.  
 - Ensure the component is accessible (aria-label, role="button").

---

**6. Create Documentation Layout with an Automatic Sidebar**

File: src/app/docs/layout.tsx  
 - Set up a two-column layout:  
  — Left: Sidebar for navigation.  
  — Right: Main content area.  
 - Use (or create a new) sidebar component that does not reference external icon libraries (i.e. replace any lucide-react icons with text labels such as “Toggle”).  
 - In the sidebar, import and call getDocsTree() from src/lib/docs.ts to generate a nested menu.  
 - Use Next.js Link components for navigation, styled with Tailwind CSS for modern spacing, typography, and color (leveraging globals.css).

---

**7. Create the Documentation Overview and Dynamic Routes**

File: src/app/docs/page.tsx  
 - Build a landing page for documentation, which can:  
  - Render an “Introduction” section (if an introduction.md exists in content/docs).  
  - Display an overview list of all available docs using the auto-generated sidebar.
 - Import and render the MarkdownRenderer for any static content.

File: src/app/docs/[...slug]/page.tsx  
 - Create a dynamic route to render individual markdown pages:  
  - Use the slug from the URL to determine which markdown file to load (via getDocContent from src/lib/docs.ts).  
  - Render the content using MarkdownRenderer.  
  - If the file is not found, return a 404 page (or use Next.js notFound helper).  
 - Handle runtime errors gracefully with error boundaries.

---

**8. UI/UX Enhancements and Styling**

- Apply Tailwind CSS classes to ensure a modern and clean interface:
  - Use consistent typography, color, and spacing from globals.css.
  - In CodeBlock.tsx, ensure the “Copy” button is clearly visible and does not disrupt code layout.
  - In layout.tsx, ensure the sidebar remains responsive (use the existing useIsMobile hook to collapse on mobile devices).
  
- Do NOT use external icons; all buttons and toggles should use text labels or simple CSS shapes.

---

**9. Testing and Error Handling**

- Verify that adding a new .md file to content/docs automatically updates the navigation and renders the content.  
- Test the Copy button on various code blocks using manual browser testing.  
- Include try/catch and proper error messages to handle files not found or parsing errors in getDocContent() and getDocsTree().  
- Update documentation in README.md for developers and content editors.

---

**10. Final Integration and Documentation**

- Update README.md with instructions for adding documentation files and an overview of how the documentation website works.  
- Perform both browser-based testing and curl tests (if applicable to any API endpoints) to check that the dynamic docs pages load correctly and code copying works as expected.  
- Ensure that all new files are TypeScript typed and use template literals/string variables for any dynamic strings.

---

Summary:
- A new “content/docs” folder will hold all markdown files and define the content’s folder hierarchy.  
- A set of utility functions in src/lib/docs.ts will scan, read, and build the navigation tree.  
- A MarkdownRenderer component (with a custom CodeBlock subcomponent) will render GitHub-flavored Markdown and add a “Copy” button to Linux code blocks.  
- New Next.js routes (src/app/docs/page.tsx and src/app/docs/[...slug]/page.tsx) along with a layout (src/app/docs/layout.tsx) will form the documentation website, using a responsive sidebar without external icon libraries.  
- Error handling, accessibility, and modern styling with Tailwind CSS are embedded to meet best practices and real-world usage.
