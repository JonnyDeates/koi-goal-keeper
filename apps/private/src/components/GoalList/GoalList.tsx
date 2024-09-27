import React from "react";
import {type GoalType} from "@repo/types";
import './Goal.css';
import {useGoalListContext} from "../../contexts/GoalListProvider/GoalListProvider";
import Goal from "./components/Goal";
import sortGoalListToIds from "./utils/sortGoalListToIds";


export type GoalListType = Record<string, GoalType>

function GoalList() {
  const {allGoals, sort} = useGoalListContext();

  const sortedGoalListOfIds = sortGoalListToIds(sort, allGoals);

  return <>
    {sortedGoalListOfIds.map((goalId) =>
      <React.Fragment key={goalId}>{
        allGoals[goalId] ?
          <Goal id={goalId}
                {...(allGoals[goalId])}/>
          : <></>
      }
      </React.Fragment>
    )}
  </>;
}

export default GoalList;