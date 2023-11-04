import prisma from "../../../libs/prisma";

const WorkoutResolvers = {
  Query: {
    // Get a single Workout by ID
    workout: async (_: any, args: { id: number }) => {
      const workout = await prisma.workout.findUnique({
        where: {
          id: args.id,
        },
        include: {
          exercises: true, // Include related exercises
        },
      });

      if (!workout) return null; // handle case where workout is not found

      const formattedDate = workout.date.toISOString();

      // Return a new object with the formatted date and spread in other workout properties
      return {
        ...workout,
        date: formattedDate,
      };
    },

    // Get all Workouts of a specific User
    userWorkouts: async (_: any, args: { userId: number }) => {
      console.log("userWorkouts");
      const workouts = await prisma.workout.findMany({
        where: {
          userId: args.userId,
        },
        include: {
          exercises: true, // Include related exercises
        },
      });

      // Map over the workouts array and transform the date for each workout
      return workouts.map((workout) => ({
        ...workout,
        date: workout.date.toISOString(),
      }));
    },
  },

  Mutation: {
    // Create a new Workout for a User
    createWorkout: async (_: any, args: { userId: number; date?: string }) => {
      return await prisma.workout.create({
        data: {
          userId: args.userId,
          date: args.date ? new Date(args.date) : new Date(), // Convert string to Date object
        },
      });
    },

    // Update a Workout by ID (e.g., to change the date)
    updateWorkout: async (_: any, args: { id: number; date: string }) => {
      return await prisma.workout.update({
        where: {
          id: args.id,
        },
        data: {
          date: new Date(args.date), // Convert string to Date object
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
