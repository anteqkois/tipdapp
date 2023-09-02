[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

# TippDAPP - A Decentralized Tipping and Utility Token Platform

## Table of Contents

- [Introduction](#introduction)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Technologies](#technologies)
- [Images and Video](#images-and-video)
<!-- - [License](#license) -->

## Introduction

TippDAPP is a powerful web application built on the Ethereum blockchain and web3 technology, designed to empower content creators, influencers, charities, and similar individuals/organizations. It enables these users to receive tips from their fans and donors while giving back personalized utility tokens in return. These utility tokens can be utilized as assets in the user's store, granting access to exclusive events, and much more.

## Key Features

TippDAPP offers a range of key features:

- **Decentralized Tipping:** Seamlessly interact with the Ethereum blockchain using web3 technology to enable decentralized tipping.

- **Utility Token Issuance:** Facilitate the issuance of personalized utility tokens to give back to your supporters.

- **Microservices Architecture:** The project follows a microservices architecture, orchestrated through a central API Gateway, ensuring scalability and maintainability.

- **Highly Tested Smart Contracts:** Smart contracts adhere to the Diamond standard (EIP-2535) with extensive test coverage to ensure their reliability.

- **Modular Codebase:** Organize the codebase into packages for modularity and ease of development.

- **CLI Scripts:** Simplify project management with the help of CLI scripts, written in zx and bash.

- **Secure Web3 Authentication:** Implement secure authentication using web3 technology.

## Architecture

TippDAPP's architecture is designed for scalability, maintainability, and reliability:

- **Monorepo:** TippDAPP is organized as a monorepo, efficiently managed with Turborepo.

- **Microservices:** The project follows a microservices architecture, orchestrated through a central API Gateway.

- **Smart Contracts:** Smart contracts adhere to the Diamond standard (EIP-2535) with high test coverage to ensure their reliability.

- **Package-Based Repository:** The codebase is organized into packages for modularity and ease of development.

- **CLI Scripts:** Simplify project management with the help of CLI scripts, written in zx and bash.

- **Web3 Authentication:** Implement secure authentication using web3 technology.

## Technologies

<!-- [![My Skills](https://skillicons.dev/icons?i=bash,docker,express,postgres,nextjs,nodejs,postman,prisma,rabbitmq,react,redis,redux,solidity,tailwind,ts,)](https://skillicons.dev) -->

<div style="margin-block: 1.5em;">
<img height="40" width="40" title="react" alt="react" src="https://cdn.simpleicons.org/react" />
<img height="40" width="40" title="typescript" alt="typescript" src="https://cdn.simpleicons.org/typescript" />
<img height="40" width="40" title="nextdotjs" alt="nextdotjs" src="https://cdn.simpleicons.org/nextdotjs/_/eee" />
<img height="40" width="40" title="redux" alt="redux" src="https://cdn.simpleicons.org/redux" />
<img height="40" width="40" title="tailwindcss" alt="tailwindcss" src="https://cdn.simpleicons.org/tailwindcss" />
<img height="40" width="40" title="express" alt="express" src="https://cdn.simpleicons.org/express/_/eee" />
<img height="40" width="40" title="nodedotjs" alt="nodedotjs" src="https://cdn.simpleicons.org/nodedotjs" />
<img height="40" width="40" title="rabbitmq" alt="rabbitmq" src="https://cdn.simpleicons.org/rabbitmq" />
<img height="40" width="40" title="prisma" alt="prisma" src="https://cdn.simpleicons.org/prisma/_/eee" />
<img height="40" width="40" title="postgresql" alt="postgresql" src="https://cdn.simpleicons.org/postgresql" />
<img height="40" width="40" title="redis" alt="redis" src="https://cdn.simpleicons.org/redis" />
<img height="40" width="40" title="solidity" alt="solidity" src="https://cdn.simpleicons.org/solidity/_/eee" />
<br>
<br>
<img height="25" width="25" title="ethereum" alt="ethereum" src="https://cdn.simpleicons.org/ethereum" />
<img height="25" width="25" title="postman" alt="postman" src="https://cdn.simpleicons.org/postman" />
<img height="25" width="25" title="gnubash" alt="gnubash" src="https://cdn.simpleicons.org/gnubash" />
<img height="25" width="25" title="turborepo" alt="turborepo" src="https://cdn.simpleicons.org/turborepo" />
<img height="25" width="25" title="zod" alt="zod" src="https://cdn.simpleicons.org/zod" />
<img height="25" width="25" title="mocha" alt="mocha" src="https://cdn.simpleicons.org/mocha" />
<img height="25" width="25" title="openzeppelin" alt="openzeppelin" src="https://cdn.simpleicons.org/openzeppelin" />
<img height="25" width="25" title="dotenv" alt="dotenv" src="https://cdn.simpleicons.org/dotenv" />
<img height="25" width="25" title="nodemon" alt="nodemon" src="https://cdn.simpleicons.org/nodemon" />
<img height="25" width="25" title="radixui" alt="radixui" src="https://cdn.simpleicons.org/radixui/_/eee" />
<img height="25" width="25" title="reactquery" alt="reactquery" src="https://cdn.simpleicons.org/reactquery" />
<img height="25" width="25" title="jsonwebtokens" alt="jsonwebtokens" src="https://cdn.simpleicons.org/jsonwebtokens/purple" />
</div>

- **Frontend:** Developed with ReactJS (NextJS), utilizing TypeScript and Redux for state management.

- **Backend:** Powered by NodeJS (ExpressJS) for server-side logic.

- **Database:** PostgreSQL with PrismaORM for efficient data management.

- **Data Store:** Utilizes Redis for caching and data management.

- **Containerization:** Docker and Docker Compose enable easy deployment and scaling.

- **Message Queue:** RabbitMQ is employed for asynchronous communication.

- **UI Design:** The UI is crafted with Tailwind CSS for a polished user experience.

- **Blockchain Interaction:** EthersJS and Wagmi are used for interacting with the Ethereum blockchain.

- **Smart Contracts:** Solidity, along with Hardhat for development and testing.

- **Project Management:** Turborepo simplifies the management of a monorepo codebase.

## Images and Video

### Overview Video

[<img src="./doc/media/dashboard.jpg" width="100%">](https://youtu.be/G2ty-_-b6LY 'TipDPP Overview')
<!-- ![TipDAPP Overview](./doc/media/tipdapp_overview.mp4) -->

### Screenshots

![Monorepo Setup](./doc/media/monorepo_setup.jpg)
![User Dashboard](./doc/media/dashboard.jpg)
![User Dashboard](./doc/media/connect_ethereum.jpg)
![User Dashboard](./doc/media/verify_nonce.jpg)
![User Dashboard](./doc/media/signup_step_1.jpg)
![User Dashboard](./doc/media/signup_step_2.jpg)
![User Dashboard](./doc/media/tip_quick_view.jpg)

<!--

## License

TippDAPP is licensed under the [MIT License](LICENSE.md). Feel free to fork the project and use it according to the terms of the license. -->
