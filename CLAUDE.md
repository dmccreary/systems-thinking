# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a MkDocs-based documentation site for "Systems Thinking for Technologists" - a book about using systems thinking to promote enterprise knowledge graphs and break down organizational silos. The site includes educational content, interactive simulations, and AI prompts to help IT professionals apply systems thinking concepts.

## Development Commands

### Building and Serving the Site
- `mkdocs serve` - Start local development server at http://localhost:8000
- `mkdocs build` - Build static site for production

### Prerequisites
- Create virtual environment with Python 3
- Install dependencies: `pip3 install mkdocs mkdocs-material`

### E-book Generation
- `./docs/mk-ebook.sh` - Generates a full e-book (EPUB) from markdown files using pandoc
- Output: `/tmp/full-book.epub`

## Project Structure

### Content Organization
- `docs/` - Main content directory with all markdown files
- `mkdocs.yml` - Site configuration and navigation structure
- `theme/` - Custom theme overrides for material theme

### Key Content Areas
- `docs/intro/` - Introduction chapters (1-5) covering graphs, systems thinking, emergence
- `docs/archetypes/` - Systems thinking archetypes (tragedy of commons, AI flywheel, etc.)
- `docs/sims/` - Interactive simulations built with HTML5/JavaScript
- `docs/prompts/` - GenAI prompts for systems thinking applications
- `docs/cmm-strategies/` - Capability maturity model strategies

### Interactive Simulations
The site includes several JavaScript-based simulations using libraries like vis.js and p5.js:
- **Tragedy of the Commons** (`docs/sims/toc/`) - Agent-based simulation demonstrating resource depletion
- **Causal Loop Diagrams** (`docs/sims/agent-cld/`) - Interactive network diagrams showing system feedback loops
- **CMM Visualization** (`docs/sims/cmm/`) - Capability maturity model interactive content

### Technical Implementation
- Built with MkDocs using Material theme
- Custom theme directory for footer and styling overrides
- Markdown extensions: admonition, pymdownx.details, pymdownx.superfences, attr_list, md_in_html
- Repository: https://github.com/dmccreary/systems-thinking
- Deployment: GitHub Pages at https://dmccreary.github.io/systems-thinking/

## File Conventions
- All content files are in Markdown format
- Images stored in `docs/img/` directory
- HTML simulations include embedded CSS and JavaScript
- Navigation structure defined in `mkdocs.yml` nav section

## Content Focus
The site addresses enterprise knowledge graph adoption, organizational silo breaking, and systems thinking applications in technology contexts. Interactive elements help illustrate complex systems concepts through visual simulations and causal loop diagrams.