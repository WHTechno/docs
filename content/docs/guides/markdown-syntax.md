# Markdown Syntax Guide

This guide covers the supported Markdown syntax in our documentation system.

## Basic Formatting

### Text Formatting

- **Bold text** using `**bold**`
- *Italic text* using `*italic*`
- ~~Strikethrough~~ using `~~strikethrough~~`
- `Inline code` using backticks

### Headers

```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
```

## Lists

### Unordered Lists

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

## Code Blocks

### Inline Code

Use `backticks` for inline code.

### Code Blocks with Syntax Highlighting

#### JavaScript

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

#### Python

```python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

#### Linux Commands

```bash
# System information
uname -a
whoami
pwd

# File operations
ls -la
cp file1.txt file2.txt
mv old_name.txt new_name.txt
rm unwanted_file.txt

# Process management
ps aux
top
kill -9 1234

# Network commands
ping google.com
curl -X GET https://api.example.com
wget https://example.com/file.zip
```

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |
| Row 3, Col 1 | Row 3, Col 2 | Row 3, Col 3 |

### Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Text | Text | Text |

## Links and Images

### Links

- [External link](https://example.com)
- [Internal link](./installation.md)

### Images

![Alt text](https://placehold.co/400x200?text=Sample+Image)

## Blockquotes

> This is a blockquote.
> 
> It can span multiple lines.
> 
> > This is a nested blockquote.

## Horizontal Rules

---

## Task Lists

- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task

## Advanced Features

### Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

### Definition Lists

Term 1
: Definition for term 1

Term 2
: Definition for term 2
: Another definition for term 2
