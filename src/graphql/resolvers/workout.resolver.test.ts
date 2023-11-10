import { expect, test, vi, describe } from "vitest";
import WorkoutResolvers from "./workout.resolver";
import prisma from "../../../libs/__mocks__/prisma";

vi.mock("../../../libs/prisma");

type WorkoutStatus = "PLANNED" | "STARTED" | "COMPLETED";

const MOCK_WORKOUT = {
  id: 1,
  userId: 1,
  date: new Date(),
  exercises: [
    { id: 1, name: "Push-up" },
    { id: 2, name: "Squat" },
  ],
  status: "COMPLETED" as WorkoutStatus,
};

const MOCK_WORKOUTS = [
  MOCK_WORKOUT,
  {
    id: 2,
    userId: 1,
    date: new Date("2022-05-15"),
    exercises: [{ id: 1, name: "Bench Press" }],
    status: "PLANNED" as WorkoutStatus,
  },
  {
    id: 3,
    userId: 2,
    date: new Date(),
    exercises: [{ id: 1, name: "Deadlift" }],
    status: "STARTED" as WorkoutStatus,
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

  test("Gets all Workouts of a specific User on a specific day", async () => {
    prisma.workout.findMany.mockResolvedValue(MOCK_WORKOUTS);

    const results = await WorkoutResolvers.Query.userWorkouts(
      null,
      { date: new Date() },
      { user: { userId: 1 } }
    );

    // Filter mock workouts for the specific date and the user ID
    const mockWorkoutsOnSpecificDate = MOCK_WORKOUTS.filter(
      (workout) =>
        workout.date.toISOString().split("T")[0] ===
          new Date().toISOString().split("T")[0] && workout.userId === 1
    );

    expect(results).toStrictEqual(
      mockWorkoutsOnSpecificDate.map((workout) => ({
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
