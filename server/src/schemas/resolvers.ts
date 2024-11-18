import User from "../models/User.js";
import { signToken } from "../services/auth.js";

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
    createUser: async (_parent: any, args: any) => {
      const user = await User.create(args);

      if (!user) {
        return null;
      }
      const token = signToken(user.username, user.password, user._id);
      return { token, user };
    },
    login: async (_parent: any, args: any) => {
      const user = await User.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!user) {
        return null;
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        return null;
      }
      const token = signToken(user.username, user.password, user._id);
      return { token, user };
    },

  }
};
export default resolvers;
