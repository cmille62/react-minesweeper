/**
 * The properties present within each game board
 *
 * width: The number of fields the board is wide
 * height: The number of fields the board is tall
 *
 * mines: The number of mines present within the board
 */
export interface BoardType {
  width: number;
  height: number;

  mines: number;
}

export interface BoardParsedType {
  width: number;
  height: number;
  mines: number;

  uid?: string;
}

export interface BoardQueryType {
  width: string;
  height: string;
  mines: string;

  uid?: string;
}
