import {TaskType} from "@repo/types";

export const buildTask = (partialObjective: Partial<TaskType> = {}):TaskType => ({
    name: '',
    isEditing: true,
    isCompleted: false,
    id: 1,
    ...partialObjective
});