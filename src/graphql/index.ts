import { readFileSync } from "fs";
import path from "path";
import userResolver from "./resolvers/user.resolver";
import workoutResolver from "./resolvers/workout.resolver";
import workoutExerciseResolver from "./resolvers/workoutExercise.resolver";
import exerciseSetResolver from "./resolvers/exerciseSet.resolver";

const userTypes = readFileSync(
  path.join(__dirname, "./typeDefs/user.graphql"),
  {
    encoding: "utf8",
  }
);

const workoutTypes = readFileSync(
  path.join(__dirname, "./typeDefs/workout.graphql"),
  {
    encoding: "utf8",
  }
);

const workoutExerciseTypes = readFileSync(
  path.join(__dirname, "./typeDefs/workoutExercise.graphql"),
  {
    encoding: "utf8",
  }
);

const exerciseSetTypes = readFileSync(
  path.join(__dirname, "./typeDefs/exerciseSet.graphql"),
  {
    encoding: "utf8",
  }
);

export const typeDefs = `
  ${userTypes}
  ${workoutTypes}
  ${workoutExerciseTypes}
  ${exerciseSetTypes}
`;

export const resolvers = {
  Query: {
    ...userResolver.Query,
    ...workoutResolver.Query,
    ...workoutExerciseResolver.Query,
    ...exerciseSetResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...workoutResolver.Mutation,
    ...workoutExerciseResolver.Mutation,
    ...exerciseSetResolver.Mutation,
  },
};
