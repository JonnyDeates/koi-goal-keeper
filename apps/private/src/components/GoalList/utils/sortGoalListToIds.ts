import {type SortType} from "../../../utils/builders/buildSort";
import {type GoalListType} from "../GoalList";

const sortGoalListToIds = (sort: SortType, goalList: GoalListType): string[] => {
  const handleSortDirection = (condition: boolean) => {

    if (sort.direction === 'ASC') {
      return condition ? 1 : -1;
    }
    return condition ? -1 : 1;
  };

  const goalListOfIds = Object.keys(goalList);
  goalListOfIds.sort((a, b) => {
    switch (sort.type) {
      case 'creation-date':
        return handleSortDirection(goalList[a].createdDate > goalList[b].createdDate);
      case 'tasks-completed':
        return handleSortDirection(goalList[a].tasksCompleted > goalList[b].tasksCompleted);
      case 'due-date':
        return handleSortDirection(goalList[a].completionDate > goalList[b].completionDate);
      case 'task-count': {
        const taskCountForGoalA = Object.keys(goalList[a].tasks).length;
        const taskCountForGoalB = Object.keys(goalList[b].tasks).length;
        return handleSortDirection(taskCountForGoalA > taskCountForGoalB);
      }
      default:
        return 0;
    }
  });

  return goalListOfIds;
};

export default sortGoalListToIds;