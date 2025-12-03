import { Solution } from '../solutions';

export const solution3part1: Solution = (input) => {
    const banks = input.split('\n');
    const bankJolts: number[] = [];
    for (const bank of banks) {
        // const cells = bank.split('');
        let largestCell = 0;
        let largestCellIndex = 0;
        for (let i = 0; i < bank.length - 1; i++) {
            if (Number(bank[i]) > largestCell) {
                largestCell = Number(bank[i]);
                largestCellIndex = i;
            }
        }

        let secondLargestCell = 0;
        for (let j = largestCellIndex + 1; j < bank.length; j++) {
            if (Number(bank[j]) > secondLargestCell) {
                secondLargestCell = Number(bank[j]);
            }
        };

        bankJolts.push(Number(`${largestCell}${secondLargestCell}`));
    }

    return bankJolts.reduce((prev, curr) => prev + curr, 0);
}

export const solution3part2: Solution = (input) => {
    const banks = input.split('\n');
    const bankJolts: number[] = [];
    const batteriesRequired = 12;

    for (const bank of banks) {
        const chosenCellsIndex: number[] = []
        let previousCellIndex = undefined;
        for (let batteryNumber = 0; batteryNumber < batteriesRequired; batteryNumber++) {
            const startingIndex: number = previousCellIndex === undefined ? 0 : previousCellIndex + 1;
            const range = (bank.length - startingIndex) - (batteriesRequired - batteryNumber);
            const slice = bank.slice(startingIndex, startingIndex + 1 + range);
            const highestNumberInRange = slice.split('').reduce((prev, acc) => Math.max(prev, Number(acc)), 0)
            previousCellIndex = startingIndex + slice.indexOf(highestNumberInRange.toString());
            chosenCellsIndex.push(previousCellIndex);
        }
        const num = chosenCellsIndex.reduce((prev, curr) => Number(`${prev}${bank[curr]}`), 0);
        bankJolts.push(num);
    }

    return bankJolts.reduce((prev, curr) => prev + curr, 0);
}