import { Solution } from './solutions';

export const day4part1: Solution = (input) => {
  const lines = input.split(/\n/);

  const matches = {
    horizontalForward: 0,
    horizontalBackward: 0,
    verticalDown: 0,
    verticalUp: 0,
    diagonalDownRight: 0,
    diagonalDownLeft: 0,
    diagonalUpRight: 0,
    diagonalUpLeft: 0,
  };

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      // Check horizontal matches
      if (j + 3 < lines[i].length) {
        const subString = lines[i].substring(j, j + 4);
        if (subString === 'XMAS') {
          matches.horizontalForward++;
        } else if (subString === 'SAMX') {
          matches.horizontalBackward++;
        }
      }

      // Check vertical matches
      if (i + 3 < lines.length) {
        const subString = lines[i][j] + lines[i + 1][j] + lines[i + 2][j] + lines[i + 3][j];
        if (subString === 'XMAS') {
          matches.verticalDown++;
        } else if (subString === 'SAMX') {
          matches.verticalUp++;
        }
      }

      // Check diagonal right matches
      if (i + 3 < lines.length && j + 3 < lines[i].length) {
        const subStringDownRight = lines[i][j] + lines[i + 1][j + 1] + lines[i + 2][j + 2] + lines[i + 3][j + 3];
        if (subStringDownRight === 'XMAS') {
          matches.diagonalDownRight++;
        } else if (subStringDownRight === 'SAMX') {
          matches.diagonalUpLeft++;
        }
      }

      // Check diagonal left matches
      if (i + 3 < lines.length && j - 3 >= 0) {
        const subStringDownLeft = lines[i][j] + lines[i + 1][j - 1] + lines[i + 2][j - 2] + lines[i + 3][j - 3];
        if (subStringDownLeft === 'XMAS') {
          matches.diagonalDownLeft++;
        } else if (subStringDownLeft === 'SAMX') {
          matches.diagonalUpRight++;
        }
      }
    }
  }

  return `Matches: ${Object.values(matches).reduce((acc, curr) => acc + curr, 0)}`;
};

export const day4part2: Solution = (input) => {
  const lines = input.split(/\n/);

  let count = 0;
  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      if (lines[i][j] === 'A') {
        if ((lines[i - 1][j - 1] === 'M' && lines[i + 1][j + 1] === 'S') || (lines[i - 1][j - 1] === 'S' && lines[i + 1][j + 1] === 'M')) {
          if ((lines[i - 1][j + 1] === 'M' && lines[i + 1][j - 1] === 'S') || (lines[i - 1][j + 1] === 'S' && lines[i + 1][j - 1] === 'M')) {
            count++;
          }
        }
      }
    }
  }

  return `Matches: ${count}`;
}