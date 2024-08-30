import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema  from './schema.js';
import connectDB from './db.js';

dotenv.config();

const app = express();
connectDB()

const port = process.env.PORT || 9000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});










// import express from 'express'
// import dotenv from 'dotenv'
// import { graphqlHTTP } from 'express-graphql'
// import {schema }from './schema.js';

// dotenv.config();

// const app = express();

// const port = process.env.PORT || 9000;

// /**
//  * We use the use() method to register a middleware function for handling
// GraphQL requests.
// We have '/graphql' as our GraphQL endpoint. Ie. the middleware function
// graphqlHTTP({}) will be executed for all requests to the server that have
// the path '/graphql'.
//  */
// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: process.env.NODE_ENV === 'development'
// }))

// app.listen(port, () => {
//     console.log(`App listening on port ${port}!`);
// });