import {TaskListType} from "../Tasks";

export type GoalType = {
    tasks:TaskListType,
    id: number,
    createdDate: Date,
    modifiedDate: Date,
    completionDate: Date,
    tasksCompleted: number,
    isEditing: boolean,
    isFavorite: boolean,
    name: string
}
export type UpdatableGoalEntityType = Partial<Pick<GoalEntityType, "name" | "is_favorite" | 'completion_date'>>

export type GoalEntityType = {
    date_created: Date,
    date_modified: Date,
    completion_date: Date,
    is_favorite: boolean,
    name: string,
    id: number,
    user_id: number
}
export type UpdatableGoalType = Partial<Pick<GoalType, 'name' | 'completionDate' | 'isFavorite'>>

export type GoalTaskJoinedEntityType = Omit<GoalEntityType, 'user_id'> & {
    task_id: number,
    task_name: string,
    task_is_completed: boolean
}

export type GoalListType = Record<string, GoalType>
