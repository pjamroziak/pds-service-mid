# Personal Data Service
Service written in TypeScript for job application in Codetain company. Application use the **Express** framework.

## Requirements
* Node.js v14.16.0-x64
* Docker
* RabbitMQ

## Usage
> Before build/start/test project, download neccessary node modules by `npm i` command in main folder.

Command to build project:
```text
npm run build
```
Command to run project with _ts-node_ features:
```text
npm run start
```
Command to run available unit tests: 
```text
npm test
```
## API Documentation
> The default port number is **6969**.
### POST Endpoints
* `<localhost:port>/api/v1/commands/run` - return Personal Data Model converted from Gorest User:
> Id can't be less than 300 and more than 320!
```text
Request body:
  {
    "id" : number
  }
```
