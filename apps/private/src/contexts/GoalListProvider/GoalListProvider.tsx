import React, {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import {type GoalListType} from "@repo/types";
import {buildSort, type SortType} from "../../utils/builders/buildSort";
import GoalClient from "../../components/GoalList/components/Goal/clients/GoalClient";


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

  useEffect(()=> {
    GoalClient.getAll().then((response)=>{
      if(response.data.goalList)

      applyActionToGoalList(response.data.goalList)
    })
  }, [])

  return <GoalListContext.Provider value={value}>
    {children}
  </GoalListContext.Provider>;
}

export default GoalListProvider;

export const useGoalListContext = () => useContext(GoalListContext);