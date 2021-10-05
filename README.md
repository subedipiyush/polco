# Billboard Playlist

A simple billboard application.

[Documentation](docs/documentation.pdf)

## Prerequisites
- PostgreSQL
- npm (Node.js)

## Initial Setup

Create a PostgreSQL database named "billboard":

```
psql
CREATE DATABASE billboard;
\q
```

Update db.js with your PostgreSQL credentials.

Run the following commands to prepare the server

```
cd server
npm install
npm run seed
```

Run the following to prepare the client

```
cd client
npm install
```

### Running the application

In one terminal, start the front end:

```
cd client
npm start
```

In a separate terminal, start the back end:

```
cd server
npm run dev
```