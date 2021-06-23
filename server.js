const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const resolvers = require("./schema/resolvers");
const typeDefs = require("./schema/typeDefs");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
  tracing: true,
  introspection: true,
  playground: true,
});

// The `listen` method launches a web server.
server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb://admin-51:mongo555@cluster0-shard-00-00.jgi8k.mongodb.net:27017,cluster0-shard-00-01.jgi8k.mongodb.net:27017,cluster0-shard-00-02.jgi8k.mongodb.net:27017/cat-database?ssl=true&replicaSet=atlas-9uldxm-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);