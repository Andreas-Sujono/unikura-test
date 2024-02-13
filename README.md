# NFT Application

This project is a Non-Fungible Token (NFT) project aimed at creating and managing digital assets using blockchain technology. It leverages various technologies including Next.js, TypeScript, Tailwind CSS, Solidity, and Hardhat (with TypeScript) for smart contract development.

## Tech Stack

- **Next.js (>= v13)**: A React framework for building server-side rendered and statically generated applications.
- **TypeScript**: A statically typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for quickly building custom designs.
- **React Query**: A server state management to share API state between components.
- **Solidity**: A statically typed programming language used for developing smart contracts on the Ethereum blockchain.
- **Hardhat (with TypeScript) or Foundry**: Development environments for Ethereum smart contracts, enabling testing, deployment, and debugging.

## Project Structure

The project is organized into two main folders:

### Frontend

This folder contains the codebase for the frontend application built with Next.js, TypeScript, and Tailwind CSS. It handles user interactions, displaying NFTs, and interacting with the smart contracts.

### Smart Contract

This folder contains the Solidity code for the smart contracts used in the project. These contracts define the logic for creating, owning, and trading NFTs on the blockchain.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the `frontend` folder and install dependencies by running:
```
npm install
```
3. Start the development server for the frontend application:
```
npm run dev
```

4. Open your browser and visit `http://localhost:3000` to view the application.
5. Navigate to the `smart-contract` folder and install dependencies by running:
```
npm install
```
6. Compile the smart contracts:
```
npm run compile
```

7. Test the smart contracts:
```
npm run test
```

## Contributing

Contributions to this project are welcome! If you have suggestions, feature requests, or bug reports, please open an issue or submit a pull request following our contribution guidelines.

## License

This project is licensed under the [MIT License](LICENSE).