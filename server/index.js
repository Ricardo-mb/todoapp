import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema  from './schema.js';
import connectDB from './db.js';
import cors from 'cors'

dotenv.config();

const app = express();

connectDB()

const port = process.env.PORT || 9000;

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});










