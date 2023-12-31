import prisma from "../../../libs/prisma";

const userResolvers = {
  Query: {
    // Get all users
    users: async () => {
      return await prisma.user.findMany();
    },
    // Get a single user
    user: async (_: any, { id }: { id: number }) => {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new Error(`No user found with ID ${id}`);
      }
      return user;
    },
  },
  Mutation: {
    // Create a new user
    createUser: async (
      _: any,
      { clerkId, name }: { clerkId: string; name?: string }
    ) => {
      return await prisma.user.create({
        data: {
          clerkId,
          name,
        },
      });
    },
    // Update an existing user
    updateUser: async (_: any, { id, name }: { id: number; name?: string }) => {
      return await prisma.user.update({
        where: { id },
        data: {
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
