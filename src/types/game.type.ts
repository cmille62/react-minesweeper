export type GameStatus = "win" | "good" | "failure" | "initial";

export const GAME_STATUS: Record<string, GameStatus> = {
  Initial: "initial",
  Win: "win",
  Good: "good",
  Failure: "failure",
};
