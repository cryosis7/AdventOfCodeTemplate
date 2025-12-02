import { Solution } from "../solutions";

export const solution7part1: Solution = (input) => {
    const lines = input.split("\n");
    const validTestValues: number[] = [];

    for (const line of lines) {
        const parts = line.split(": ");
        const testValue = parseInt(parts[0]);
        const numbers = parts[1].split(" ").map((x) => parseInt(x));

        const configurations = 2 ** (numbers.length - 1);
        for (let i = 0; i < configurations; i++) {
            const binaryStringParts = i.toString(2).padStart(numbers.length - 1, "0").split("");
            
            let result = numbers[0];
            for (let j = 1; j < numbers.length; j++) {
                let op = binaryStringParts.shift();
                if (op === undefined) {
                    throw new Error("Operator was undefined.")
                }
                result = operate(result, numbers[j], parseInt(op));
            }
            if (result === testValue) {
                console.debug("Match found for test value:", testValue, "with result:", result);
                validTestValues.push(result)
                break;
            }
        }
    }

    return validTestValues.reduce((prev, curr) => prev + curr, 0);
}

export const solution7part2: Solution = (input) => {
    const lines = input.split("\n");
    const validTestValues: number[] = [];

    for (const line of lines) {
        const parts = line.split(": ");
        const testValue = parseInt(parts[0]);
        const numbers = parts[1].split(" ").map((x) => parseInt(x));

        const configurations = 3 ** (numbers.length - 1);
        for (let i = 0; i < configurations; i++) {
            const binaryStringParts = i.toString(3).padStart(numbers.length - 1, "0").split("");
            
            let result = numbers[0];
            for (let j = 1; j < numbers.length; j++) {
                let op = binaryStringParts.shift();
                if (op === undefined) {
                    throw new Error("Operator was undefined.")
                }
                result = operate(result, numbers[j], parseInt(op));
            }
            if (result === testValue) {
                validTestValues.push(result)
                break;
            }
        }
    }

    return validTestValues.reduce((prev, curr) => prev + curr, 0);
}

type Operator = (a: number, b: number) => number;
const Operators: Record<number, Operator> = {
    0: (a, b) => a + b,
    1: (a, b) => a * b,
    2: (a, b) => Number.parseInt(`${a}${b}`),
}

const operate = (a: number, b: number, operator: keyof typeof Operators) => {
    return Operators[operator](a, b);
}