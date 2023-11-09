import { expect, test, vi, describe } from "vitest";
import userResolvers from "./user.resolver";
import prisma from "../../../libs/__mocks__/prisma";

vi.mock("../../../libs/prisma");

const MOCK_USER = { id: 2, clerkId: "2", name: "John" };
const MOCK_USERS = [
  { id: 1, clerkId: "1", name: "Prisma Fan" },
  MOCK_USER,
  { id: 3, clerkId: "3", name: "Prisma Fan 3" },
];

describe("Query resolvers", () => {
  test("Gets all users", async () => {
    prisma.user.findMany.mockResolvedValue(MOCK_USERS);

    const users = await userResolvers.Query.users();

    expect(users).toStrictEqual(MOCK_USERS);
  });

  test("Gets a single user by ID", async () => {
    prisma.user.findUnique.mockResolvedValue(MOCK_USER);

    const user = await userResolvers.Query.user(null, { id: 2 });

    expect(user).toStrictEqual(MOCK_USER);
  });

  test("Throws an error when a user is not found by ID", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(userResolvers.Query.user(null, { id: 3 })).rejects.toThrow(
      "No user found with ID 3"
    );
  });
});

describe("Mutation resolvers", () => {
  test("createUser should return the generated user", async () => {
    const newUser = { clerkId: "22222", name: "Prisma Fan" };

    prisma.user.create.mockResolvedValue({ ...newUser, id: 1 });

    const user = await userResolvers.Mutation.createUser(null, {
      clerkId: "22222",
      name: "Prisma Fan",
    });

    expect(user).toStrictEqual({ ...newUser, id: 1 });
  });

  test("Updates a user's name", async () => {
    const updatedUser = { id: 1, clerkId: "1", name: "Updated Name" };

    prisma.user.update.mockResolvedValue(updatedUser);

    const user = await userResolvers.Mutation.updateUser(null, {
      id: 1,
      name: "Updated Name",
    });

    expect(user).toStrictEqual(updatedUser);
  });

  test("Deletes a user by ID", async () => {
    const deletedUser = { id: 4, clerkId: "4", name: "Doe" };

    prisma.user.delete.mockResolvedValue(deletedUser);

    const user = await userResolvers.Mutation.deleteUser(null, { id: 4 });

    expect(user).toStrictEqual(deletedUser);
  });
});
