

#### frituur application

seed = npm run:seed dev
mongodb server moet runnend zijn

## Development
* Install Node-Mongo-Seeds globally. `npm i -g node-mongo-seeds`
* Seed the MongoDB for development. `npm run seed:dev`
* Run the application. `npm start`
* The client application is available at `http://localhost:4200`.
* The server application is available at `http://localhost:4100`.

## Staging
* Start the application. `docker-compose up -d --build`
* Optional seeding:
  * Start a shell in the Node container. `docker-compose exec server sh`
  * Install Node-Mongo-Seeds globally. `npm i -g node-mongo-seeds`
  * Seed the MongoDB for production. `npm run seed:prod`
* The application is available at `http://localhost`.