import {type GoalType} from "@repo/types";
import {createId} from "@paralleldrive/cuid2";
import {buildTask} from "./buildTask";


export const buildGoal = (partialGoal: Partial<GoalType> = {}): GoalType => ({
  tasks: {[createId()]: buildTask()},
  tasksCompleted: 0,
  createdDate: new Date(),
  modifiedDate: new Date(),
  completionDate: new Date(),
  name: '',
  isEditing: true,
  ...partialGoal
});
