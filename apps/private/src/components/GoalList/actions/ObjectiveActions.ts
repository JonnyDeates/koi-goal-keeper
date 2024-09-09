import {GoalType, ObjectiveType} from "@repo/types";
import {createId} from "@paralleldrive/cuid2";
import {buildObjective} from "../../../utils/builders/buildObjective";
import {GoalListType} from "../GoalList";

const ObjectiveActions = {
    createNewObjective: (goalId: string) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId] as GoalType;
        goalBeingModified.objectives[createId()] = buildObjective();

        return {...prevState}
    },
    updateObjective: (goalId: string, objectiveId: string, text: string) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId] as GoalType
        const objectiveToModify = goalBeingModified.objectives[objectiveId] as ObjectiveType
        objectiveToModify.text = text;

        return {...prevState}
    },
    toggleEditingObjective: (goalId: string, objectiveId: string, key: 'isEditing' | 'isCompleted') => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId] as GoalType
        const objectiveToModify = goalBeingModified.objectives[objectiveId] as ObjectiveType
        objectiveToModify[key] = !objectiveToModify[key];

        return {...prevState}
    },
}

export default ObjectiveActions