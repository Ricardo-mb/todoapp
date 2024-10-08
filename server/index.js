import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema.js";
import connectDB from "./db.js";
import cors from "cors";

dotenv.config();

const app = express();

connectDB();

const port = process.env.PORT || 9000;

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// Root route to handle '/'
// app.get("/", (req, res) => {
//   res.send("Welcome to the Todo GraphQL API!");
// });
// Serve the React build folder (static files)
const __dirname = path.resolve(); // Make sure you're in the correct directory
app.use(express.static(path.join(__dirname, "client/build"))); // Assuming React app is in 'client'

// Serve the front-end for any other route not caught by the API
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
