
export type SortType = {
  direction: "ASC" | "DSC",
  type: 'creation-date' | 'due-date' | 'task-count' | 'tasks-completed'
}


export const buildSort = (partialObjective: Partial<SortType> = {}):SortType => ({
  direction: "ASC",
  type: "creation-date",
  ...partialObjective
});
