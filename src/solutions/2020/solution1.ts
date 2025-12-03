import { Solution } from "../solutions";

export const solution1part1: Solution = (input) => {
    const lines = input.split('\n').map(Number).sort();
    for (let i = 0; i < lines.length; i++) {
        const num1 = lines[i];
        for (let j = lines.length - 1; j > i; j--) {
            const num2 = lines[j];

            if (num1 + num2 === 2020) {
                return num1 * num2;
            }
        }
    }

    return ":("
}

export const solution1part2: Solution = (input) => {
    const lines = input.split('\n').map(Number).sort();
    for (let i = 0; i < lines.length; i++) {
        const num1 = lines[i];
        for (let j = lines.length - 1; j > i; j--) {
            const num2 = lines[j];
            for (let k = lines.length - 1; k > j; k--) {
                const num3 = lines[k];

                if (num1 + num2 + num3 === 2020) {
                    return num1 * num2 * num3;
                }
            }
        }
    }

    return ":("
}