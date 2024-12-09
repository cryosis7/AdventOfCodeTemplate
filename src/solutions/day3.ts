import {Solution} from "./solutions";

export const day3part1: Solution = (input) => {
    const lines = input.split(/\n/);

    const horizontalForwardMatches = lines.reduce((acc, line) => acc += line.match(/XMAS/g)?.length ?? 0, 0);
    const horizontalBackwardMatches = lines.reduce((acc, line) => acc += line.match(/SAMX/g)?.length ?? 0, 0);
    const verticalDownMatches =

    return horizontalForwardMatches + horizontalBackwardMatches + verticalDownMatches + verticalUpMatches;
}