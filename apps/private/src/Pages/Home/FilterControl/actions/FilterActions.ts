import {FilterType} from "../../../../utils/builders/buildFilter";


const FilterActions = {
  toggle: (key: Pick<FilterType, "showOnlyStarred" | "showCompletedGoals" | "showAllIncludingPastDue">) =>
    (prevState: FilterType): FilterType => {
      return {...prevState, [key]: !prevState[key]};
    },
  updateSearchText: (searchText: string) => (prevState: FilterType): FilterType => {
    return {...prevState, searchText};
  }
};
export default FilterActions;