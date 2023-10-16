import { prisma } from "../../prisma";

const userResolvers = {
  Query: {
    // Get all users
    users: async () => {
      return await prisma.user.findMany();
    },
    // Get a single user
    user: async (_: any, { id }: { id: number }) => {
      return await prisma.user.findUnique({ where: { id } });
    },
  },
  Mutation: {
    // Create a new user
    createUser: async (
      _: any,
      { email, name }: { email: string; name?: string }
    ) => {
      return await prisma.user.create({
        data: {
          email,
          name,
        },
      });
    },
    // Update an existing user
    updateUser: async (
      _: any,
      { id, email, name }: { id: number; email: string; name?: string }
    ) => {
      return await prisma.user.update({
        where: { id },
        data: {
          email,
          name,
        },
      });
    },
    // Delete an existing user
    deleteUser: async (_: any, { id }: { id: number }) => {
      return await prisma.user.delete({
        where: { id },
      });
    },
  },
};

export default userResolvers;
