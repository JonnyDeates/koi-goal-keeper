import {SELECTABLE_DUE_DATE_OPTION} from "../DueDates";
import {SessionData} from "../User";

export type Settings = {
    selectedDueDate: SELECTABLE_DUE_DATE_OPTION
}
export type SettingsEntityType = {
    selected_due_date: SELECTABLE_DUE_DATE_OPTION,
    date_modified?: Date,
}
export type UpdatableSettingsEntity = Partial<SettingsEntityType>

export type UserSettingsResponse = SessionData & Settings