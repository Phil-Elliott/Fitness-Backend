import { expect, test, vi } from "vitest";
import userResolvers from "./user.resolver";
import prisma from "../../../libs/__mocks__/prisma";

vi.mock("../../../libs/prisma");

test("createUser should return the generated user", async () => {
  const newUser = { clerkId: "22222", name: "Prisma Fan" };

  prisma.user.create.mockResolvedValue({ ...newUser, id: 1 });

  const user = await userResolvers.Mutation.createUser(null, {
    clerkId: "22222",
    name: "Prisma Fan",
  });

  expect(user).toStrictEqual({ ...newUser, id: 1 });
});

test("Gets all users", async () => {
  prisma.user.findMany.mockResolvedValue([
    { id: 1, clerkId: "1", name: "Prisma Fan" },
  ]);

  const users = await userResolvers.Query.users();

  expect(users).toStrictEqual([{ id: 1, clerkId: "1", name: "Prisma Fan" }]);
});
