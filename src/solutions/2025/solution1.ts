import { Solution } from "../solutions.js";

export const solution1part1: Solution = (input)  => {
    let currentNumber = 50;
    let zeroCount = 0;
    const lines = input.split('\n');

    for (const line of lines) {
        const direction = line.slice(0, 1);
        const amount = parseInt(line.slice(1));
        const operator = direction === "R" ? add : subtract;
        
        currentNumber = operator(currentNumber, amount);
        if (currentNumber === 0) {
            zeroCount++;
        }
    }
    return zeroCount;
}

export const solution1part2: Solution = (input) => {
    let currentNumber = 50;
    let zeroCount = 0;
    const lines = input.split('\n');

    for (const line of lines) {
        const direction = line.slice(0, 1);
        const amount = parseInt(line.slice(1));
        const operator = direction === "R" ? add : subtract;
        
        for (let i = 0; i < amount; i++) {
            currentNumber = operator(currentNumber, 1);
            if (currentNumber === 0) {
                zeroCount++;
            }
        }
    }
    return zeroCount;
}

const add = (startingNumber: number, amount: number)  => {
    return (startingNumber + amount) % 100
}

const subtract = (startingNumber: number, amount: number)  => {
    return (startingNumber - amount) % 100
}