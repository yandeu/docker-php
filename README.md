# Docker & PHP (for local development)

🐋 A simple PHP environment with Docker for local development.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/get-started)
- [docker-compose](https://docs.docker.com/compose/install/) (linux only)

## Install

```bash
# install docker-php
# (not npm, npx!)
npx docker-php@latest

# start the PHP server on port 3200
# (http://localhost:3200/)
npm run php
```

## About

Will add all the necessary configurations to your npm project for running your PHP code locally:

- Adds a `docker` folder with `Dockerfile` and `docker-compose`.
- Adds some useful scripts to your `package.json` file.
- Adds `/src/index.php` (if it does not already exist).

## Useful Links

- [How to deploy on remote Docker hosts with docker-compose](https://www.docker.com/blog/how-to-deploy-on-remote-docker-hosts-with-docker-compose/)
