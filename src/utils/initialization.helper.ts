function generateRemaining(
  width: number,
  height: number,
  mines: number
): number {
  return width * height - mines;
}

export const helper = {
  generateRemaining,
};
