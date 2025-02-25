import {UserSettingsResponse} from "@repo/types";


export const buildUserSettings = (userSettingsPartial: Partial<UserSettingsResponse>):UserSettingsResponse => {
    return {
        email_notifications: false,
        email: '',
        id: -1,
        name: '',
        selectedDueDate: "standard",
        paid_account: 'basic',
        dateCreated: new Date(),
        ...userSettingsPartial}
}