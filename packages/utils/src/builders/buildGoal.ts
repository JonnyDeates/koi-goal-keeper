import {buildTask} from "./buildTask";
import {type GoalType} from "@repo/types";


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
