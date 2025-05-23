import {FilterType} from "../../../../utils/builders/buildFilter";
import {DUE_DATE} from "../../../../utils/utils";


const FilterActions = {
  toggle: (key: keyof Omit<FilterType, 'searchText'>) =>
    (prevState: FilterType): FilterType => {
      return {...prevState, [key]: !prevState[key]};
    },
  updateSearchText: (searchText: string) => (prevState: FilterType): FilterType => {
    return {...prevState, searchText};
  }
};
export default FilterActions;