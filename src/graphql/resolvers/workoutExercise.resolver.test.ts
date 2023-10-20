import { expect, test, vi, describe } from "vitest";
import WorkoutExerciseResolvers from "./workoutExercise.resolver";
import prisma from "../../../libs/__mocks__/prisma";

vi.mock("../../../libs/prisma");

const MOCK_WORKOUT_EXERCISE = {
  id: 1,
  workoutId: 1,
  exercise: "Push-up",
  exerciseSets: [
    { id: 1, reps: 10, weight: 50 },
    { id: 2, reps: 15, weight: 60 },
  ],
};

const MOCK_WORKOUT_EXERCISES = [
  MOCK_WORKOUT_EXERCISE,
  {
    id: 2,
    workoutId: 1,
    exercise: "Squat",
    exerciseSets: [{ id: 1, reps: 12, weight: 80 }],
  },
];

describe("WorkoutExercise Query resolvers", () => {
  test("Gets a single WorkoutExercise by ID", async () => {
    prisma.workoutExercise.findUnique.mockResolvedValue(MOCK_WORKOUT_EXERCISE);

    const result = await WorkoutExerciseResolvers.Query.workoutExercise(null, {
      id: 1,
    });

    expect(result).toStrictEqual(MOCK_WORKOUT_EXERCISE);
  });

  test("Gets all WorkoutExercises of a specific Workout", async () => {
    prisma.workoutExercise.findMany.mockResolvedValue(MOCK_WORKOUT_EXERCISES);

    const results =
      await WorkoutExerciseResolvers.Query.workoutExercisesByWorkout(null, {
        workoutId: 1,
      });

    expect(results).toStrictEqual(MOCK_WORKOUT_EXERCISES);
  });
});

describe("WorkoutExercise Mutation resolvers", () => {
  test("Create a new WorkoutExercise for a Workout", async () => {
    prisma.workoutExercise.create.mockResolvedValue(MOCK_WORKOUT_EXERCISE);

    const result =
      await WorkoutExerciseResolvers.Mutation.createWorkoutExercise(null, {
        workoutId: 1,
        exercise: "Push-up",
      });

    expect(result).toStrictEqual(MOCK_WORKOUT_EXERCISE);
  });

  test("Update a WorkoutExercise by ID", async () => {
    const updatedWorkoutExercise = {
      ...MOCK_WORKOUT_EXERCISE,
      exercise: "Modified Push-up",
    };
    prisma.workoutExercise.update.mockResolvedValue(updatedWorkoutExercise);

    const result =
      await WorkoutExerciseResolvers.Mutation.updateWorkoutExercise(null, {
        id: 1,
        exercise: "Modified Push-up",
      });

    expect(result).toStrictEqual(updatedWorkoutExercise);
  });

  test("Delete a WorkoutExercise by ID", async () => {
    prisma.workoutExercise.delete.mockResolvedValue(MOCK_WORKOUT_EXERCISE);

    const result =
      await WorkoutExerciseResolvers.Mutation.deleteWorkoutExercise(null, {
        id: 1,
      });

    expect(result).toStrictEqual(MOCK_WORKOUT_EXERCISE);
  });
});
