import axios from "axios";
import {UpdatableGoalType} from "@repo/types";
export const GOAL_URL = '/api/goals'
const GoalClient = {
    create: () => {
        return axios.post(`${GOAL_URL}`, {})
    },
    duplicate: (goalId: number)=>{
        return axios.get(`${GOAL_URL}/${goalId}/duplicate`)
    },
    getAll: ()=> {
      return axios.get(GOAL_URL)
    },
    update: (goalId: number, goal: UpdatableGoalType) => {
        return axios.patch(`${GOAL_URL}/${goalId}`, goal)
    },
    remove: (goalId: number) => {
        return axios.delete(`${GOAL_URL}/${goalId}`)

}

}
export default GoalClient