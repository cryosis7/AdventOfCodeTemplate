import { Solution } from "../solutions";

export const solution1part1: Solution = (input)  => {
    const splits = input.split(/\s+/m)

    return splits.map(el => parseInt(el) + 1).join(" ");
}

export const solution1part2: Solution = (input) => {
    const splits = input.split(/\s+/m)

    return splits.map(el => parseInt(el) - 1).join(" ");
}

