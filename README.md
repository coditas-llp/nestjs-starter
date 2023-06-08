# Coditas NestJS Starter

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. The application is generated using nest cli v9.1.9.

# Features 
* TypeORM and PostgreSQL Integration
* Basic JWT Authentication
* Swagger API Documentation
* Request/Response Interceptors and Error Filters
* Jest Unit testing along with some starter code templates in the respective spec. files
* Husky hooks for building app before commit and various vscode extensions
* Custom Logger

## Installation

```bash
$ npm install
```

## Install Husky

```bash
$ npm run prepare
```
## Generate and Running the TypeORM Migrations

* To show migrations with pending or completed status
        
    ```bash
    $ npm run migration:show
    ```

* To create an empty migration file

    ```bash
    $ npm run migration:create --name=<file-name>
    ```

* To auto generate SQL for entity changes

    ```bash
    $ npm run migration:generate --name=<file-name>
    ```

* To run migrations on DB

    ```bash
    $ npm run migration:run
    ```

* To revert migration from DB
    
    ```bash
    $ npm run migration:revert
    ```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## App will start on the port you mentioned in .env file or 3333

    http://localhost:3333/api/

* #### You will see the Swagger API documentation on above link
## Build Application

```bash
$ npm run build
```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Utility Commands

### Format

```bash
$ npm run format
```

### Lint

```bash 
$ npm run lint
```

### Prettier

```bash 
$ npm run prettier
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

* APP_PORT=<nest_app_port>
* DATABASE_HOST=<postgres_db_host>
* DATABASE_PORT=<postgres_db_port>
* DATABASE_USERNAME=<postgres_db_username>
* DATABASE_PASSWORD=<postgres_db_password>
* DATABASE_NAME=<postgres_db_name>

## Application Folder Structure

```
.env.ref
.eslintrc.js
.gitignore
.husky
   |-- post-merge
   |-- pre-commit
.prettierrc
.vscode
   |-- settings.json
README.md
libs
   |-- core
   |   |-- src
   |   |   |-- core.module.ts
   |   |   |-- core.service.spec.ts
   |   |   |-- core.service.ts
   |   |   |-- custom-logger
   |   |   |   |-- custom-logger.module.ts
   |   |   |   |-- custom-logger.service.spec.ts
   |   |   |   |-- custom-logger.service.ts
   |   |   |   |-- index.ts
   |   |   |   |-- interface
   |   |   |   |   |-- request.interface.ts
   |   |   |   |-- request-context.ts
   |   |   |-- index.ts
   |   |-- tsconfig.lib.json
   |-- user
   |   |-- src
   |   |   |-- auth
   |   |   |   |-- auth.controller.spec.ts
   |   |   |   |-- auth.controller.ts
   |   |   |   |-- auth.module.ts
   |   |   |   |-- auth.service.spec.ts
   |   |   |   |-- auth.service.ts
   |   |   |   |-- dto
   |   |   |   |   |-- auth.dto.ts
   |   |   |   |-- guard
   |   |   |   |   |-- jwt.guard.ts
   |   |   |   |-- jwt.strategy.ts
   |   |   |-- dto
   |   |   |   |-- create-user-request.dto.ts
   |   |   |   |-- update-user-request.dto.ts
   |   |   |-- index.ts
   |   |   |-- role
   |   |   |   |-- dto
   |   |   |   |   |-- create-role.dto.ts
   |   |   |   |   |-- update-role.dto.ts
   |   |   |   |-- entities
   |   |   |   |   |-- role.entity.ts
   |   |   |   |-- role.controller.spec.ts
   |   |   |   |-- role.controller.ts
   |   |   |   |-- role.module.ts
   |   |   |   |-- role.service.spec.ts
   |   |   |   |-- role.service.ts
   |   |   |-- user.controller.spec.ts
   |   |   |-- user.controller.ts
   |   |   |-- user.entity.ts
   |   |   |-- user.module.ts
   |   |   |-- user.service.spec.ts
   |   |   |-- user.service.ts
   |   |-- tsconfig.lib.json
nest-cli.json
package-lock.json
package.json
src
   |-- app.controller.spec.ts
   |-- app.controller.ts
   |-- app.module.ts
   |-- app.service.spec.ts
   |-- app.service.ts
   |-- config
   |   |-- config.module.ts
   |   |-- config.service.spec.ts
   |   |-- config.service.ts
   |   |-- constants.ts
   |   |-- defaults.ts
   |   |-- type
   |   |   |-- app-config.enum.ts
   |   |   |-- environments.enum.ts
   |   |   |-- index.ts
   |-- dto
   |   |-- health-status.dto.ts
   |-- filter
   |   |-- error.filter.ts
   |-- main.ts
   |-- middleware
   |   |-- logger.middleware.ts
   |   |-- request.interceptor.ts
   |   |-- response.interceptor.ts
   |-- migration
   |   |-- 1680672297456-created-user-table.ts
   |   |-- 1684485201240-added-new-columns-in-user-table.ts
   |   |-- 1684487478381-added-unique-key-to-user-email.ts
   |   |-- 1684488658021-added-role-entity.ts
test
   |-- app.e2e-spec.ts
   |-- jest-e2e.json
tsconfig.build.json
tsconfig.json
typeorm-datasource.config.ts
```

## Modules & Libraries

#### libs/core - Core features library

* /src - Core module and service
    * /custom-logger - Custom Logger module
        * /interface - Interfaces related to Custom Logger

#### libs/user - User authentication library

* /src - User module, entity and service
    * /auth - User authentication module with JWT strategy and guard
        * /dto - DTOs related to authentication endpoints
        * /guard - Authentication JWT guard

#### src - App. level modules/services/configurations

* /config - DB configurations
* /dto - DTOs for app level endpoints
* /filter - App level filters such as error filter
* /middleware - Middleware/Interceptors such as request, response & logger
* /migration - TypeORM migrations directory

#### test - e2e testing 

