import React from "react";
import {useGoalListContext} from "../../contexts/GoalListProvider/GoalListProvider";
import Goal from "./components/Goal/Goal";
import sortGoalListToIds from "./utils/sortGoalListToIds";
import './Goal.css';
import {GoalType} from "@repo/types";


function GoalList() {
    const {allGoals, sort} = useGoalListContext();

    const sortedGoalListOfIds = sortGoalListToIds(sort, allGoals);

    return <>
        {sortedGoalListOfIds.map((goalId) =>
            <React.Fragment key={goalId}>
                <Goal id={goalId} {...(allGoals[goalId] as GoalType)}/>
            </React.Fragment>
        )}
    </>;
}

export default GoalList;