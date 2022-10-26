/**
 * Return total number of mines based on the radio
 * @param width Width of Board
 * @param height Height of Board
 * @param ratio Ratio of Mines
 * @returns 
 */
function totalMines(width: number, height: number, ratio: number) {
  return (width * height) / ratio;
}

function willBeMine(max: number) {
  return Math.floor(Math.random() * max) > max / 2;
}

// function generateMines(width: number, height: number, ratio: number) {
//   const total = totalMines(width, height, ratio);

//   const locations: {xCoord: number; yCoord:number}[] = [];

//   for (let i = 0; i < total; i++) {
//     const xCoord = generateCoord(width);
//     const yCoord = generateCoord(height);

//     if (locations.find(({ xCoord: x, yCoord: y }) => xCoord === x && yCoord === y)) {
//       i--;
//     } else {
//       locations.push({ xCoord, yCoord });
//     }
//   }
// }

/**
 * Mine Utilities
 */
export const utils = {
  totalMines,
  willBeMine,
};
