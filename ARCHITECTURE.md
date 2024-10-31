## Overview

Quartiles Solver is built with Deno and Fresh. The application allows users to
input word parts and generate a list of valid words to achieve an expert score
in Quartiles on Apple News+.

## Directory structure

```
.
├── .devcontainer/
│   ├── devcontainer.json
│   ├── docker-compose.yml
│   └── Dockerfile
├── .github/
│   ├── dependabot.yml
│   └── .gitignore
├── .vscode/
│   ├── extensions.json
│   ├── settings.json
│   └── tailwind.json
├── components/
│   └── ResultsContainer.tsx
├── islands/
│   └── QuartileSolver.tsx
├── routes/
│   ├── _404.tsx
│   ├── _app.tsx
│   ├── about.tsx
│   ├── index.tsx
├── static/
│   ├── logo.svg
│   └── styles.css
├── .gitignore
├── deno.json
├── dev.ts
├── fresh.config.ts
├── fresh.gen.ts
├── main.ts
├── README.md
└── tailwind.config.ts
```

## Routes

### Main routes

- `GET /`: Render the main interface for inputting word parts.
- `POST /`: Process the input word parts and return a list of valid words.

## Configuration

### Deno configuration

The project uses `deno.json` for configuration, including tasks for formatting,
linting, building, and running the project.

### Fresh configuration

The `fresh.config.ts` file defines the configuration for the Fresh framework,
including plugins like Tailwind CSS.

### Docker configuration

The `.devcontainer` directory contains the Docker configuration files for
setting up the development environment.

## Development

### Running the project

To start the project, run:

```sh
deno task start
```

This will watch the project directory and restart as necessary.

### Building the project

To build the project, run:

```sh
deno task build
```

### Previewing the project

To preview the project, run:

```sh
deno task preview
```
