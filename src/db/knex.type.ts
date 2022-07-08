export const KnexSortDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type KnexSortDirection =
  typeof KnexSortDirection[keyof typeof KnexSortDirection];

export interface KnexSort<T extends string> {
  sortBy: T;
  sortDirection: KnexSortDirection;
}
