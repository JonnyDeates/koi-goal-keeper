import {type Knex} from "knex";
import {
    GoalEntityType,
    GoalTaskJoinedEntityType,
    SettingsEntityType,
    UpdatableGoalEntityType,
    UpdatableSettingsEntity
} from "@repo/types";


const settingsRepo = {
    tableName: "user_settings",
    async findOrCreate(knex: Knex, userId: number): Promise<SettingsEntityType> {
        const settingEntity = await knex(this.tableName)
            .select('*')
            .where('id', userId)
            .first();
        if (settingEntity) {
            return settingEntity
        } else {
            const [newSettings] = await knex(this.tableName)
                .insert({selected_due_date: 'standard', id: userId})
                .returning('*')
            return newSettings;
        }
    },
    async update(knex: Knex, id: number, newSettingFields: UpdatableSettingsEntity): Promise<void> {

        return knex(this.tableName)
            .where({id})
            .update({...newSettingFields, date_modified: new Date()});
    },
};

export default settingsRepo;
