import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {GoalListType} from "../components/GoalList/GoalList";


type GoalListContextType = { allGoals: GoalListType, applyActionToGoalList: Dispatch<SetStateAction<GoalListType>> }

const GoalListContext = createContext<GoalListContextType>({} as GoalListContextType)


const GoalListProvider = ({children}: {children: ReactNode}) => {
    const [allGoals, applyActionToGoalList] = useState<GoalListType>({})

    return <GoalListContext.Provider value={{allGoals, applyActionToGoalList}}>
        {children}
    </GoalListContext.Provider>;
};

export default GoalListProvider

export const useGoalListContext = () => useContext(GoalListContext)