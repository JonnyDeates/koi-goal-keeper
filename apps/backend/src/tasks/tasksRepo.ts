import {type Knex} from "knex";
import {TaskEntityType, UpdatableTaskEntityType} from "@repo/types";

const tasksRepo = {
    tableName: "tasks",
    async save(knex: Knex, task: Omit<TaskEntityType, 'id' | "date_modified">): Promise<TaskEntityType> {
        const [taskSaved] = await knex
            .insert(task)
            .into(this.tableName)
            .returning("*");

        return taskSaved as TaskEntityType
    },
    async saveAll(knex: Knex, tasks: Omit<TaskEntityType, 'id' | "date_modified">[]): Promise<TaskEntityType[]> {
        const tasksSaved = await knex
            .batchInsert(this.tableName, tasks)
            .returning("*");

        return tasksSaved as TaskEntityType[]
    },
    async update(knex: Knex, goalId: number, taskId: number, newUpdatableTask: UpdatableTaskEntityType): Promise<void> {
        return knex(this.tableName)
            .where({id: taskId, goal_id: goalId})
            .update({...newUpdatableTask, date_modified: new Date()});
    },
    async toggleAll(knex: Knex, goalId: number): Promise<TaskEntityType[]> {
        try {
            const [taskState] = await knex('tasks')
                .select(
                    knex.raw('COUNT(*) AS total_tasks'),
                    knex.raw('SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) AS completed_tasks')
                )
                .where('goal_id', goalId)
                .groupBy('goal_id');

            if (taskState) {
                const updateCompleted = taskState.completed_tasks !== taskState.total_tasks;

                return await knex('tasks')
                    .where('goal_id', goalId)
                    .update({is_completed: updateCompleted})
                    .returning("*")
            }
        } catch (error) {
            console.error('Error toggling tasks:', error);
        }
        return [];
    },
    delete(knex: Knex, id: number): Promise<void> {
        return knex(this.tableName)
            .where({id})
            .delete();
    }
};

export default tasksRepo;
