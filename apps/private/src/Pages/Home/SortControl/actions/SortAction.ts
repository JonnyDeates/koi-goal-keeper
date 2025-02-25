import {type SortType} from "../../../../utils/builders/buildSort";


const SortActions = {
  updateType: (newType: SortType['type']) => (prevState: SortType): SortType => {
        return {...prevState, type: newType};
  },
  toggleAscending: (prevState: SortType): SortType => {
    if (prevState.direction === "ASC")
      return {...prevState, direction: "DSC"};
    return {...prevState, direction: "ASC"};
  }
};
export default SortActions;