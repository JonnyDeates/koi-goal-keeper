import { type Knex } from "knex";
import {SessionData, type User} from "@repo/types";

const usersRepo = {
  tableName: "users",
  findUserByEmail(knex: Knex, email: string): Promise<User | undefined> {
    return knex(this.tableName)
      .where({ email })
      .first()
      .then(user => user);
  },
  findUserById(knex: Knex, id: number): Promise<User | undefined> {
    return knex(this.tableName)
      .where({ id })
      .first()
      .then(user => user);
  },
  hasUserWithEmail(knex: Knex, email: string): Promise<boolean> {
    return knex(this.tableName)
      .where({ email })
      .first()
      .then(user => Boolean(user));
  },
  updateUser(knex: Knex, id: number, newUserFields: Partial<User>): Promise<void> {
    return knex(this.tableName)
      .where({ id })
      .update({...newUserFields, date_modified: new Date()});
  },
  async save(knex: Knex, user: Omit<User, 'id'>): Promise<SessionData> {
    const x = await knex
        .insert(user)
        .into(this.tableName)
        .returning("*");
    const {id, email, name, paid_account, date_created, email_notifications} = x[0] as User;
    return ({id, email, name, paid_account, dateCreated: date_created as Date, email_notifications});
  },
  deleteUser(knex: Knex, id: number): Promise<void> {
    return knex(this.tableName)
      .where({ id })
      .delete();
  }
};

export default usersRepo;
