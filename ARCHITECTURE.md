## Overview

Fresh Forum is a minimalistic forum software built using [Deno](https://deno.land) and [Fresh](https://fresh.deno.dev/). The application allows users to register, login, create posts, reply to posts, react with emojis, and categorize posts under various topics. Administrative roles enable user management and post moderation.

## Directory Structure (WIP)

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
│   └── Button.tsx
├── islands/
│   └── Counter.tsx
├── routes/
│   ├── _404.tsx
│   ├── _app.tsx
│   ├── about.tsx
│   ├── api/
│   └── index.tsx
├── static/
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

## Models

### User

- **Attributes**:
  - `id`: Unique identifier
  - `username`: String
  - `email`: String
  - `password`: Hashed string
  - `roles`: Array of roles (e.g., `moderates_posts`, `moderates_replies`, `moderates_topics`, `moderates_users`, `moderates_system`)
  - `created_at`: Timestamp
  - `updated_at`: Timestamp
  - `deleted_at`: Timestamp
- **Functions**:
  - `register()`: Register a new user
  - `login()`: Authenticate a user
  - `editUser()`: Edit user details (`moderates_users` only)
  - `deleteUser()`: Delete a user (`moderates_users` only)

### Post

- **Attributes**:
  - `id`: Unique identifier
  - `authorId`: Reference to `User`
  - `content`: String
  - `createdAt`: Timestamp
  - `updatedAt`: Timestamp
  - `topicId`: Reference to primary `Topic`
  - `referencedTopicIds`: Array of references to other `Topics`
- **Functions**:
  - `createPost()`: Create a new post
  - `editPost()`: Edit a post (`authorId` only)
  - `deletePost()`: Delete a post (`authorId` or `moderates_posts` only)
  - `moderatePost()`: Moderate a post (`moderates_posts` only)

### Reply

- **Attributes**:
  - `id`: Unique identifier
  - `postId`: Reference to `Post`
  - `authorId`: Reference to `User`
  - `content`: String
  - `createdAt`: Timestamp
  - `updatedAt`: Timestamp
- **Functions**:
  - `createReply()`: Create a new reply
  - `editReply()`: Edit a reply (`authorId` only)
  - `deleteReply()`: Delete a reply (`authorId` or `moderate_replies` only)
  - `moderateReply()`: Moderate a reply (`moderates_replies` only)

### Reaction

- **Attributes**:
  - `id`: Unique identifier
  - `postId`: Reference to `Post`
  - `authorId`: Reference to `User`
  - `emoji`: String
- **Functions**:
  - `addReaction()`: Add a reaction to a post
  - `removeReaction()`: Remove a reaction from a post (`authorId`, `moderate_replies` only)

### Topic

- **Attributes**:
  - `id`: Unique identifier
  - `name`: String
  - `description`: String
- **Functions**:
  - `createTopic()`: Create a new topic
  - `editTopic()`: Edit a topic (admin only)
  - `deleteTopic()`: Delete a topic (admin only)

## Routes

### User Routes

- `POST /api/register`: Register a new user
- `POST /api/login`: Authenticate a user
- `PUT /api/users/:id`: Edit user details (admin only)
- `DELETE /api/users/:id`: Delete a user (admin only)

### Post Routes

- `POST /api/posts`: Create a new post
- `PUT /api/posts/:id`: Edit a post (author or admin only)
- `DELETE /api/posts/:id`: Delete a post (author or admin only)
- `POST /api/posts/:id/moderate`: Moderate a post (admin only)

### Reply Routes

- `POST /api/posts/:postId/replies`: Create a new reply
- `PUT /api/replies/:id`: Edit a reply (author or admin only)
- `DELETE /api/replies/:id`: Delete a reply (author or admin only)

### Reaction Routes

- `POST /api/posts/:postId/reactions`: Add a reaction to a post
- `DELETE /api/reactions/:id`: Remove a reaction from a post

### Topic Routes

- `POST /api/topics`: Create a new topic
- `PUT /api/topics/:id`: Edit a topic (admin only)
- `DELETE /api/topics/:id`: Delete a topic (admin only)

## Configuration

### Deno Configuration

The project uses 

deno.json

 for configuration, including tasks for formatting, linting, building, and running the project.

### Fresh Configuration

The 

fresh.config.ts

 file defines the configuration for the Fresh framework, including plugins like Tailwind CSS.

### Docker Configuration

The 

.devcontainer

 directory contains the Docker configuration files for setting up the development environment.

## Development

### Running the Project

To start the project, run:

```sh
deno task start
```

This will watch the project directory and restart as necessary.

### Building the Project

To build the project, run:

```sh
deno task build
```

### Previewing the Project

To preview the project, run:

```sh
deno task preview
```

## Conclusion

This document provides an overview of the architecture for the Fresh Forum project, including the directory structure, models, routes, and configuration details. This should serve as a guide for understanding and extending the project.


ephbaum: @workspace create an ARCHITECTURE.md for this deno fresh project, which is a basic forum software. We will need models for Users who can create Posts. Posts can have Replies, Reactions, which can be only emoji, as well as Topics, to which a post can belong primarily, but then can also be referenced under other Topics. Users can can have admintrative Roles to edit Users and moderate Posts, and should be able to register and login

Workspace: # ARCHITECTURE.md

## Overview

Fresh Forum is a minimalistic forum software built using [Deno](https://deno.land) and [Fresh](https://fresh.deno.dev/). The application allows users to register, login, create posts, reply to posts, react with emojis, and categorize posts under various topics. Administrative roles enable user management and post moderation.

## Directory Structure

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
│   └── Button.tsx
├── islands/
│   └── Counter.tsx
├── routes/
│   ├── _404.tsx
│   ├── _app.tsx
│   ├── about.tsx
│   ├── api/
│   │   └── joke.ts
│   ├── greet/
│   │   └── [name].tsx
│   └── index.tsx
├── static/
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

## Models

### User

- **Attributes**:
  - [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A9%2C%22character%22%3A50%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2F_app.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A40%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2Fapi%2Fjoke.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A12%2C%22character%22%3A74%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition"): Unique identifier
  - `username`: String
  - `email`: String
  - [`password`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2Fapi%2Fjoke.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A39%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition"): Hashed string
  - `roles`: Array of roles (e.g., `user`, `admin`)
- **Functions**:
  - `register()`: Register a new user
  - `login()`: Authenticate a user
  - `editUser()`: Edit user details (admin only)
  - `deleteUser()`: Delete a user (admin only)

### Post

- **Attributes**:
  - [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A9%2C%22character%22%3A50%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2F_app.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A40%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2Fapi%2Fjoke.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A12%2C%22character%22%3A74%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition"): Unique identifier
  - `authorId`: Reference to [`User`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A33%2C%22character%22%3A11%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition")
  - [`content`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2F_app.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A30%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition"): String
  - `createdAt`: Timestamp
  - `updatedAt`: Timestamp
  - `topicId`: Reference to primary `Topic`
  - `referencedTopicIds`: Array of references to other `Topics`
- **Functions**:
  - `createPost()`: Create a new post
  - `editPost()`: Edit a post (author or admin only)
  - `deletePost()`: Delete a post (author or admin only)
  - `moderatePost()`: Moderate a post (admin only)

### Reply

- **Attributes**:
  - [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A9%2C%22character%22%3A50%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2F_app.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A40%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2Fapi%2Fjoke.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A12%2C%22character%22%3A74%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition"): Unique identifier
  - `postId`: Reference to [`Post`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A17%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition")
  - `authorId`: Reference to [`User`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A33%2C%22character%22%3A11%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition")
  - [`content`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2F_app.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A30%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition"): String
  - `createdAt`: Timestamp
  - `updatedAt`: Timestamp
- **Functions**:
  - `createReply()`: Create a new reply
  - `editReply()`: Edit a reply (author or admin only)
  - `deleteReply()`: Delete a reply (author or admin only)

### Reaction

- **Attributes**:
  - [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A9%2C%22character%22%3A50%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2F_app.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A40%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2Fapi%2Fjoke.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A12%2C%22character%22%3A74%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition"): Unique identifier
  - `postId`: Reference to [`Post`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A17%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition")
  - `authorId`: Reference to [`User`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A33%2C%22character%22%3A11%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition")
  - `emoji`: String
- **Functions**:
  - `addReaction()`: Add a reaction to a post
  - `removeReaction()`: Remove a reaction from a post

### Topic

- **Attributes**:
  - [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A9%2C%22character%22%3A50%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2F_app.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A40%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2Fapi%2Fjoke.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A12%2C%22character%22%3A74%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition"): Unique identifier
  - [`name`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Froutes%2F_app.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A14%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A2%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Ffresh-forum%2Ffresh.gen.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A8%2C%22character%22%3A19%7D%7D%5D%2C%2294ec8f6c-699b-4612-af1e-b20b7016d188%22%5D "Go to definition"): String
  - `description`: String
- **Functions**:
  - `createTopic()`: Create a new topic
  - `editTopic()`: Edit a topic (admin only)
  - `deleteTopic()`: Delete a topic (admin only)

## API Routes

### User Routes

- `POST /api/register`: Register a new user
- `POST /api/login`: Authenticate a user
- `PUT /api/users/:id`: Edit user details (admin only)
- `DELETE /api/users/:id`: Delete a user (admin only)

### Post Routes

- `POST /api/posts`: Create a new post
- `PUT /api/posts/:id`: Edit a post (author or admin only)
- `DELETE /api/posts/:id`: Delete a post (author or admin only)
- `POST /api/posts/:id/moderate`: Moderate a post (admin only)

### Reply Routes

- `POST /api/posts/:postId/replies`: Create a new reply
- `PUT /api/replies/:id`: Edit a reply (author or admin only)
- `DELETE /api/replies/:id`: Delete a reply (author or admin only)

### Reaction Routes

- `POST /api/posts/:postId/reactions`: Add a reaction to a post
- `DELETE /api/reactions/:id`: Remove a reaction from a post

### Topic Routes

- `POST /api/topics`: Create a new topic
- `PUT /api/topics/:id`: Edit a topic (admin only)
- `DELETE /api/topics/:id`: Delete a topic (admin only)


### Frontend Routes

The frontend routes are defined to handle the display of various content types such as users, posts, replies, reactions, and topics. Below is a list of the routes and their purposes:

#### User Routes

- `/register`: Display the registration form for new users.
- `/login`: Display the login form for existing users.
- `/users/:id`: Display the profile of a specific user.
- `/admin/users`: Display the user management interface for admins.

#### Post Routes

- `/posts`: Display a list of all posts.
- `/posts/:id`: Display a specific post along with its replies and reactions.
- `/posts/new`: Display the form to create a new post.
- `/posts/:id/edit`: Display the form to edit an existing post (author or admin only).

#### Reply Routes

- `/posts/:postId/replies/:id/edit`: Display the form to edit a reply (author or admin only).

#### Reaction Routes

- `/posts/:postId/reactions`: Display the reactions for a specific post.

#### Topic Routes

- `/topics`: Display a list of all topics.
- `/topics/:id`: Display posts under a specific topic.
- `/admin/topics`: Display the topic management interface for admins.

## Configuration

### Deno Configuration

The project uses 

deno.json

 for configuration, including tasks for formatting, linting, building, and running the project.

### Fresh Configuration

The 

fresh.config.ts

 file defines the configuration for the Fresh framework, including plugins like Tailwind CSS.

### Docker Configuration

The 

.devcontainer

 directory contains the Docker configuration files for setting up the development environment.

## Development

### Running the Project

To start the project, run:

```sh
deno task start
```

This will watch the project directory and restart as necessary.

### Building the Project

To build the project, run:

```sh
deno task build
```

### Previewing the Project

To preview the project, run:

```sh
deno task preview
```
