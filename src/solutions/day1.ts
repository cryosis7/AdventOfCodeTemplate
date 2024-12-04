import { Solution } from "./solutions";

export const day1part1: Solution = (input)  => {
    const splits = input.split(/\s+/m)
    const leftListString = splits.filter((_, index) => index % 2 === 0)
    const rightListString = splits.filter((_, index) => index % 2 === 1)
    
    let leftList = leftListString.map(el => Number.parseInt(el))
    let rightList = rightListString.map(el => Number.parseInt(el))
    
    leftList.sort();
    rightList.sort();
    
    const distances = leftList.map((el, index) => Math.abs(el - rightList[index]));
    return distances.reduce((acc, curr) => acc += curr, 0);
}

export const day1part2: Solution = (input) => {
    const splits = input.split(/\s+/m)
    const leftListString = splits.filter((_, index) => index % 2 === 0)
    const rightListString = splits.filter((_, index) => index % 2 === 1)
    
    let leftList = leftListString.map(el => Number.parseInt(el))
    let rightList = rightListString.map(el => Number.parseInt(el))
    
    const counts: { [key:string]: number } = {};
    rightList.forEach(el => {
        const elString = el.toString();
        if (counts[elString] === undefined) {
            counts[elString] = 1
        } else {
            counts[elString]++
        }
    })

    return leftList.reduce((acc, curr) => acc += curr * (counts[curr.toString()] ?? 0), 0);
}