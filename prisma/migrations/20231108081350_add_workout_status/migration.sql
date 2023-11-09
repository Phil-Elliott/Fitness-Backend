-- CreateEnum
CREATE TYPE "WorkoutStatus" AS ENUM ('PLANNED', 'STARTED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "status" "WorkoutStatus" NOT NULL DEFAULT 'PLANNED';
