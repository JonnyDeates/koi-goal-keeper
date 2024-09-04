export type User = {
  id: string,
  password: string,
  email: string,
  name: string,
  paid_account: string,
  token?: string | null,
  token_expires?: Date | null,
  date_created?: Date,
  date_modified?: Date
}
export type Theme = "Default" | "Bekko" | "Benigoi" | "Kigoi" | "Kin Showa" | "Lucki" | "Platinum" | "Sanke"

export type SessionData = Omit<User, "password" | "date_created" | "date_modified">
export type SessionResponse = Omit<SessionData, "id">
export type ErrorType<T extends string | number | symbol = string> = Partial<Record<T, string>>;

