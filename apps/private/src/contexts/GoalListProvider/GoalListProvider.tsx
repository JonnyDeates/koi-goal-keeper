import React, {createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState} from "react";
import {type GoalListType} from "@repo/types";
import {buildSort, type SortType} from "../../utils/builders/buildSort";


interface GoalListContextType {
  allGoals: GoalListType,
  applyActionToGoalList: Dispatch<SetStateAction<GoalListType>>,
  sort: SortType,
  applyActionToSort: Dispatch<SetStateAction<SortType>>
}

const GoalListContext = createContext<GoalListContextType>({} as GoalListContextType);

function GoalListProvider({children}: { children: ReactNode }) {
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
}

export default GoalListProvider;

export const useGoalListContext = () => useContext(GoalListContext);