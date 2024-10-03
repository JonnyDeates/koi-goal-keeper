import {type GoalListType, type GoalType} from "@repo/types";
import {type SortType} from "../../../utils/builders/buildSort";

const sortGoalListToIds = (sort: SortType, goalList: GoalListType): string[] => {
  const handleSortDirection = (condition: boolean) => {

    if (sort.direction === 'ASC') {
      return condition ? 1 : -1;
    }
    return condition ? -1 : 1;
  };

  const goalListOfIds = Object.keys(goalList);
  goalListOfIds.sort((a, b) => {
    const goalA = goalList[a] as GoalType;
    const goalB = goalList[b] as GoalType;
    switch (sort.type) {
      case 'Creation Date':
        return handleSortDirection(goalA.createdDate > goalB.createdDate);
      case 'Tasks Completed':
        return handleSortDirection(goalA.tasksCompleted > goalB.tasksCompleted);
      case 'Due Date':
        return handleSortDirection(goalA.completionDate > goalB.completionDate);
      case 'Task Count': {
        const taskCountForGoalA = Object.keys(goalA.tasks).length;
        const taskCountForGoalB = Object.keys(goalB.tasks).length;
        return handleSortDirection(taskCountForGoalA > taskCountForGoalB);
      }
      case 'Starred': {
        return handleSortDirection(goalA.isFavorite );
      }
      default:
        return 0;
    }
  });

  return goalListOfIds;
};

export default sortGoalListToIds;