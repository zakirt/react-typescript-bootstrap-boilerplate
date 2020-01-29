# React/TypeScript/Bootstrap boilerplate

Boilerplate for creating React apps with TypeScript and Bootstrap. The project also uses Sass for preprocessing CSS and Webpack to bundle the script.

## Building the app

#### Development mode

In this mode Webpack will run with `-w` flag. Meaning it will watch for file changes.

```
npm run build:dev
```

#### Production mode

```
npm run build:prod
```

## Running the app

Use the following command to run the app

```
npm start
```

The app will be launched on `localhost`'s port `9000` using the [http-server module](https://www.npmjs.com/package/http-server).

## Unit tests

Testing is accomplished using [Jest framework](https://jestjs.io/).

Unit test files must be placed inside `/spec` directory. The file extensions must be either `.spec.ts`, or `.spec.tsx` (components). See `jest.config.js` for more info.

Use the following commands to run the tests

#### Running all tests once

```
npm test
```

#### With coverage

```
npm run test:coverage
```

#### Watch mode
```
npm run test:tdd
```
or
```
npm run test:watch
```

#### Specify test to run by file name pattern

```
npm test App
npm run test:tdd App
```

