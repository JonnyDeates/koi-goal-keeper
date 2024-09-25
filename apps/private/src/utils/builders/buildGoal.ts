import {GoalType} from "@repo/types";
import {buildTask} from "./buildTask";
import cuid2 from "@paralleldrive/cuid2";


export const buildGoal = (partialGoal: Partial<GoalType> = {}): GoalType => ({
    tasks: {[cuid2.createId()]: buildTask()},
    createdDate: new Date(),
    modifiedDate: new Date(),
    completionDate: new Date(),
    ...partialGoal
})
