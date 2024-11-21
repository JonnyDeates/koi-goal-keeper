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
import dayjs from "dayjs";


interface GoalListContextType {
  allGoals: GoalListType,
  applyActionToGoalList: Dispatch<SetStateAction<GoalListType>>,
  sort: SortType,
  applyActionToSort: Dispatch<SetStateAction<SortType>>
  filter: FilterType,
  applyActionToFilter: Dispatch<SetStateAction<FilterType>>
}

const GoalListContext = createContext<GoalListContextType>({} as GoalListContextType);

function GoalListProvider({children}: { children: ReactNode }) {
  const [allGoals, applyActionToGoalList] = useState<GoalListType>({});
  const [sort, applyActionToSort] = useState<SortType>(buildSort());
  const [filter, applyActionToFilter] = useState<FilterType>(buildFilter());

  const filteredGoals = useCallback(() => {
    const goalsBeingFiltered: GoalListType = {};

    Object.keys(allGoals).forEach(goalId => {
      const currentGoal = allGoals[goalId];
      let passesAllCriteria = true;
      if (filter.showOnlyStarred && !currentGoal.isFavorite) {
        passesAllCriteria = false;
      }
      if (!filter.showCompletedGoals && currentGoal.tasksCompleted === Object.keys(currentGoal.tasks).length) {
        passesAllCriteria = false;
      }

      const todayDate = new Date();

      if (!filter.showAllIncludingPastDue && (
        dayjs(currentGoal.completionDate).isBefore(todayDate, 'day'))
      ) {
        passesAllCriteria = false;
      }

      if (passesAllCriteria) {
        goalsBeingFiltered[goalId] = allGoals[goalId];
      }
    });
    return goalsBeingFiltered;
  }, [allGoals, filter]);

  const value: GoalListContextType = {
    allGoals: filteredGoals(),
    applyActionToGoalList,
    filter,
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