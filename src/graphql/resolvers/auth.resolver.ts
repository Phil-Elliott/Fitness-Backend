import { prisma } from "../../prisma";

const AuthResolvers = {
  Query: {
    // Get a single Auth by ID
    auth: async (_: any, args: { id: number }) => {
      return await prisma.auth.findUnique({
        where: {
          id: args.id,
        },
      });
    },

    // Get all Auths (might be useful for debugging, but use with caution in a production environment)
    allAuths: async () => {
      return await prisma.auth.findMany();
    },
  },

  Mutation: {
    // Create a new Auth
    createAuth: async (_: any, args: { userId: number; token: string }) => {
      return await prisma.auth.create({
        data: {
          userId: args.userId,
          token: args.token,
        },
      });
    },

    // Update an Auth by ID (e.g., to refresh a token)
    updateAuth: async (_: any, args: { id: number; token: string }) => {
      return await prisma.auth.update({
        where: {
          id: args.id,
        },
        data: {
          token: args.token,
        },
      });
    },

    // Delete an Auth by ID
    deleteAuth: async (_: any, args: { id: number }) => {
      return await prisma.auth.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};

export default AuthResolvers;
