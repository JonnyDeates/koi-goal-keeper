import {GoalType, TaskType} from "@repo/types";
import {createId} from "@paralleldrive/cuid2";
import {buildTask} from "../../../utils/builders/buildTask";
import {GoalListType} from "../GoalList";

const TaskActions = {
    create: (goalId: string) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId] as GoalType;
        goalBeingModified.tasks[createId()] = buildTask();

        return {...prevState}
    },
    updateTaskText: (goalId: string, objectiveId: string, text: string) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId] as GoalType;
        const objectiveToModify = goalBeingModified.tasks[objectiveId] as TaskType;
        objectiveToModify.text = text;

        return {...prevState}
    },
    toggleTask: (goalId: string, objectiveId: string, key: 'isEditing' | 'isCompleted') => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId] as GoalType;
        const objectiveToModify = goalBeingModified.tasks[objectiveId] as TaskType;
        objectiveToModify[key] = !objectiveToModify[key];

        return {...prevState}
    },
}

export default TaskActions