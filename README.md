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

# User Authentication

## Login

  - **Endpoint**: `/api/auth/login`
  - **Method**: `GET`
  - **Summary**: User login
  - **Description**: This endpoint initiates the user login process by redirecting to the authentication provider (Auth0) for user authentication.

  - **Example Request:**
    ```http
      GET /api/auth/login
    ```
  - **Example Response:**
    ```http
      HTTP/1.1 302 Found
      Location: https://your-auth0-issuer-url/authorize?response_type=code&client_id=...
    ```
## Callback

  - **Endpoint**: `/api/auth/callback`
  - **Method**: `GET`
  - **Description**:
  This endpoint performs the following steps:
    1. Validates the authentication code received as a query parameter.
    2. Exchanges the authentication code for user tokens (id_token, access_token).
    3. Verifies the user's identity using JSON Web Tokens (JWTs).
    4. Sets a secure cookie containing user information and tokens.
    5. Redirects the user to the application's homepage.

  - **Example Request:**
    ```http
      GET /api/auth/callback?code=authentication_code_here
    ```
  - **Example Response:**
    ```http
      HTTP/1.1 302 Found
      Location: /
    ```

## Logout

  - **Endpoint**: `/api/auth/logout`
  - **Method**: `GET`
  - **Description**:
  This endpoint performs the following steps:
    1. Clears the user's session.
    2. Deletes the authentication cookie.
    3. Redirects the user to the identity provider's (Auth0) logout endpoint for further authentication provider-based logout, ensuring a complete and secure logout process.

  - **Example Request:**
    ```http
      GET /api/auth/logout
    ```
  - **Example Response:**
    ```http
      HTTP/1.1 302 Found
      Location: https://your-auth0-issuer-url/v2/logout?client_id=your-client-id&returnTo=your-application-url
    ```

# Modules API

## Delete Module by ID

  - **Endpoint**: `/api/modules/:id`
  - **Method**: `DELETE`
  - **Description**:
    This endpoint performs the following steps:
      1. Receives a request to delete a module specified by its ID.
      2. Searches for the module in the database based on the provided ID.
      3. Deletes the module if found.
      4. Returns the deleted module's data as a response.
  - **Parameters:**
    - `_id` (Path Parameter):
      - **Type**: string
      - **Description**: The unique ID of the module to delete.
  - **Example Request:**
    ```http
      DELETE /api/modules/_id
    ```
  - **Example Response:**
    ```json
      {
        "data": {
          "_id": "24rf32j4u4h32234uh",
          "name": "Deleted Module",
          "fields": []
        }
      }
    ```

## Get Modules

  - **Endpoint**: `/api/modules`
  - **Method**: `GET`
  - **Description**:
  This endpoint performs the following steps:
    1. Receives a request to retrieve modules.
    2. Checks if a query parameter `sectionName` is provided.
    3. If `sectionName` is provided, it retrieves the module with that specific section name.
    4. If no `sectionName` is provided, it retrieves a list of all modules.
    5. Returns the retrieved modules as a response.
  - **Query Parameters:**
    - `sectionName` (Optional):
      - **Type**: string
      - **Description**: The section name to filter modules by.

  - **Example Request:**
    ```http
      GET /api/modules?sectionName=example
    ```
  - **Example Response:**
    ```json
      {
        "_id": "f4334f43f34f4",
        "sectionName": "example",
        "fields": [],
      }
    ```
  
  - **Example Request:**
    ```http
      GET /api/modules
    ```
  - **Example Response:**
    ```json
    [{
      "_id": "123",
      "sectionName": "module1",
      "fields": []
    },
    {
      "_id": "456",
      "sectionName": "module2",
      "fields": []
    }]
    ```

## Create Module

  - **Endpoint**: `/api/modules`
  - **Method**: `POST`
  - **Description**:
  This endpoint performs the following steps:
    1. Receives a request to create a new module.
    2. Reads the request body to get the data for the new module.
    3. Creates a new module instance with the provided data.
    4. Saves the new module to the database.
    5. Returns the newly created module's data as a response.
  - **Request Body**
    - **Type**: JSON
    - **Description**: The data for the new module to be created.


  - **Example Request:**
    ```http
      POST /api/modules/index
      Content-Type: application/json

      {
        "sectionName": "New Module",
        "fields":  [{
          "label": "Field 1",
          "type": "Value 1"
        },
        {
          "label": "Field 2",
          "type": 42
        }]
      }
    ```
  - **Example Response:**
    ```json
      {
        "_id": "123",
        "sectionName": "New Module",
        "fields": [
          {
            "label": "Field 1",
            "type": "Value 1"
          },
          {
            "label": "Field 2",
            "type": 42
          }
        ]
      }
    ```
