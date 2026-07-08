import { ID, Timestamp } from "../types";

export interface INamed {
  name: string;
}

export interface IVersioned {
  version: string;
}

export interface ITimestamped {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface IOwned {
  ownerId: ID;
}

export interface ICreated {
  createdBy: ID;
}

export interface IUpdated {
  updatedBy: ID;
}

export interface IEntity extends INamed, ITimestamped {
  id: ID;
}

export interface IPaginated<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface ISearchable {
  searchQuery?: string;
}

export interface ISortable {
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}
