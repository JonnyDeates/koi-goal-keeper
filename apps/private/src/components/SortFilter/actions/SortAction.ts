import {type SortType} from "../../../utils/builders/buildSort";


const SortActions = {
  toggleType: (prevState: SortType): SortType => {
    switch (prevState.type) {
      case "creation-date":
        return {...prevState, type: "due-date"};
        case "due-date":
          return {...prevState, type: "tasks-completed"};
      case "tasks-completed":
        return {...prevState, type: "task-count"};
      case "task-count":
        return {...prevState, type: 'creation-date'};
    }
  },
  toggleAscending: (prevState: SortType): SortType => {
    if (prevState.direction === "ASC")
      return {...prevState, direction: "DSC"};
    return {...prevState, direction: "ASC"};
  }
};
export default SortActions;