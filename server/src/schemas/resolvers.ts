import User from "../models/User.js";


const resolvers = {
  Query: {
    getSingleUser: async (_parent: any, args: any, context: any) => {
      const foundUser = await User.findOne({
        $or: [
          { _id: context.user ? context.user._id : args.id },
          { username: args.username },
        ],
      });

      if (!foundUser) {
        return null;
      }

      return foundUser;
    },
  },

  Mutation: {
  }
};
export default resolvers;
