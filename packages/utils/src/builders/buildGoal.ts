import {buildTask} from "./buildTask.ts";
import {createId} from "@paralleldrive/cuid2";
import {GoalType} from "@repo/types";


export const buildGoal = (partialGoal: Partial<GoalType> = {}): GoalType => ({
  tasks: {[1]: buildTask()},
  tasksCompleted: 0,
  createdDate: new Date(),
  modifiedDate: new Date(),
  completionDate: new Date(),
  name: '',
  isEditing: true,
  isFavorite: false,
  id: 1,
  ...partialGoal
});
