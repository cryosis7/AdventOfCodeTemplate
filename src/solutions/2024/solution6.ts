import { Solution } from '../solutions.js';

type Direction = 'N' | 'E' | 'S' | 'W';

interface Location {
  x: number;
  y: number;
}

const getLocation = (map: string[][]): Location | null => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '^' || map[y][x] === '>' || map[y][x] === 'v' || map[y][x] === '<') {
        return { x, y };
      }
    }
  }
  return null;
};

const getNextLocation = (map: string[][], location: Location, direction: Direction): Location => {
  switch (direction) {
    case 'N':
      return { x: location.x, y: location.y - 1 };
    case 'E':
      return { x: location.x + 1, y: location.y };
    case 'S':
      return { x: location.x, y: location.y + 1 };
    case 'W':
      return { x: location.x - 1, y: location.y };
  }
};

const isInMap = (map: string[][], location: Location): boolean => {
  return location.y >= 0 && location.y < map.length && location.x >= 0 && location.x < map[0].length;
};

const isAtMapBoundary = (map: string[][], location: Location, direction: Direction): boolean => {
  switch (direction) {
    case 'N':
      return location.y === 0;
    case 'E':
      return location.x === map[0].length - 1;
    case 'S':
      return location.y === map.length - 1;
    case 'W':
      return location.x === 0;
  }
};

const isDirectionObstructed = (map: string[][], location: Location, direction: Direction): boolean => {
  if (isAtMapBoundary(map, location, direction)) {
    return false;
  }

  switch (direction) {
    case 'N':
      return map[location.y - 1][location.x] === '#';
    case 'E':
      return map[location.y][location.x + 1] === '#';
    case 'S':
      return map[location.y + 1][location.x] === '#';
    case 'W':
      return map[location.y][location.x - 1] === '#';
  }
};

const getDirection = (map: string[][], location?: Location): Direction => {
  let pos = location ?? getLocation(map);
  if (pos === null) {
    throw new Error('No location found');
  }

  switch (map[pos.y][pos.x]) {
    case '^':
      return 'N';
    case '>':
      return 'E';
    case 'v':
      return 'S';
    case '<':
      return 'W';
    default:
      throw new Error('Invalid direction');
  }
};

const getSymbol = (direction: Direction): string => {
  switch (direction) {
    case 'N':
      return '^';
    case 'E':
      return '>';
    case 'S':
      return 'v';
    case 'W':
      return '<';
  }
};

const getNextRotation = (direction: Direction): Direction => {
  switch (direction) {
    case 'N':
      return 'E';
    case 'E':
      return 'S';
    case 'S':
      return 'W';
    case 'W':
      return 'N';
  }
};

const applyRotation = (map: string[][], location: Location) => {
  const direction = getDirection(map, location);
  switch (direction) {
    case 'N':
      map[location.y][location.x] = '>';
      break;
    case 'E':
      map[location.y][location.x] = 'v';
      break;
    case 'S':
      map[location.y][location.x] = '<';
      break;
    case 'W':
      map[location.y][location.x] = '^';
      break;
  }
};

const movePart1 = (map: string[][]) => {
  const location = getLocation(map);
  if (location === null) {
    throw new Error('No location found');
  }
  const direction = getDirection(map, location);

  map[location.y][location.x] = 'X';

  if (isAtMapBoundary(map, location, direction)) {
    return;
  }
  const nextLocation = getNextLocation(map, location, direction);
  map[nextLocation.y][nextLocation.x] = getSymbol(direction);
};

type PathSymbol = '.' | '-' | '|' | '+' | '^';
const getPathSymbol = (map: string[][], location: Location): PathSymbol => {
  const cell = map[location.y][location.x];
  return cell as PathSymbol;
};

const addPathSymbol = (map: string[][], location: Location, direction: Direction): PathSymbol => {
  const pathSymbol = getPathSymbol(map, location);
  if (pathSymbol === '+') {
    return '+';
  }

  if (direction === 'N' || direction === 'S') {
    if (pathSymbol === '-') {
      return '+';
    } else {
      return '|';
    }
  }

  if (direction === 'E' || direction === 'W') {
    if (pathSymbol === '|' || pathSymbol === '^') {
      return '+';
    } else {
      return '-';
    }
  }

  return '.';
};

export const solution6part1: Solution = (input) => {
  const map: string[][] = input.split('\n').map((line) => line.split(''));

  while (getLocation(map) !== null) {
    const location = getLocation(map)!;

    if (isDirectionObstructed(map, location, getDirection(map, location))) {
      applyRotation(map, location);
    }
    movePart1(map);
  }

  return map.reduce((acc, row) => acc + row.filter((cell) => cell === 'X').length, 0);
};

const hasLoop = (map: string[][], debug: boolean = false): boolean => {
  const clonedMap = [...map];
  const startingLocation = getLocation(clonedMap)!;
  const startingDirection = getDirection(clonedMap, startingLocation);

  let currentLocation = startingLocation;
  let direction = startingDirection;
  let step = 1;
  if (debug) {
    console.log(`Starting Map: \n${clonedMap.map((r) => r.join('')).join('\n')}`);
  }

  do {
    if (debug) {
      console.log(`Step: ${step}, Location: (${currentLocation.x}, ${currentLocation.y}), Direction: ${direction}`);
      console.log(`Map:\n${clonedMap.map((r) => r.join('')).join('\n')}`);
    }
    while (isDirectionObstructed(clonedMap, currentLocation, direction)) {
      clonedMap[currentLocation.y][currentLocation.x] = addPathSymbol(clonedMap, currentLocation, direction);
      direction = getNextRotation(direction);
      if (direction === startingDirection && currentLocation.x === startingLocation.x && currentLocation.y === startingLocation.y) {
        break;
      }
    }
    if (direction === startingDirection && currentLocation.x === startingLocation.x && currentLocation.y === startingLocation.y && step > 1) {
      break;
    }

    clonedMap[currentLocation.y][currentLocation.x] = addPathSymbol(clonedMap, currentLocation, direction);

    currentLocation = getNextLocation(clonedMap, currentLocation, direction);
    step++;
  } while ((isInMap(clonedMap, currentLocation) && !(currentLocation.x === startingLocation.x && currentLocation.y === startingLocation.y && startingDirection === direction)) && step < 100000);

  return isInMap(clonedMap, currentLocation);
};

export const solution6part2: Solution = (input) => {
  let loopableLocations = 0;
  const map: string[][] = input.split('\n').map((line) => line.split(''));
  console.log('Initial map:', map);
  map.forEach((row, i, m) => {
    row.forEach((cell, j, r) => {
      if (cell === '.') {
        const clonedMap = m.map((r) => [...r]);
        clonedMap[i][j] = '#';
        // console.log(`Checking with map\n${map.map((r) => r.join('')).join('\n')}`);
        console.log(`Step #${i * map[0].length + j}`);
        if (hasLoop(clonedMap)) {
          loopableLocations++;
          console.log(`Loop found at location (${i}, ${j})`);
        }
      }
    });
  });
  console.log('Total loopable locations:', loopableLocations);
  return loopableLocations;

  // const map: string[][] = input.split('\n').map((line) => line.split(''));
  // return hasLoop(map, true) ? 1 : 0;
};

