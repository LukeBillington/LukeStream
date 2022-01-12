# Development

The development environment for this project uses [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and [stylelint](https://stylelint.io/) for linting and formatting. This format adheres to the [Airbnb](https://github.com/airbnb/javascript) style guide as close as possible for TypeScript.

## Code Editor Plugins

Consider using [Visual Studio Code](https://code.visualstudio.com/) and installing the following plugins:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

## Commands

These are the Node commands that can be used for working on the project. There is a pre-commit hook that is ran to ensure everything passes before committing.

| Command                  | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `npm run dev`            | Starts development server.                         |
| ---                      | ---                                                |
| `npm run clean`          | Removes client and server production build files.  |
| `npm run clean:client`   | Removes client production build files.             |
| `npm run clean:server`   | Removes server production build files.             |
| ---                      | ---                                                |
| `npm run lint`           | Runs Prettier, ESLint and stylelint.               |
| `npm run lint:prettier`  | Runs Prettier.                                     |
| `npm run lint:eslint`    | Runs ESLint.                                       |
| `npm run lint:stylelint` | Runs stylelint.                                    |
| ---                      | ---                                                |
| `npm run build`          | Generates production builds for client and server. |
| `npm run build:client`   | Generates production builds for client.            |
| `npm run build:server`   | Generates production builds for server.            |
| ---                      | ---                                                |
| `npm run all`            | Runs **clean**, **lint**, and **build**.           |
| ---                      | ---                                                |
| `npm run start`          | Starts production build.                           |
