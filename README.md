# Systems Thinking for All Course

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](docs/license.md)
[![MkDocs](https://img.shields.io/badge/powered_by-MkDocs-blue)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/theme-Material_for_MkDocs-blue)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/hosted_on-GitHub_Pages-blue)](https://pages.github.com/)


A comprehensive set of resources for teaching systems thinking to a wide variety of audiences from high-school students to business executives. This version also has extensive use of causal loop graph diagrams and examples from areas like business, education, and healthcare.  We also have extensive content on how break down organizational silos. This interactive documentation site includes educational content, simulations, and AI prompts to help both students and professionals apply systems thinking concepts.

**📖 [View Documentation](https://dmccreary.github.io/systems-thinking/)**

## Features

- Interactive simulations using p5.js and vis.js
- Causal loop diagram generators
- Systems thinking archetypes and patterns
- AI prompts for knowledge graph development
- Capability maturity model strategies
- Real-world case studies and examples

## Quick Start

### Prerequisites

- Python 3.x
- Virtual environment tool (conda, venv, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dmccreary/systems-thinking.git
   cd systems-thinking
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv mkdocs-env
   source mkdocs-env/bin/activate  # On Windows: mkdocs-env\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip3 install mkdocs mkdocs-material
   ```

4. Start the development server:
   ```bash
   mkdocs serve
   ```

5. Open your browser to http://localhost:8000

### Building for Production

```bash
mkdocs build
```

### Generate E-book

```bash
./docs/mk-ebook.sh
```
Output will be available at `/tmp/full-book.epub`

## Project Structure

```
├── docs/                    # Main content directory
│   ├── intro/              # Introduction chapters (1-5)
│   ├── archetypes/         # Systems thinking patterns
│   ├── sims/               # Interactive simulations
│   ├── prompts/            # GenAI prompts
│   └── cmm-strategies/     # Maturity model strategies
├── theme/                  # Custom theme overrides
└── mkdocs.yml             # Site configuration
```

## Author

**Dan McCreary** - [LinkedIn](https://www.linkedin.com/in/danmccreary)

## Acknowledgments

This project builds upon the work of many open source projects and communities:

- **[p5.js](https://p5js.org/)** - Creative coding library developed by the Processing Foundation and NYU's Interactive Telecommunications Program
- **[MkDocs](https://www.mkdocs.org/)** - Fast, simple static site generator
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful documentation theme
- **[vis.js](https://visjs.org/)** - Dynamic visualization library for networks and graphs
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source projects

Special thanks to the p5.js team at NYU for creating such an accessible platform for creative coding and interactive visualizations.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License - see the [license.md](docs/license.md) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.