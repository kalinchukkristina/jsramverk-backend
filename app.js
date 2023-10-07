require("dotenv").config();

const express = require("express");
const cors = require("cors"); // Import the cors package
const bodyParser = require("body-parser");
const fetchTrainPositions = require("./models/trains.js");
const { connectDb } = require("./db/database");
const delayed = require("./routes/delayed.js");
const tickets = require("./routes/tickets.js");
const codes = require("./routes/codes.js");

const visual = true;
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { GraphQLSchema } = require("graphql");
const RootQueryType = require("./graphql/root.js");

const app = express();
const httpServer = require("http").createServer(app);

// Configure CORS to allow requests from your frontend (adjust origin as needed)
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

const port = process.env.PORT || 1337;

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

app.get("/", (req, res) => {
  res.json({
    data: "Hello World!",
  });
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: visual,
  })
);

// app.use("/delayed", delayed);
// app.use("/tickets", tickets);
// app.use("/codes", codes);

fetchTrainPositions(io);

module.exports = app;
