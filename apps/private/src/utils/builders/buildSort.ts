
export interface SortType {
  direction: "ASC" | "DSC",
  type: 'Creation Date' | 'Due Date' | 'Task Count' | 'Tasks Completed' | 'Starred'
}


export const buildSort = (partialObjective: Partial<SortType> = {}):SortType => ({
  direction: "DSC",
  type: "Creation Date",
  ...partialObjective
});
