import {day1part1, day1part2} from "./day1";
import {day2part1} from "./day2";
import {day3part1} from "./day3";

export type Solution = (input: string) => string | number;

// Regex hackery in the UI expects the key to be in this format.
export const SOLUTIONS: { [key: string]: Solution } = {
    "Day 1 - Part 1": day1part1,
    "Day 1 - Part 2": day1part2,
    "Day 2 - Part 1": day2part1,
    "Day 3 - Part 1": day3part1
}