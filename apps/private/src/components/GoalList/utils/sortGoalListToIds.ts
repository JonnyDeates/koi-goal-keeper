import {SortType} from "../../../utils/builders/buildSort";
import {GoalListType} from "../GoalList";

const sortGoalListToIds = (sort: SortType, goalList: GoalListType): string[] => {

  const goalListOfIds = Object.keys(goalList);
  const handleSortDirection = (condition: boolean) => {

    if (sort.direction === 'ASC') {
      return condition ? 1 : -1
    }
    return condition ? -1 : 1;
  };


  goalListOfIds.sort((a, b) => {

    if (sort.type === 'creation-date')
      return handleSortDirection(goalList[a].createdDate > goalList[b].createdDate);
    else if (sort.type === 'tasks-completed') {
      return handleSortDirection(goalList[a].tasksCompleted > goalList[b].tasksCompleted)
    } else if (sort.type === 'due-date')
      return handleSortDirection(goalList[a].completionDate > goalList[b].completionDate);
    else if (sort.type === 'task-count') {
      const taskCountForGoalA = Object.keys(goalList[a].tasks).length;
      const taskCountForGoalB = Object.keys(goalList[b].tasks).length;

      return handleSortDirection(taskCountForGoalA > taskCountForGoalB);
    }
    return 0;
  });

  return goalListOfIds;
};

export default sortGoalListToIds;