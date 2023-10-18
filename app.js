require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetchTrainPositions = require("./models/trains.js");
const { connectDb } = require("./db/database");
const app = express();
const httpServer = require("http").createServer(app);
const port = process.env.PORT || 1337;
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./graphql/schema");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connectDb()
  .then(() => {
    console.log("Connected to MongoDB");
    httpServer.listen(port, () => {
      console.log(`JSBackend app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const bootstrapServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.json({
      data: "Hello",
    });
  });
};

fetchTrainPositions(io);
bootstrapServer();

module.exports = app;
