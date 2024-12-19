import type {GoalListType} from "@repo/types";
import dayjs from "dayjs";
import {FilterType} from "../../../utils/builders/buildFilter";
import {SearchResult} from "@repo/utils";


const filterForGoals = (
  allGoals: GoalListType,
  allGoalIds: string[],
  filter: FilterType,
  tasksFoundFromSearch: SearchResult,
  goalsFoundFromSearch: SearchResult
) => {
  const filteredGoals: GoalListType = {};

  allGoalIds.forEach(goalId => {
    const currentGoal = allGoals[goalId];
    let passesAllCriteria = true;
    const taskIds = Object.keys(currentGoal.tasks);
    // IF goal is editing or any tasks are in the goal skip the filtering process
    if (currentGoal.isEditing || taskIds.some(taskId => currentGoal.tasks[taskId].isEditing)) {
      filteredGoals[goalId] = allGoals[goalId];
    } else {

      // If only starred is selected, and current goal is NOT starred
      if (filter.showOnlyStarred && !currentGoal.isFavorite) {
        passesAllCriteria = false;
      }

      // If showCompletedGoals is selected and tasks completed matches the amount of tasks.
      if (!filter.showCompletedGoals && currentGoal.tasksCompleted === taskIds.length) {
        passesAllCriteria = false;
      }
      const todayDate = new Date();

      // If showAllIncludingPastDue is selected and goals are prior to today, show.
      if (!filter.showAllIncludingPastDue && (
        dayjs(currentGoal.completionDate).isBefore(todayDate, 'day'))
      ) {
        passesAllCriteria = false;
      }

      // Finds if any taskIds that are found from search
      const anyTasksMatch = taskIds.some((taskId) => {
        return !!tasksFoundFromSearch[taskId];
      });

      // If search text is there and no Goals or tasks match filters out
      if (!!filter.searchText && !goalsFoundFromSearch[goalId] && !anyTasksMatch) {
        passesAllCriteria = false;
      }


      // If it passes all of this criteria then it shows that goal.
      if (passesAllCriteria) {
        filteredGoals[goalId] = allGoals[goalId];
      }
    }

  });
  return filteredGoals;
};
export default filterForGoals;