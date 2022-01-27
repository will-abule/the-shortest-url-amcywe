# Guide

### Rquirements

Kindly install the following libraries

| Libraries     | Link                                    |
| ------------- | --------------------------------------- |
| Node JS & NPM | [https://nodejs.org/][pldb]             |
| Yarn          | [https://yarnpkg.com/][plgh]            |
| TypeScript    | [https://www.typescriptlang.org/][plgh] |

### Set Up

To set if node and npm is properly installed run

```sh
node -v
```

Your current node version should display on your terminal or command line

```sh
v17.3.0
```

For npm run

```sh
npm -v
```

Your current npm version should display on your terminal or command line

```sh
8.3.0
```

Next you've to install yarn globally to do so run

```sh
npm i -g yarn
```

To check if yarn is proberly installed run

```sh
yarn -v
```

Your current yarn version should display on your terminal or command line

```sh
1.22.10
```

Finally install Typescript globally using the following command

```sh
npm i -g typescript
```

or

```sh
yarn add global typescript
```

### To Start On Mac & Linux

```sh
yarn start
```

### To Start On Windows

```sh
yarn start-windows
```

Your Should see

```sh
listening on port 1000
```

### To Run Test On Mac & Linux

```sh
yarn test
```

### To Run Test On Windows

```sh
yarn test-windows
```

### To Test Manuelly

You can test manually using a tool like [PostMan](https://www.postman.com/)

### For Mac & Linux

On your terminal

```sh
yarn && yarn start
```

### For Windows

On your terminal

```sh
yarn && yarn start-windows
```

### Next

- Open postman and click import (You may be asked to sign in)
- Navigate to the project in your local computer and in the root folder select "FINN.postman_collection.json"

### Application Routes

- /
- /encode - Encodes a URL to a shortened URL
- /decode - Decodes a shortened URL to its original URL.

### /encode

example body

```json
{
  "url": "https://codesubmit.io/library/react"
}
```

### /decode

example request

```url
http://localhost:1000/decode?shortUrl=http://short.est/sfJVcv
```

The query param shortUrl is retured when you encode a url using /encode

### Folder Structure

- files (Serves as a data store for error data and encoded data)
  - data.json
  - error-logs.json
  - test-data.json
- src (the entry point of the application)
  - middleware (Serves as a store for express midduleware)
    - error-middleware.ts
  - routes (Serves as a store for routes)
    - path
      - decode-route.ts (handdles decode logic)
      - encode-route.ts (handeles encode logic)
    - routes.ts (Serves as an entry points for routes)
  - test (Serves as a store for test files)
    - decode.test.ts (handdles test for decode logic)
    - encode.test.ts (handdles test for encode logic)
    - welcome.test.ts (handdles test for the root api and error-middleware.ts)
  - utils
    - functions (Serves as a store for reusable logic)
      - respond-to-client-function.ts (A common response for all client)
    - interfaces
      - api-response-interface.ts
      - db-interface.ts
      - error-interface.ts
  - db.ts (handdles saving and retriving data)
  - index.ts (entry point of the application)
  - logging.ts (handdles uncaughtException & unhandledRejection)
- .gitignore
- FINN.postman_collection.json
- GUIDE.md
- package.json
- README.md
- tsconfig.json
- yarn.lock

## 🤓 Happy Testing.