# Sections API (Which is created by modules API)
## Get Sections

  - **Endpoint**: `/api/vm/:module`
  - **Method**: `GET`
  - **Description**:
  This endpoint performs the following steps:
    1. Receives a request to retrieve modules for a specific section.
    2. Retrieves the schema fields for the module associated with the provided section name from the database.
    3. Constructs a schema for the module using the retrieved fields.
    4. Uses Mongoose to create or retrieve a model for the module using the constructed schema.
    5. Retrieves all modules belonging to the specified section.
    6. Returns the retrieved modules as a response.
  - **Parameters:**
    - `module` (Path Parameter):
      - **Type**: string
      - **Description**: The name or identifier of the section to retrieve modules for.


  - **Example Request:**
    ```http
      GET /api/vm/sectionName
    ```
  - **Example Response:**
    ```json
    {
      "data": [
        {
          "_id": "123",
          "field1": "Value 1",
          "field2": 42
        },
        {
          "_id": "456",
          "field1": "Value 2",
          "field2": 24
        }
      ]
    }
    ```

## Create Section

  - **Endpoint**: `/api/vm/:module`
  - **Method**: `POST`
  - **Description**:
  This endpoint performs the following steps:
    1. Receives a request to create a new module for a specific section.
    2. Retrieves the schema fields for the module associated with the provided section name from the database.
    3. Constructs a schema for the module using the retrieved fields.
    4. Uses Mongoose to create or retrieve a model for the module using the constructed schema.
    5. Reads the request body to get the data for the new module.
    6. Creates a new module instance with the provided data.
    7. Saves the new module to the database.
    8. Returns the newly created module's data as a response.
  - **Parameters:**
    - `module` (Path Parameter):
      - **Type**: string
      - **Description**: The name or identifier of the section to retrieve modules for.
  - **Request Body:**
    - **Type**: JSON
    - **Description**: The data for the new module to be created.
  - **Example Request:**
    ```http
      POST /api/vm/sectionName
      Content-Type: application/json
      {
        "field1": "Value 1",
        "field2": 42
      }
    ```
  - **Example Response:**
    ```json
    {
      "_id": "123",
      "field1": "Value 1",
      "field2": 42
    }
    ```
## Update Section

  - **Endpoint**: `/api/vm/:module/:id`
  - **Method**: `PUT`
  - **Description**:
  This endpoint performs the following steps:
    1. Receives a request to update an existing module by its ID within a specific section.
    2. Retrieves the schema fields for the module associated with the provided section name from the database.
    3. Constructs a schema for the module using the retrieved fields.
    4. Uses Mongoose to create or retrieve a model for the module using the constructed schema.
    5. Reads the request body to get the updated data for the module.
    6. Updates the existing module with the provided data.
    7. Returns the updated module's data as a response.
  - **Parameters:**
    - `module` (Path Parameter):
      - **Type**: string
      - **Description**: The name or identifier of the section to update the module within.
    - `id` (Path Parameter):
      - **Type**: string
      - **Description**: The unique identifier of the module to update.
  - **Request Body:**
    - **Type**: JSON
    - **Description**: The updated data for the module.
  - **Example Request:**
    ```http
      PUT /api/vm/sectionName/123
      Content-Type: application/json
      {
        "field1": "Updated Value 1",
        "field2": 55
      }
    ```
  - **Example Response:**
    ```json
    {
      "_id": "123",
      "field1": "Updated Value 1",
      "field2": 55
    }
    ```
## Delete Section

  - **Endpoint**: `/api/vm/:module/:id`
  - **Method**: `DELETE`
  - **Description**:
  This endpoint performs the following steps:
    1. Receives a request to delete an existing module by its ID within a specific section.
    2. Retrieves the schema fields for the module associated with the provided section name from the database.
    3. Constructs a schema for the module using the retrieved fields.
    4. Uses Mongoose to create or retrieve a model for the module using the constructed schema.
    5. Deletes the module with the provided ID.
    6. Returns a success response indicating the deletion.
  - **Parameters:**
    - `module` (Path Parameter):
      - **Type**: string
      - **Description**: The name or identifier of the section to update the module within.
    - `id` (Path Parameter):
      - **Type**: string
      - **Description**: The unique identifier of the module to update.
  - **Example Request:**
    ```http
      DELETE /api/vm/sectionName/123
    ```
  - **Example Response:**
    ```json
      {
        "_id": "24rf32j4u4h32234uh",
        "field1": "Deleted Module",
        "field2": 123,
      }     
    ```