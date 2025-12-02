import { Solution } from "../solutions.js";

export const solution2part1: Solution = (input) => {
    const ranges = input.split(",");
    const invalidIds: number[] = [];
    const regex = new RegExp(/^([1-9]\d*)\1$/);

    const numberRepeats = (number: string) => {
        return regex.test(number);
    }

    ranges.forEach(range => {
        const [start, end] = range.split("-").map(Number);

        for (let i = start; i <= end; i++) {
            if (numberRepeats(i.toString())) {
                invalidIds.push(i);
            }
        }
    });

    return invalidIds.reduce((acc, curr) => acc + curr, 0);
}

export const solution2part2: Solution = (input) => {
    const ranges = input.split(",");
    const invalidIds: number[] = [];
    const regex = new RegExp(/^([1-9]\d*)\1+$/);

    const numberRepeats = (number: string) => {
        return regex.test(number);
    }

    ranges.forEach(range => {
        const [start, end] = range.split("-").map(Number);

        for (let i = start; i <= end; i++) {
            if (numberRepeats(i.toString())) {
                invalidIds.push(i);
            }
        }
    });

    return invalidIds.reduce((acc, curr) => acc + curr, 0);
}