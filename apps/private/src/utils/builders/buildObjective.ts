import {ObjectiveType} from "@repo/types";

export const buildObjective = (partialObjective: Partial<ObjectiveType> = {}):ObjectiveType => ({
    text: '',
    isEditing: true,
    isCompleted: false,
    ...partialObjective
})