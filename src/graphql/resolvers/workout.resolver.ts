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
    userWorkouts: async (_: any, args: { date: Date }, context: any) => {
      const userId = context?.user?.userId;

      // If no user is found in the context, it means the request was not authenticated properly
      if (!userId) {
        throw new Error("Authentication required");
      }

      // Create a date range for the specified day
      const startDate = new Date(args.date);
      startDate.setHours(0, 0, 0, 0); // Set to the start of the day

      const endDate = new Date(args.date);
      endDate.setHours(23, 59, 59, 999); // Set to the end of the day

      // Get all workouts for the specified user and date range
      const workoutsSelected = await prisma.workout.findMany({
        where: {
          userId: userId,
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
        include: {
          exercises: true,
        },
      });

      // Map over the workouts array and transform the date for each workout
      return workoutsSelected.map((workout) => ({
        ...workout,
        date: workout.date.toISOString().split("T")[0], // Convert to ISO string and remove time
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
