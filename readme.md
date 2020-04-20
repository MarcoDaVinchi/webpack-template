## HTML Academy Kekstagram sandbox.

## Kekstagram sandbox/playground

Personal little playground based on [HTML academy's](https://htmlacademy.ru) awesome course called Kekstagram)

Special Thanks to vedees and his [webpack-template](https://github.com/vedees/webpack-template.git) from which i forked base of this project!

Based on JS mostly.
DEV environment is based on Docker/Docker compose with usage of node:buster image.

IDE - VS Code with remote development configuration.

All action is in DEV branch :)

## How to start this Millenium falcon

### 1. Use VS Code! It's Awesome!

.devcontainer folder contains all the necessary configuration files which will be automatically used by the IDE to build image.

### 2 Or build Docker image manually

You can start with something like this docker-compose configuration

```docker-compose
version: '3'
services:
  your-service-name-goes-here:
    image: node
    ports:
      - "8080"
    expose:
      - "8081"
    volumes:
      - .:/workspace
```

### 3 Or even use locally installed Node JS
This one is even more simple)


`npm install` or `yarn install` or whatever manager you prefer

### `npm run dev`
to start dev webpack configuration
or
### `npm run build`
to build project and
### `npm run start`
to start http-server and serve builded content.

And have fun!

P.S. Don't forget to visit [Webpack](https://webpack.js.org/) official site!