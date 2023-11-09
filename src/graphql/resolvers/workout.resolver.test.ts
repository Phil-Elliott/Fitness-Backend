import { expect, test, vi, describe } from "vitest";
import WorkoutResolvers from "./workout.resolver";
import prisma from "../../../libs/__mocks__/prisma";

vi.mock("../../../libs/prisma");

const MOCK_WORKOUT = {
  id: 1,
  userId: 1,
  date: new Date(),
  exercises: [
    { id: 1, name: "Push-up" },
    { id: 2, name: "Squat" },
  ],
};

const MOCK_WORKOUTS = [
  MOCK_WORKOUT,
  {
    id: 2,
    userId: 1,
    date: new Date("2022-05-15"),
    exercises: [{ id: 1, name: "Bench Press" }],
  },
  {
    id: 3,
    userId: 1,
    date: new Date(),
    exercises: [{ id: 1, name: "Deadlift" }],
  },
];

describe("Query resolvers", () => {
  test("Gets a single Workout by ID", async () => {
    prisma.workout.findUnique.mockResolvedValue(MOCK_WORKOUT);

    const result = await WorkoutResolvers.Query.workout(null, { id: 1 });

    expect(result).toStrictEqual({
      ...MOCK_WORKOUT,
      date: MOCK_WORKOUT.date.toISOString(),
    });
  });

  test("Gets all Workouts of a specific User", async () => {
    prisma.workout.findMany.mockResolvedValue(MOCK_WORKOUTS);

    const results = await WorkoutResolvers.Query.userWorkouts(null, {
      userId: 1,
    });

    expect(results).toStrictEqual(
      MOCK_WORKOUTS.map((workout) => ({
        ...workout,
        date: workout.date.toISOString(),
      }))
    );
  });
});

describe("Mutation resolvers", () => {
  test("Create a new Workout for a User", async () => {
    prisma.workout.create.mockResolvedValue(MOCK_WORKOUT);

    const result = await WorkoutResolvers.Mutation.createWorkout(null, {
      userId: 1,
      date: MOCK_WORKOUT.date.toISOString(),
    });

    expect(result).toStrictEqual(MOCK_WORKOUT);
  });

  test("Update a Workout by ID", async () => {
    const updatedWorkout = {
      ...MOCK_WORKOUT,
      date: new Date("2023-12-31"),
    };
    prisma.workout.update.mockResolvedValue(updatedWorkout);

    const result = await WorkoutResolvers.Mutation.updateWorkout(null, {
      id: 1,
      date: "2023-12-31",
    });

    expect(result).toStrictEqual(updatedWorkout);
  });

  test("Delete a Workout by ID", async () => {
    prisma.workout.delete.mockResolvedValue(MOCK_WORKOUT);

    const result = await WorkoutResolvers.Mutation.deleteWorkout(null, {
      id: 1,
    });

    expect(result).toStrictEqual(MOCK_WORKOUT);
  });
});
