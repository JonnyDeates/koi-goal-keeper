import {GoalType} from "@repo/types";
import cuid2 from "@paralleldrive/cuid2";
import {GoalListType} from "../GoalList";
import {buildGoal} from "../../../utils/builders/buildGoal";
import dayjs from "dayjs";

const GoalActions = {
    createNewGoal: (prevState: GoalListType) => ({...prevState, [cuid2.createId()]: buildGoal()}),
    updateGoalDueDate: (goalId: string, dueDate: number) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId] as GoalType
        goalBeingModified.completionDate = dayjs().add(dueDate, 'day').toDate();

        return {...prevState}
    },
}

export default GoalActions