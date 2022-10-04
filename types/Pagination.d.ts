type Sort<T> = {[key in keyof T]?: 'ASC' | 'DESC'};

export interface PageRequest<T> {
  page: number;
  size: number;
  sort: Sort<T>;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  num: number;
}

