import { Solution } from "../solutions";

export const solution2part1: Solution = (input) => {
    const lines = input.split('\n');
    
    let runningTotal = 0;
    lines.forEach(line => {
        const [l, w, h] = line.split('x').map(Number);
        const side1 = l*w;
        const side2 = w*h
        const side3 = h*l

        const surfaceArea = (2 * side1) + (2 * side2) + (2 * side3);
        const slack = Math.min(side1, side2, side3);

        runningTotal += slack + surfaceArea
    });
    
    return runningTotal;
}

export const solution2part2: Solution = (input) => {
    const lines = input.split('\n');
    
    let runningTotal = 0;
    lines.forEach(line => {
        const [shortest, middle, longest] = line.split('x').map(Number).sort();

        const ribbonLength = (2 * shortest) + (2 * middle);
        const bowLength = shortest * middle * longest;
        const totalRibbon = ribbonLength + bowLength;

        runningTotal += totalRibbon;
    });
    
    return "NOT WORKING";
}