import { expect, test, vi, describe } from "vitest";
import exerciseSetResolvers from "./exerciseSet.resolver";
import prisma from "../../../libs/__mocks__/prisma";

vi.mock("../../../libs/prisma");

const MOCK_EXERCISE_SET = {
  id: 1,
  workoutExerciseId: 1,
  setNumber: 1,
  reps: 10,
  weight: 100,
};
const MOCK_EXERCISE_SETS = [
  MOCK_EXERCISE_SET,
  { ...MOCK_EXERCISE_SET, id: 2, setNumber: 2 },
  { ...MOCK_EXERCISE_SET, id: 3, setNumber: 3 },
];

describe("Query resolvers", () => {
  test("Gets a single ExerciseSet by ID", async () => {
    prisma.exerciseSet.findUnique.mockResolvedValue(MOCK_EXERCISE_SET);

    const exerciseSet = await exerciseSetResolvers.Query.exerciseSet(null, {
      id: 1,
    });

    expect(exerciseSet).toStrictEqual(MOCK_EXERCISE_SET);
  });

  test("Gets all ExerciseSets of a specific WorkoutExercise", async () => {
    prisma.exerciseSet.findMany.mockResolvedValue(MOCK_EXERCISE_SETS);

    const exerciseSets =
      await exerciseSetResolvers.Query.exerciseSetsByWorkoutExercise(null, {
        workoutExerciseId: 1,
      });

    expect(exerciseSets).toStrictEqual(MOCK_EXERCISE_SETS);
  });
});

describe("Mutation resolvers", () => {
  test("Create a new ExerciseSet for a WorkoutExercise", async () => {
    prisma.exerciseSet.create.mockResolvedValue(MOCK_EXERCISE_SET);

    const result = await exerciseSetResolvers.Mutation.createExerciseSet(null, {
      workoutExerciseId: 1,
      setNumber: 1,
      reps: 10,
      weight: 100,
    });

    expect(result).toStrictEqual(MOCK_EXERCISE_SET);
  });

  test("Updates an ExerciseSet's reps", async () => {
    const updatedExerciseSet = {
      ...MOCK_EXERCISE_SET,
      reps: 12,
    };

    prisma.exerciseSet.update.mockResolvedValue(updatedExerciseSet);

    const exerciseSet = await exerciseSetResolvers.Mutation.updateExerciseSet(
      null,
      {
        id: 1,
        reps: 12,
      }
    );

    expect(exerciseSet).toStrictEqual(updatedExerciseSet);
  });

  test("Updates an ExerciseSet's weight", async () => {
    const updatedExerciseSet = {
      ...MOCK_EXERCISE_SET,
      weight: 120,
    };

    prisma.exerciseSet.update.mockResolvedValue(updatedExerciseSet);

    const exerciseSet = await exerciseSetResolvers.Mutation.updateExerciseSet(
      null,
      {
        id: 1,
        weight: 120,
      }
    );

    expect(exerciseSet).toStrictEqual(updatedExerciseSet);
  });

  test("Deletes an ExerciseSet", async () => {
    prisma.exerciseSet.delete.mockResolvedValue(MOCK_EXERCISE_SET);

    const exerciseSet = await exerciseSetResolvers.Mutation.deleteExerciseSet(
      null,
      {
        id: 1,
      }
    );

    expect(exerciseSet).toStrictEqual(MOCK_EXERCISE_SET);
  });
});
