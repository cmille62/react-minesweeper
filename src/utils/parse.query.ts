import { BoardParsedType, BoardQueryType } from "../types";

export function parseBoardQuery({
  uid,
  ...props
}: BoardQueryType): BoardParsedType {
  const width = parseInt(props.width, 10);
  const height = parseInt(props.height, 10);
  const mines = parseInt(props.mines, 10);

  return { width, height, mines, uid };
}
