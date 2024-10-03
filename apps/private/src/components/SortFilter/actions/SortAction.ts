import {type SortType} from "../../../utils/builders/buildSort";


const SortActions = {
  toggleType: (prevState: SortType): SortType => {
    switch (prevState.type) {
      case "Creation Date":
        return {...prevState, type: "Due Date"};
        case "Due Date":
          return {...prevState, type: "Tasks Completed"};
      case "Tasks Completed":
        return {...prevState, type: "Task Count"};
      case "Task Count":
        return {...prevState, type: 'Starred'};
      case "Starred":
        return {...prevState, type: 'Creation Date'};
    }
  },
  toggleAscending: (prevState: SortType): SortType => {
    if (prevState.direction === "ASC")
      return {...prevState, direction: "DSC"};
    return {...prevState, direction: "ASC"};
  }
};
export default SortActions;