import {ObjectiveType} from "@repo/types";

export const buildTask = (partialObjective: Partial<ObjectiveType> = {}):ObjectiveType => ({
    text: '',
    isEditing: true,
    isCompleted: false,
    ...partialObjective
})