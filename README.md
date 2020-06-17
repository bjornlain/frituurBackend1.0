# Codious.Maximus

[![Build Status](https://dev.azure.com/Codious/Codious.Maximus/_apis/build/status/Codious.Maximus?branchName=develop)](https://dev.azure.com/Codious/Codious.Maximus/_build/latest?definitionId=21&branchName=develop)

> My name is Maximus Decimus Meridius, Commander of the Armies of the North, General of the Felix Legions, loyal servant to the true emperor, Marcus Aurelius. Father to a murdered son, husband to a murdered wife. And I will have my vengeance, in this life or the next. &mdash; Maximus Decimus Meridius

## Prerequisites
* Install Homebrew. `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` 
* Install NodeJS. `brew install node`
* Install MongoDB. `brew tap mongodb/brew && brew install mongodb-community`
* Install Homebrew Services. `brew tap homebrew/services`
  * Start MongoDB as a service. `brew services start mongodb-community`
* Install Mailcatcher. `gem install mailcatcher`
  * Start Mailcatcher. `mailcatcher`
* Install Angular CLI, and Nodemon globally. `npm i -g @angular/cli nodemon`

## Clone
* Clone to `~/CODDEV/Codious.Maximus`.

## Installation
* Install the NPM packages for the client. `npm run install:client`
* Install the NPM packages for the server. `npm run install:server`

## Development
* Install Node-Mongo-Seeds globally. `npm i -g node-mongo-seeds`
* Seed the MongoDB for development. `npm run seed:dev`
* Run the application. `npm start`
* The client application is available at `http://localhost:4200`.
* The server application is available at `http://localhost:4100`.
* The Mailcatcher UI is available at `http://localhost:1080`.

## Staging
* Start the application. `docker-compose up -d --build`
* Optional seeding:
  * Start a shell in the Node container. `docker-compose exec server sh`
  * Install Node-Mongo-Seeds globally. `npm i -g node-mongo-seeds`
  * Seed the MongoDB for production. `npm run seed:prod`
* The application is available at `http://localhost`.