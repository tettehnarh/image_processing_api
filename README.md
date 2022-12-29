# Image Processing API

## Project Summary

This project aims to give you a real-world scenario in which you would read and write to your disk via a Node.js express server rather than a database. The project you create serves two purposes: to prepare you for setting up scalable code and architecture for real-world projects and tie together some of the most popular middleware and utilities found in Node.js projects. This project barely touches the surface of what is possible but will prove your ability to use what you’ve learned in real-world scenarios.

## The Image Processing API was built With

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sharp](https://sharp.pixelplumbing.com/)

## Getting Started

### 1. Install all project dependencies

`npm install`

### 2. Compile ts files

`npm run build`

This command will build the ts code to js and save in `./build` folder.

### 3. Start the Server

`npm run start`

This command will start the server on port `3000`.

## Testing and Linting

### 1. Linting

`npm run lint`

### 2. Testing

`npm run test`

## Endpoints

### `/api/images/<image_name>`

With this endpoint the api can be used as a placeholder API to view the local images in the browser

    For example: `localhost:3000/api/images/fjord.jpg`

### `/api/resize/?filename=<image_name>&height=<height>&width=<width>`

With this endpoint the api can be used to resize the local images and serve them to the frontend

    For example: `http://localhost:3000/api/resize?filename=fjord&height=960&width=480`

#### Available Images

1. `encenadaport`
2. `fjord`
3. `icelandwaterfall`
4. `palmtunnel`
5. `santamonica`
