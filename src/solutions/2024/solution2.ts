import { Solution } from "../solutions.js";

export const solution2part1: Solution = (input) => {
    const lines = input.split(/\n/);
    
    const safeLines = lines.filter((line, index) => {
        const numbers = line.split(' ');
        const isIncreasing = Number.parseInt(numbers[0]) < Number.parseInt(numbers[1]);
        
        for (let i = 1; i < numbers.length; i++) {
            const higherNumber = Number.parseInt(isIncreasing ? numbers[i] : numbers[i - 1]);
            const lowerNumber = Number.parseInt(isIncreasing ? numbers[i - 1] : numbers[i]);

            if (lowerNumber >= higherNumber || ![1, 2, 3].includes(higherNumber - lowerNumber)) {
                return false
            };
        }
        return true;
    });
    
    return `Safe Reports: ${safeLines.length}`;
}

