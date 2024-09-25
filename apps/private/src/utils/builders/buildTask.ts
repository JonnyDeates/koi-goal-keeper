import {TaskType} from "@repo/types";

export const buildTask = (partialObjective: Partial<TaskType> = {}):TaskType => ({
    text: '',
    isEditing: true,
    isCompleted: false,
    ...partialObjective
})