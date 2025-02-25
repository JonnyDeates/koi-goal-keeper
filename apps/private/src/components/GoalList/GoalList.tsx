import React from "react";
import {useGoalListContext} from "../../contexts/GoalListProvider/GoalListProvider";
import Goal from "./components/Goal/Goal";
import sortGoalListToIds from "./utils/sortGoalListToIds";
import {GoalType} from "@repo/types";


function GoalList() {
    const {allGoals, sort} = useGoalListContext();

    const sortedGoalListOfIds = sortGoalListToIds(sort, allGoals);

    if(sortedGoalListOfIds.length === 0){
        return <div>
            No Goals Found! Please start by clicking ADD GOAL.
        </div>
    }
    return <>
        {sortedGoalListOfIds.map((goalId) =>
            <React.Fragment key={goalId}>
                <Goal {...(allGoals[goalId] as GoalType)}/>
            </React.Fragment>
        )}
    </>;
}

export default GoalList;