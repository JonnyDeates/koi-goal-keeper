export type TaskType ={
    name: string,
    isEditing: boolean,
    isCompleted: boolean,
    id: number
}
export type UpdatableTaskType = Partial<Pick<TaskType, 'name' | 'isCompleted'>>

export type TaskListType = Record<string, TaskType>

export type TaskEntityType= {
    id: number,
    goal_id: number;
    name: string;
    is_completed: boolean,
    date_created: Date,
    date_modified: Date,
}
export type UpdatableTaskEntityType = Partial<Pick<TaskEntityType, 'name' | 'is_completed'>>

