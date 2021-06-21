const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./routes/foodRoutes.js");
const foodModel = require("./models/food");
const catModel = require("./models/cat");
const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Cat {
    id: ID!
    name: String
    age: Int
    description: String
    image_url: String
    background_color: String
    owner: [Owner]
  }

  type Owner {
    name: String
    phone: String
    email: String
    address: String
  }

  type CatResponse {
    success: Boolean!
    error: String
    data: [Cat]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    fetchCats: [Cat]!
  }

  type Mutation {
    likeCat(id: Int): CatResponse
    UnlikeCat(id: Int): CatResponse
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    fetchCats: (parent, args) => {
      return catModel.find({});
    },
  },
  Mutation: {
    likeCat: (parent, args) => {
      const theCat = catModel.find(args.id);
      if (theCat === []) {
        const CatResponse = {
          success: false,
          error: "No cat Found",
          data: [],
        };
        // CatResponse.push(CatResponse);
        return CatResponse;
      }

      const CatResponse = {
        success: catModel.find(args.id) ? true : false,
        error: "Found your cat",
        data: catModel.find({ id: args.id }),
      };
      // CatResponse.push(CatResponse);
      return CatResponse;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

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

// app.use(foodRouter);

// app.listen(3000, () => {
//   console.log("Server is running...");
// });
