const { gql } = require("apollo-server");
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

module.exports = typeDefs;