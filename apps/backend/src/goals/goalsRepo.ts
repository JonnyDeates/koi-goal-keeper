import {type Knex} from "knex";
import {GoalEntityType, GoalTaskJoinedEntityType, TaskEntityType, UpdatableGoalEntityType, type User} from "@repo/types";



const goalsRepo = {
  tableName: "goals",
  find(knex: Knex, userId: number, goalId: number): Promise<GoalTaskJoinedEntityType[]> {
    return knex(this.tableName)
        .leftJoin('tasks', 'goals.id', 'tasks.goal_id')
        .select(
            'goals.id as id',
            'goals.date_created as date_created',
            'goals.completion_date as completion_date',
            'goals.is_favorite as is_favorite',
            'goals.name as name',
            'goals.date_modified as date_modified',
            'tasks.id as task_id',
            'tasks.name as task_name',
            'tasks.is_completed as task_is_completed'
        )
        .where('goals.user_id', userId)
        .andWhere('goals.id', goalId);
  },
  findAll(knex: Knex, userId: number): Promise<GoalTaskJoinedEntityType[]> {
    return knex(this.tableName)
        .leftJoin('tasks', 'goals.id', 'tasks.goal_id')
        .select(
            'goals.id as id',
            'goals.date_created as date_created',
            'goals.completion_date as completion_date',
            'goals.is_favorite as is_favorite',
            'goals.name as name',
            'goals.date_modified as date_modified',
            'tasks.id as task_id',
            'tasks.name as task_name',
            'tasks.is_completed as task_is_completed'
        )
        .where('goals.user_id', userId);
  },
  async update(knex: Knex, id: number, newGoalFields: UpdatableGoalEntityType): Promise<void> {
    return knex(this.tableName)
        .where({id})
        .update({...newGoalFields, date_modified: new Date()});
  },
  async save(knex: Knex, goal: Omit<GoalEntityType, 'id' | "date_modified">): Promise<GoalEntityType> {
    const goalSaved = await knex
        .insert(goal)
        .into(this.tableName)
        .returning("*");

    return goalSaved[0] as GoalEntityType
  },
  delete(knex: Knex, goalId: number): Promise<void> {
    return knex(this.tableName)
      .where({ id: goalId })
      .delete();
  }
};

export default goalsRepo;
