const catModel = require("../models/cat");
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

  module.exports = resolvers;