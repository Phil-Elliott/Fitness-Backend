import { readFileSync } from "fs";
import path from "path";

const userTypes = readFileSync(
  path.join(__dirname, "./typeDefs/user.graphql"),
  {
    encoding: "utf8",
  }
);

const authTypes = readFileSync(
  path.join(__dirname, "./typeDefs/auth.graphql"),
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

const typeDefs = `
  ${userTypes}
    ${authTypes}
    ${workoutTypes}
    ${workoutExerciseTypes}
    ${exerciseSetTypes}
`;

export default typeDefs;
