import React from "react";
import {GoalType} from "@repo/types";
import './Goal.css'
import Goal from "./components/Goal";
import {useGoalListContext} from "../../contexts/GoalListProvider/GoalListProvider";
import {SortType} from "../../utils/builders/buildSort";
import sortGoalListToIds from "./utils/sortGoalListToIds";


export type GoalListType = Record<string, GoalType>

const GoalList = () => {
  const {allGoals, sort} = useGoalListContext();

  const sortedGoalListOfIds = sortGoalListToIds(sort, allGoals);

  return <>
    {sortedGoalListOfIds.map((goalId) =>
      <React.Fragment key={goalId}>
        <Goal id={goalId}
              {...(allGoals[goalId] as GoalType)}/>
      </React.Fragment>
    )}
  </>
};
export default GoalList