import {GoalType} from "@repo/types";
import {buildObjective} from "./buildObjective";
import cuid2 from "@paralleldrive/cuid2";


export const buildGoal = (partialGoal: Partial<GoalType> = {}): GoalType => ({
    objectives: {[cuid2.createId()]: buildObjective()},
    createdDate: new Date(),
    modifiedDate: new Date(),
    completionDate: new Date(),
    ...partialGoal
})
