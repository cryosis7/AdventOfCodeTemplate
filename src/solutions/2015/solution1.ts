import { Solution } from "../solutions";

export const solution1part1: Solution = (input)  => {
    let floor = 0;
    const elevator: Record<string, () => void> = {
        "(": () => floor++,
        ")": () => floor--,
    }

    for (const char of input) {
        elevator[char]();
    }

    return floor;
}

export const solution1part2: Solution = (input) => {
    let floor = 0;
    const elevator: Record<string, () => void> = {
        "(": () => floor++,
        ")": () => floor--,
    }

    for (const [index, char] of input.split('').entries()) {
        elevator[char]();
        
        if (floor === -1) {
            return index + 1;
        }
    }

    return "Not found";
}