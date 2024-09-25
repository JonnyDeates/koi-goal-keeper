import {GoalType} from "@repo/types";
import cuid2 from "@paralleldrive/cuid2";
import {GoalListType} from "../GoalList";
import {buildGoal} from "../../../utils/builders/buildGoal";
import {DUE_DATE, getDateFromDueDate} from "../../../utils/utils";

const GoalActions = {
  create: (prevState: GoalListType) => ({[cuid2.createId()]: buildGoal(), ...prevState}),
  updateGoalDueDate: (goalId: string, dueDate: DUE_DATE) => (prevState: GoalListType): GoalListType => {
    const goalBeingModified = prevState[goalId] as GoalType;
    const date = getDateFromDueDate(dueDate);
    if (date !== null) {
      goalBeingModified.completionDate = date;
      return {...prevState}

    }
    return prevState
  },
  remove: (id: string) => (prevState: GoalListType): GoalListType =>  {
    const newState = {...prevState};
    delete newState[id];

    return newState
  }
};

export default GoalActions