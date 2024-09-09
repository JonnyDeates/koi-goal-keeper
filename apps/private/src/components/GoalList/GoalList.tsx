import React from "react";
import {GoalType} from "@repo/types";
import './Goal.css'
import Goal from "./components/Goal";
import {useGoalListContext} from "../../contexts/GoalListProvider";


export type GoalListType = Record<string, GoalType>


const GoalList = () => {
  const {allGoals} = useGoalListContext();
  const goalListOfIds = Object.keys(allGoals);

  return <>
    {goalListOfIds.map((goalId) => <React.Fragment key={goalId}>
        <Goal id={goalId}
              {...(allGoals[goalId] as GoalType)}/>
      </React.Fragment>
    )}
  </>
};
export default GoalList