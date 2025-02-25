import {type Request} from "express";
import {Settings, UpdatableSettingsEntity} from "@repo/types";
import Database from "../utils/database/Database";
import settingsRepo from "./settingsRepo";

const settingsService = {
    findOrCreate: async (req: Request, userId: number): Promise<Settings> => {
        const database = Database.get(req);

        const settingsEntity = await settingsRepo.findOrCreate(database, userId);

        return {selectedDueDate: settingsEntity.selected_due_date};
    },

    update: async (req: Request, userId: number, settingsUpdatable: Partial<Settings>): Promise<void> => {
        const database = Database.get(req);
        const updatablePortionsOfSettings: UpdatableSettingsEntity = {}

        if (settingsUpdatable.selectedDueDate) updatablePortionsOfSettings.selected_due_date = settingsUpdatable.selectedDueDate


        await settingsRepo.update(database, userId, updatablePortionsOfSettings)
    },
};
export default settingsService;