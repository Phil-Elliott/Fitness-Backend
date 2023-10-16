import { prisma } from "../../prisma";

const ExerciseSetResolvers = {
  Query: {
    // Get a single ExerciseSet by ID
    exerciseSet: async (_: any, args: { id: number }) => {
      return await prisma.exerciseSet.findUnique({
        where: {
          id: args.id,
        },
      });
    },

    // Get all ExerciseSets of a specific WorkoutExercise
    exerciseSetsByWorkoutExercise: async (
      _: any,
      args: { workoutExerciseId: number }
    ) => {
      return await prisma.exerciseSet.findMany({
        where: {
          workoutExerciseId: args.workoutExerciseId,
        },
      });
    },
  },

  Mutation: {
    // Create a new ExerciseSet for a WorkoutExercise
    createExerciseSet: async (
      _: any,
      args: {
        workoutExerciseId: number;
        setNumber: number;
        reps: number;
        weight: number;
      }
    ) => {
      return await prisma.exerciseSet.create({
        data: {
          workoutExerciseId: args.workoutExerciseId,
          setNumber: args.setNumber,
          reps: args.reps,
          weight: args.weight,
        },
      });
    },

    // Update an ExerciseSet by ID (e.g., to change the reps or weight)
    updateExerciseSet: async (
      _: any,
      args: { id: number; setNumber?: number; reps?: number; weight?: number }
    ) => {
      return await prisma.exerciseSet.update({
        where: {
          id: args.id,
        },
        data: {
          setNumber: args.setNumber,
          reps: args.reps,
          weight: args.weight,
        },
      });
    },

    // Delete an ExerciseSet by ID
    deleteExerciseSet: async (_: any, args: { id: number }) => {
      return await prisma.exerciseSet.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};

export default ExerciseSetResolvers;
