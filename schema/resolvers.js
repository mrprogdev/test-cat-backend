const catModel = require("../models/cat");
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

// Maps username to content

const resolvers = {
  Query: {
    fetchCats: async (parent, args) => {
      return await catModel.find({}).then((result) => {
        return result;
      });
    },
  },
  Mutation: {
    likeCat: async (parent, args) => {
      const res = await catModel.findOneAndUpdate(
        { id: args.id }, // select one and filter by id
        { is_liked: true }, // set is_liked = true
        { new: true } // will return updated cat
      );
      console.log(res);
      console.log(typeof res);

      return {
        success: true,
        error: "",
        data: [res],
      };
    },

    UnlikeCat: async (parent, args) => {
      const res = await catModel.findOneAndUpdate(
        { id: args.id }, // select one and filter by id
        { is_liked: false }, // set is_liked = false
        { new: true } // will return updated cat
      );
      console.log(res);
      console.log(typeof res);

      return {
        success: true,
        error: "",
        data: [res],
      };
    },
  },
};

module.exports = resolvers;
