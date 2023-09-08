# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

# Node

nvm install 18

nvm use 18

# Enviroment vars

see .env.example
## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## Project Structure

- **/src**: The main source code directory of the project.

  - **/assets**: Contains project assets, such as images, fonts, and styles.

    - **/scss**: Contains SCSS files for styling the application.

      - **/element**: Specific SCSS files related to Element UI styling.

  - **/components**: Houses Vue.js components used throughout the project.

  - **/composables**: Contains composables for Vue 3 composition API.

  - **/layouts**: Stores layout components used for page layouts.

  - **/middleware**: Holds middleware functions used in routing.

  - **/pages**: Contains Vue.js pages and routes for the application.

  - **/plugins**: Contains Vue.js plugins used to extend the Vue instance or add functionality.

  - **/public**: Houses public files accessible directly from the browser, such as images or static assets.

  - **/server**: The server-side code directory.

    - **/api**: Contains API route handlers and controllers.

    - **/middleware**: Middleware functions specific to the server.

    - **/models**: MongoDB models for database interactions.

    - **/plugins**: Server-specific plugins or utilities.

  - **/store**: Contains Pinia store modules for managing application state

  - **.env**: This file contains environment variables used by the application.

  - **nuxt.config.ts**: The configuration file for Nuxt.js, where you can specify various project settings, plugins, and modules.

  - **package.json**: This file describes the project's dependencies, scripts, and other metadata. It is used by npm or yarn to manage project packages.

  - **README.md**: This file, which you are currently reading, serves as the main documentation for the project. It provides an overview, setup instructions, and explanations of the project structure.

## Project API

# User Authentication

## Login

  - **Endpoint**: `/api/auth/login`
  - **Method**: `GET`
  - **Summary**: User login
  - **Description**: This endpoint initiates the user login process by redirecting to the authentication provider (Auth0) for user authentication.

  **Example Request:**
    ```http
      GET /api/auth/login
    ```
  **Example Response:**
    ```http
      HTTP/1.1 302 Found
      Location: https://dev-gzmmg20tykutpocn.us.auth0.com/authorize?response_type=code&client_id=...
    ```

  - **auth**:

    - **callback**:

    - **login**:

    - **logout**:

  - **modules**:

    - **[id].delete**:

    - **index.get**:

    - **index.post**:

  - **vm**:

    - **[module]**:

      - **[id].delete**:

      - **[id].put**:

      - **index.get**:

      - **index.post**: