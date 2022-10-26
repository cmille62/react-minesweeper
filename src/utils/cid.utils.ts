
/**
 * Generate a Cell Id Based on it's Coordinates
 * @param xCoord 
 * @param yCoord 
 * @returns 
 */
export function generateCid(xCoord: number, yCoord: number) {
  return `${xCoord}-${yCoord}`;
}

/**
 * Cell Id Utilities
 */
export const utils = {
  generate: generateCid,
};
