# Express REST API using File system

This is an Express API server conforming to REST principles. A [JSON file](https://github.com/faraazb/nodejs-playground/tree/main/tasks/express-fs-rest-api/data/users.json) is used as a data source which is read from and written to, to perform CRUD operations.

## Run

1. Ensure the current directory is `express-fs-rest-api`
2. Install dependencies
    ```bash
    npm install
    ```
3. Create a file named `.env` and specify a port variable
    ```bash
    echo "PORT=3000" > .env
    ```
4. Start development server (nodemon)
    ```bash
    npm run dev
    ```