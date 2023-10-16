import { prisma } from "../../prisma";

const WorkoutExerciseResolvers = {
  Query: {
    // Get a single WorkoutExercise by ID
    workoutExercise: async (_: any, args: { id: number }) => {
      return await prisma.workoutExercise.findUnique({
        where: {
          id: args.id,
        },
        include: {
          exerciseSets: true, // Include related exercise sets
        },
      });
    },

    // Get all WorkoutExercises of a specific Workout
    workoutExercisesByWorkout: async (_: any, args: { workoutId: number }) => {
      return await prisma.workoutExercise.findMany({
        where: {
          workoutId: args.workoutId,
        },
        include: {
          exerciseSets: true, // Include related exercise sets
        },
      });
    },
  },

  Mutation: {
    // Create a new WorkoutExercise for a Workout
    createWorkoutExercise: async (
      _: any,
      args: { workoutId: number; exercise: string }
    ) => {
      return await prisma.workoutExercise.create({
        data: {
          workoutId: args.workoutId,
          exercise: args.exercise,
        },
      });
    },

    // Update a WorkoutExercise by ID (e.g., to change the exercise name)
    updateWorkoutExercise: async (
      _: any,
      args: { id: number; exercise: string }
    ) => {
      return await prisma.workoutExercise.update({
        where: {
          id: args.id,
        },
        data: {
          exercise: args.exercise,
        },
      });
    },

    // Delete a WorkoutExercise by ID
    deleteWorkoutExercise: async (_: any, args: { id: number }) => {
      return await prisma.workoutExercise.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};

export default WorkoutExerciseResolvers;
