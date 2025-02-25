import {SELECTABLE_DUE_DATE_OPTION, UserSettingsResponse} from "@repo/types";


const SettingsActions = {
    updateName: (updatedName: string) => (prevState: UserSettingsResponse):UserSettingsResponse => ({...prevState, name: updatedName}),
    updateSelectedDueDateOption: (selectedDueDate: SELECTABLE_DUE_DATE_OPTION) => (prevState: UserSettingsResponse):UserSettingsResponse => ({...prevState, selectedDueDate}),
}
export default SettingsActions