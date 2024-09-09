import React, {ChangeEventHandler, ReactNode, SetStateAction} from "react";
import {GoalType, ObjectiveType} from "@repo/types";
import {Button, CloseButton, FloatingLabelInputWithButton, Input} from "koi-pool";
import {buildObjective} from "../../utils/builders/buildObjective";
import {createId} from "@paralleldrive/cuid2";
import {handleEnter, handleSubmitEnter} from "@repo/shared";
import './Goal.css'
import Select from "../Select/Select";
import Goal from "./components/Goal";
import {useGoalListContext} from "../../contexts/GoalListProvider";





export type GoalListType = Record<string, GoalType>


const GoalList = () => {
    const {allGoals} = useGoalListContext()
    const goalListOfIds = Object.keys(allGoals)

    return <>
        {goalListOfIds.map((goalId) => <React.Fragment key={goalId}>
                <Goal id={goalId}
                      {...(allGoals[goalId] as GoalType)}/>
            </React.Fragment>
        )}
    </>
}
export default GoalList