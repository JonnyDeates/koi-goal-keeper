export type Theme = "Default" | "Bekko" | "Benigoi" | "Kigoi" | "Kin Showa" | "Lucki" | "Platinum" | "Sanke"
export type ErrorType<T extends string | number | symbol = string> = Partial<Record<T, string>>;

export {
    type GoalType,
    type GoalEntityType,
    type GoalListType,
    type UpdatableGoalType,
    type GoalTaskJoinedEntityType,
    type UpdatableGoalEntityType
} from './Goals'
export {
    type TaskType, type TaskEntityType, type TaskListType, type UpdatableTaskType, type UpdatableTaskEntityType
} from './Tasks'
export {
    DUE_DATE,
    type THRESHOLD,
    type SELECTABLE_DUE_DATE_OPTION,
    type SELECTABLE_DUE_DATES,
} from './DueDates'

export {type Settings, type SettingsEntityType, type UpdatableSettingsEntity, type UserSettingsResponse} from './Settings'
export {type User, type SessionData} from './User'