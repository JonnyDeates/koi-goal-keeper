import axios from "axios";
import {UpdatableTaskType} from "@repo/types";
export const TASK_URL = '/api/tasks'


const TaskClient = {
    create: (goalId: number) => {
        return axios.post(`${TASK_URL}/${goalId}`, {})
    },
    update: (goalId: number, taskId: number, task: UpdatableTaskType) => {
        return axios.patch(`${TASK_URL}/${goalId}/${taskId}`, task)
    },
    remove: (goalId: number, taskId: number) => {
        return axios.delete(`${TASK_URL}/${goalId}/${taskId}`)
    },
    toggleAll: (goalId: number)=>{
        return axios.get(`${TASK_URL}/${goalId}/toggle`)
    }
}

export default TaskClient