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

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
