import {day1part1, day1part2} from "./day1";

export type Solution = (input: string) => string | number;

// Regex hackery in the UI expects the key to be in this format.
export const SOLUTIONS: { [key: string]: Solution } = {
    "Day 1 - Part 1": day1part1,
    "Day 1 - Part 2": day1part2,
}