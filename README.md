# Freight Pay

## Local Machine Installation Pre-reqs

- Redis - https://redis.io/topics/quickstart
- Postgres - https://www.postgresql.org/download/ (if you don't have it installed, you could use a Heroku Database URL)
- Lerna - https://lerna.js.org/
- Concurrently - https://www.npmjs.com/package/concurrently#install
- NPM and Yarn (if you don't have yarn, you could edit the package.json scripts)
- Node v12 (if you have another version, NVM is strongly recommended to easily change versions)

## Env Files

You will find .env.template files for each package (frontend, admin, gateway). You could get the keys from another dev on the project.

## Hosting

- Heroku
- Vercel

These both have CLI kits, you might want to install them if you want to test out deployment of a specific package.

- Heroku CLI - https://devcenter.heroku.com/articles/heroku-cli
- Vercel CLI - https://vercel.com/docs/cli

## Get Started

0. Make sure you have `Redis` and `Postgres` running
1. Install - `yarn` from the root, this will install all the packages
2. Dev Run - `yarn dev`

Note: You could also cd into each of the packages and run each on its own. This might be a nice option if running everything slows down your machine.

## Application Architecture

![Application Architecture](docs/images/application-architecture.jpg)
[Edit on Miro](https://miro.com/welcomeonboard/I4CRfIR0AULR6IIa3ZYFSRH6aR2miiOLDNtq2i08FCIqYqsNn1uEbRuir28579GM)

Happy Coding!

