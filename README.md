# Yoyo Exercise Marketplace (Elia Bordoni react, typescript e web3 Project)

Project is deployed here -> [Yoyo Exercise Marketplace](linkvercelqui)

# Indice

1. Description
2. Installation
3. Usage guide
4. Contributing
5. License
6. Tecnologies

Smart Contract: 0xE4a70e31DA7ddcD31929E029e19993e0693363E9

# 1. Description

This project is a marketplace for a yoga gym that wants to sell its courses using blockchain technology for payments.
Users, by connecting with their wallet, can purchase different exercise packages from the store, pay in Ethereum, and view their purchased courses on a dedicated page.
For this project, I used React with TypeScript for the front-end, and the Wagmi + Viem libraries to handle communication between the front-end and the smart contract.
The smart contract was written in Solidity and deployed on the Sepolia network.

# 2. Installation

This project was created using React and TypeScript with the Vite setup.

### Prerequisites

-   **npm** (or **yarn**)

### Steps

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/eliab256/Yoyo-Exercise-Ecommerce-React-Wagmi-TS.git
    ```

2.  **Navigate into the project directory**:

    ```bash
    cd Yoyo-Exercise-Ecommerce-React-Wagmi-TS
    ```

3.  **Install the dependencies**:

    Using npm:

    ```bash
    npm install
    ```

    Using yarn:

    ```bash
    yarn install
    ```

4.  **Install external libraries**

    **_redux toolkit_**
    Using npm:

        ```bash
        npm install @reduxjs/toolkit react-redux
        ```

    Using yarn:

        ```bash
        yarn add @reduxjs/toolkit react-redux
        ```

    **_wagmi + viem_**
    Using npm:

        ```bash
        npm install wagmi viem@2.x @tanstack/react-query
        ```

    Using yarn:

        ```bash
        yarn add wagmi viem@2.x @tanstack/react-query
        ```

    **_rainbowkit_**
    Using npm:

        ```bash
        npm install @rainbow-me/rainbowkit
        ```

    Using yarn:

        ```bash
        yarn add @rainbow-me/rainbowkit
        ```

    **_tailwind_**
    Using npm:

        ```bash
        npm install tailwindcss @tailwindcss/vite
        ```

    Using yarn:

        ```bash
        yarn add tailwindcss @tailwindcss/vite
        ```

5.  **Run the project**:

    Using npm:

    ```bash
    npm start
    ```

    Using yarn:

    ```bash
    yarn start
    ```

6.  **install code formatter (optional)**:

    Using npm:

    ```bash
    npm install --save-dev prettier
    ```

    Using yarn:

    ```bash
    yarn add --dev prettier

    ```

    Now you are ready to work on it.

# 3. Usage Guide

## The components are:

1. App: The main component that manages the app's state and renders the different pages.
2. providers: defines a Providers component that wraps your entire React application with all the necessary global providers used throughout the project. It ensures proper setup and access to essential tools like redux store, queryClient, Wagmi and RainbowKit.
3. Header: it is the site header, which contains the name, the logo, the wallet connect button, and the two buttons to switch between the Gallery page and the YourProducts page.
4. Gallery: It is the home page where all available products can be viewed.
5. YourProductPage: It is the page where you can view the purchased products. If there are no purchases or no wallet is connected, a warning message will still appear.
6. Exercise Card: A component that shows a single exercise package.
7. PurchaseSummary: It is the page that opens when you click on an exercise. It includes a Purchase button and will host the component that handles errors.
8. Errore Resume: It is the component that handles the ability to purchase the product if no errors are detected.
9. Error Card: It is the error card component, which checks for the presence of errors and returns a message either if everything passes or if an error is detected.
10. DownloadPage: It is the page that opens when you click on an already purchased exercise from the YourProducts page. It allows you to download what could be a receipt.

## Navigation in the App

The first page displayed when opening the application is the Gallery.
From the Gallery, the user can also see the Header, which includes navigation options to switch between the Gallery and Your Products pages, as well as a wallet connect button.
Within the Gallery, the user sees a collection of Exercise Cards.
Clicking on a card opens the Purchase Summary, where the user can proceed to purchase the selected product.
When the user clicks the Purchase button, the Error Resume component is displayed. This component checks for potential issues and indicates whether the purchase can proceed.
If no errors are found, a confirmation message with green text is shown, and the user is allowed to complete the transaction.
On the Your Products page, the user can view all previously purchased items.
If the user hasn’t made any purchases, or if no wallet is connected, a warning message is displayed indicating that they need to connect a wallet and/or purchase products from the Gallery.
If the wallet is connected and there are purchased products, clicking on one of them opens the Download Page, where the user can click the Download button to retrieve the exercise content.

## Styles and Resources

All the styles in the app are managed through tailwind.

## State managment

The application uses Redux to ensure centralized and scalable management of information. The project structure includes a `store` folder, which contains a `store.ts` file for configuring the store and several slice files to manage specific states.
store/
├── store.ts Redux store configuration
├── pagesSlice.ts Manages the status to set gallery or yourProduct page throght the site.
├── selectedExercise.ts It manages the state related to the specific selected exercise, distinguishing it from the other exercises. It is used, for example, to ensure that the PurchaseSummary displays the correct data for the corresponding ExerciseCard.
├── ErrorStatusSlice.ts It manages the error state to easily pass the presence or absence of errors between different components.

## Props

I created a dedicated file for the exercises data that are passed via props. This file is located in the `data` folder and is called `ExerciseCaardData`. It also includes the interface to ensure that there are no errors in the data passing.

# 4. Contributing

Thank you for your interest in contributing to the Environmental Quiz App! Every contribution is valuable and helps improve the project.
There are various ways you can contribute:

-   Bug Fixes: If you find a bug, feel free to submit a fix.
-   Adding New Features: Propose new features or improvements.
-   Documentation: Help improve the documentation by writing guides or enhancing existing ones.
-   Translations: Contribute by translating the app into other languages.
-   Testing and Refactoring: Run tests on the code and suggest improvements.
    How to Submit a Contribution
    Fork the repository: Click the "Fork" button in the upper right corner to create a copy of the repository in your GitHub account.
-   Clone your fork: git clone https://github.com/eliab256/Yoyo-Exercise-Ecommerce-React-Wagmi-TS.git
-   Create a Branch: git checkout -b branch-name
-   Make your change and test: npm test
-   Add and commit your change:
    git add .
    git commit -m "Modify description"
-   Send your branch to the fork: git push origin name-branch
-   Create a pull request

Final Tips

-   Clarity: Ensure that the instructions are clear and easy to follow.
-   Test the Process: If possible, test the contribution process from an external perspective to ensure it flows smoothly.
-   Keep It Updated: Update this section if the guidelines change or if the project evolves.

# 5. License

This project is licensed under the MIT License. See the [License.txt](LICENSE) file for details.

# 6. Tecnologies

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
    languageOptions: {
        // other options...
        parserOptions: {
            project: ['./tsconfig.node.json', './tsconfig.app.json'],
            tsconfigRootDir: import.meta.dirname,
        },
    },
});
```

-   Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
-   Optionally add `...tseslint.configs.stylisticTypeChecked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
    // Set the react version
    settings: { react: { version: '18.3' } },
    plugins: {
        // Add the react plugin
        react,
    },
    rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
    },
});
```
