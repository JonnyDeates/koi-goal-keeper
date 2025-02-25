import React, {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import {type GoalListType} from "@repo/types";
import {buildSort, type SortType} from "../../utils/builders/buildSort";
import GoalClient from "../../components/GoalList/components/Goal/clients/GoalClient";
import {buildFilter, FilterType} from "../../utils/builders/buildFilter";
import {fuzzySearchList, SearchResult} from "@repo/utils";
import filterForGoals from "./utils/filterForGoals";


interface GoalListContextType {
  allGoals: GoalListType,
  applyActionToGoalList: Dispatch<SetStateAction<GoalListType>>,
  sort: SortType,
  applyActionToSort: Dispatch<SetStateAction<SortType>>
  filter: FilterType,
  searchResults: { goalsFoundFromSearch: SearchResult, tasksFoundFromSearch: SearchResult },
  applyActionToFilter: Dispatch<SetStateAction<FilterType>>
}

const GoalListContext = createContext<GoalListContextType>({} as GoalListContextType);

function GoalListProvider({children}: { children: ReactNode }) {
  const [allGoals, applyActionToGoalList] = useState<GoalListType>({});
  const [sort, applyActionToSort] = useState<SortType>(buildSort());
  const [filter, applyActionToFilter] = useState<FilterType>(buildFilter());


  const allGoalIds = Object.keys(allGoals);
  const goalsFoundFromSearch = fuzzySearchList(filter.searchText, allGoalIds.map((goalId) => ({
    id: goalId,
    value: allGoals[goalId]!.name
  })));


  // Could be a better way to do this
  const allTasks = allGoalIds.flatMap((goalId) => {
    return Object.keys(allGoals[goalId]!.tasks).map((taskId) => ({
      id: taskId,
      value: allGoals[goalId]!.tasks[taskId]!.name
    }))
  });
  // Could be really slow, needs more testing.
  const tasksFoundFromSearch = fuzzySearchList(filter.searchText, allTasks);

  const filteredGoals = useCallback(() => filterForGoals(allGoals, allGoalIds, filter, tasksFoundFromSearch, goalsFoundFromSearch),
    [allGoals, filter]);

  const value: GoalListContextType = {
    allGoals: filteredGoals(),
    applyActionToGoalList,
    filter,
    searchResults: {goalsFoundFromSearch, tasksFoundFromSearch},
    applyActionToFilter,
    sort,
    applyActionToSort
  };

  useEffect(() => {
    GoalClient.getAll().then((response) => {
      if (response.data.goalList)
        applyActionToGoalList(response.data.goalList)
    })
  }, []);


  return <GoalListContext.Provider value={value}>
    {children}
  </GoalListContext.Provider>;
}

export default GoalListProvider;

export const useGoalListContext = () => useContext(GoalListContext);