export interface FilterType {
  searchText: string,
  showCompletedGoals: boolean,
  showAllIncludingPastDue: boolean,
  showOnlyStarred: boolean
}


export const buildFilter = (partialObjective: Partial<FilterType> = {}): FilterType => ({
  searchText: '',
  showAllIncludingPastDue: true,
  showCompletedGoals: true,
  showOnlyStarred: false,
  ...partialObjective
});
