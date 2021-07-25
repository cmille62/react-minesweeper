import { FieldType } from "./field.type";

export interface BoardStoreType {
  [cid: string]: FieldType;
}

export interface BoardEvent<T> {
  type: string;
  payload?: T;
}

export type BoardPayload = BoardStoreType;

export type BoardAction = BoardEvent<BoardPayload>;
