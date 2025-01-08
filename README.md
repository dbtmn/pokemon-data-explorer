# Implementation of a Pokémon Data Explorer application by Dila Ongun

This app is created via [Create React App](https://create-react-app.dev/).
Searches Pokémons and allows to see details of a Pokémon.

# Requirements

To run this project manually, you need Node.js installed on your environment. It also includes npm.
To check if they are installed on your environment, run and see available version successfully:

    $ node --version

    $ npm --version

# Start

To start the app, run the following commands:

    $ npm install

    $ npm run start

# Test

To test the app, run the following command:

    $ npm run test

## Languages & Tools

### JavaScript

- [React](http://facebook.github.io/react) is used as framework.

### TypeScript

- [TypeScript](https://www.typescriptlang.org/) is used.

### Eslint

- [Eslint](https://eslint.org/) is used to support code quality.

### Redux DevTools

- [Redux DevTool](https://github.com/reduxjs/redux-devtools) is used to monitor Redux activities easily over browser.

### CSS

- [SCSS](https://sass-lang.com/) is used for styling.
- [Material-UI](https://mui.com/) is used for some of the UI components.
- [Google Fonts](https://fonts.google.com/) and [Google Icons](https://fonts.google.com/icons) are used for font and icons.

### State Management

- [Redux](https://redux.js.org/) is used for state management.

### Page Routing

- [React Router](https://reactrouter.com/) is used for page routing.

### Responsiveness

- To provide responsiveness, [grid](https://mui.com/material-ui/react-grid/) component of Material-UI is preferred and supported with media query.

### Build

- [Webpack](https://webpack.js.org/) is used as build tool.

### Compiler

- [Babel](https://babeljs.io/) is used as compiler.

# Further Improvements

- Additional eslint configurations might be useful in future.
- Additional features such as showing more filter options, more details of a Pokémon.

# About Structure

My main concerns are readability, maintainability, reusability, clean code.

To provide these concerns, it is preferred a structure via folders:

- api: API requests
- components: Base helper components
- constants: Constants
- modules: Pages
- scss: Css utilities
- shared: Components that are used in modules
- store: Redux files

For CSS classNames, BEM naming convention is preferred.

All implementation assumes this application gets bigger. So, I focused on splitting everything into pieces.

To support clean code principle, I splitted the code and seperated into files when it starts to repeat. (for ex. Error component.)
To maintain readability, I splitted the code into another file in same folder. (for ex. PokeInformation)

# About features

User has ability to access two different pages. <br /> User accesses Dashboard page as home page. In Dashboard page:
- A banner image, a search box, filter box and a table is available.
- User searches a Pokémon by name. Search filters Pokémons table.
- User filters a Pokémon by type. Pokémons table is filtered.
- User clicks one of the table row and user is navigated to Pokémon Detail page. <br />

In Pokémon Detail page: <br />
There are details of the Pokémon. <br />
- On the left, there is image of the Pokémon.
- In the right, there are details such as height, width, abilities, stats.

For both of the pages, error and loading designs are available.
