/**
 * Utilizing the Cartesian coordinate system, generate a unique id
 * @param x
 * @param y
 * @returns
 */
export function generate(x: number, y: number): string {
  return `${x}-${y}`;
}

export const helper = {
  generate,
};
