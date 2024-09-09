import {GoalType} from "@repo/types";
import cuid2 from "@paralleldrive/cuid2";
import {GoalListType} from "../GoalList";
import {buildGoal} from "../../../utils/builders/buildGoal";
import {DUE_DATE, getDateFromDueDate} from "../../../utils/utils";

const GoalActions = {
  createNewGoal: (prevState: GoalListType) => ({...prevState, [cuid2.createId()]: buildGoal()}),
  updateGoalDueDate: (goalId: string, dueDate: DUE_DATE) => (prevState: GoalListType): GoalListType => {
    const goalBeingModified = prevState[goalId] as GoalType;
    const date = getDateFromDueDate(dueDate);
    if (date !== null) {
      goalBeingModified.completionDate = date;
      return {...prevState}

    }
    return prevState
  },
}

export default GoalActions