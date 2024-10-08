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
// Serve static files in production
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
