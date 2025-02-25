export interface User {
    id: number,
    password: string,
    email: string,
    name: string,
    paid_account: string,
    email_notifications: boolean,
    token?: string | null,
    token_expires?: Date | null,
    date_created?: Date,
    date_modified?: Date
}
export type SessionData = Omit<User, "password" | 'date_created' | "date_modified"> & {dateCreated: Date}
