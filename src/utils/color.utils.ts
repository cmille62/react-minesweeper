/**
 * Return a color based on the proximity to a mine
 * @param proximity
 * @returns
 */
function proximity(proximity: number) {
  switch (proximity) {
  case 1:
    return "#3366FF";
  case 2:
    return "#52BD95";
  case 3:
  case 4:
    return "#D14343";
  case 5:
  case 6:
    return "#A73636";
  case 7:
  case 8:
  case 9:
    return "#7D2828";
  default:
    return `red${proximity}00`;
  }
}

/**
 * Color Utilities
 */
export const utils = {
  proximity,
};
