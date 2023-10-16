import { prisma } from "../../prisma";

const WorkoutResolvers = {
  Query: {
    // Get a single Workout by ID
    workout: async (_: any, args: { id: number }) => {
      return await prisma.workout.findUnique({
        where: {
          id: args.id,
        },
        include: {
          exercises: true, // Include related exercises
        },
      });
    },

    // Get all Workouts of a specific User
    userWorkouts: async (_: any, args: { userId: number }) => {
      return await prisma.workout.findMany({
        where: {
          userId: args.userId,
        },
        include: {
          exercises: true, // Include related exercises
        },
      });
    },
  },

  Mutation: {
    // Create a new Workout for a User
    createWorkout: async (_: any, args: { userId: number; date?: Date }) => {
      return await prisma.workout.create({
        data: {
          userId: args.userId,
          date: args.date || new Date(), // Use provided date or default to current date
        },
      });
    },

    // Update a Workout by ID (e.g., to change the date)
    updateWorkout: async (_: any, args: { id: number; date: Date }) => {
      return await prisma.workout.update({
        where: {
          id: args.id,
        },
        data: {
          date: args.date,
        },
      });
    },

    // Delete a Workout by ID
    deleteWorkout: async (_: any, args: { id: number }) => {
      return await prisma.workout.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};

export default WorkoutResolvers;
