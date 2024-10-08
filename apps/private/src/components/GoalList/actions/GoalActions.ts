import {createId} from "@paralleldrive/cuid2";
import {type GoalListType, type GoalType} from "@repo/types";
import {buildGoal} from "../../../utils/builders/buildGoal";
import {type DUE_DATE, getDateFromDueDate} from "../../../utils/utils";

const GoalActions = {
    create: (prevState: GoalListType) => ({[createId()]: buildGoal(), ...prevState}),
    duplicate: (idToDuplicate: string) => (prevState: GoalListType) => {
        const goalBeingModified = prevState[idToDuplicate];
        if (goalBeingModified) {
            const duplicatedGoal: GoalType = {...goalBeingModified, tasks: {}};

            const tasksToDuplicate = goalBeingModified.tasks;

            const taskValues = Object.values(tasksToDuplicate);

            for (const task of taskValues) {
                duplicatedGoal.tasks[createId()] = {...task};
            }
            return {[createId()]: duplicatedGoal, ...prevState};
        }
        return prevState;
    },
    remove: (id: string) => (prevState: GoalListType): GoalListType => {
        const newState = {...prevState};
        delete newState[id];

        return newState;
    },
    updateDueDate: (goalId: string, dueDate: DUE_DATE | Date) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId];
        if (goalBeingModified) {
            goalBeingModified.completionDate = typeof dueDate !== 'object' ? getDateFromDueDate(dueDate) : dueDate;

            return {...prevState};
        }

        return prevState;
    },
    updateName: (goalId: string, newName: string) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId];
        if (goalBeingModified) {
            goalBeingModified.name = newName;

            return {...prevState};
        }
        return prevState;
    },
    toggleEditing: (goalId: string, key: 'isEditing' | 'isFavorite') =>  (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId];
        if (goalBeingModified) {
            goalBeingModified[key] = !goalBeingModified[key];

            return {...prevState};
        }
        return prevState;
    },
};

export default GoalActions;