import {type GoalListType, type GoalType} from "@repo/types";

const GoalActions = {
    create: (goal: GoalType) => (prevState: GoalListType) => ({[goal.id]: goal, ...prevState}),
    remove: (id: number) => (prevState: GoalListType): GoalListType => {
        const newState = {...prevState};
        delete newState[id];

        return newState;
    },
    updateDueDate: (goalId: string, dueDate:  Date) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId];
        if (goalBeingModified) {
            goalBeingModified.completionDate = dueDate;

            return {...prevState};
        }

        return prevState;
    },
    updateName: (goalId: number, newName: string) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId];
        if (goalBeingModified) {
            goalBeingModified.name = newName;

            return {...prevState};
        }
        return prevState;
    },
    toggleEditing: (goalId: number, key: 'isEditing' | 'isFavorite') =>  (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId];
        if (goalBeingModified) {
            goalBeingModified[key] = !goalBeingModified[key];

            return {...prevState};
        }
        return prevState;
    },
};

export default GoalActions;