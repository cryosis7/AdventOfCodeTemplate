import {day1part1, day1part2} from "./day1";
import {day2part1} from "./day2";
import { day4part1, day4part2 } from './day4';
import { day5part1, day5part2 } from './day5';
import { day6part1, day6part2 } from './day6';

export type Solution = (input: string) => string | number;

// Regex hackery in the UI expects the key to be in this format.
export const SOLUTIONS: { [key: string]: Solution } = {
    "Day 1 - Part 1": day1part1,
    "Day 1 - Part 2": day1part2,
    "Day 2 - Part 1": day2part1,
    "Day 4 - Part 1": day4part1,
    "Day 4 - Part 2": day4part2,
    "Day 5 - Part 1": day5part1,
    "Day 5 - Part 2": day5part2,
    "Day 6 - Part 1": day6part1,
    "Day 6 - Part 2": day6part2,
}