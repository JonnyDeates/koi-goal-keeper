import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {GoalListType} from "../../components/GoalList/GoalList";
import {buildSort, SortType} from "../../utils/builders/buildSort";


type GoalListContextType = {
  allGoals: GoalListType,
  applyActionToGoalList: Dispatch<SetStateAction<GoalListType>>,
  sort: SortType,
  applyActionToSort: Dispatch<SetStateAction<SortType>>
}

const GoalListContext = createContext<GoalListContextType>({} as GoalListContextType);

const GoalListProvider = ({children}: { children: ReactNode }) => {
  const [allGoals, applyActionToGoalList] = useState<GoalListType>({});
  const [sort, applyActionToSort] = useState<SortType>(buildSort());

  const value: GoalListContextType = {
    allGoals,
    applyActionToGoalList,
    sort,
    applyActionToSort
  };

  return <GoalListContext.Provider value={value}>
    {children}
  </GoalListContext.Provider>;
};

export default GoalListProvider

export const useGoalListContext = () => useContext(GoalListContext);