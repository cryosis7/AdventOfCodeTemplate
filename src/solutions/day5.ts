import { Solution } from './solutions';

export const day5part1: Solution = (input) => {
  const rules: string[][] = [];
  const pages: string[][] = [];

  const lines = input.split('\n');
  lines.forEach(line => {
    if (line.includes('|')) {
      rules.push(line.split('|'));
    } else if (line.includes(',')) {
      pages.push(line.split(','));
    }
  });

  const correctPages = pages.filter(page => {
    let validPage = true;
    rules.forEach(rule => {
      if (page.includes(rule[0]) && page.includes(rule[1]) && page.indexOf(rule[0]) > page.indexOf(rule[1])) {
        validPage = false;
      }
    });
    return validPage;
  });

  return correctPages.reduce((acc, page) => acc + Number.parseInt(page[(page.length - 1) / 2]), 0);
};

export const day5part2: Solution = (input) => {
  let rules: string[][] = [];
  const pages: string[][] = [];

  const lines = input.split('\n');
  lines.forEach(line => {
    if (line.includes('|')) {
      rules.push(line.split('|'));
    } else if (line.includes(',')) {
      pages.push(line.split(','));
    }
  });

  const correctPages = pages.filter(page => {
    let validPage = true;
    rules.forEach(rule => {
      if (page.includes(rule[0]) && page.includes(rule[1]) && page.indexOf(rule[0]) > page.indexOf(rule[1])) {
        validPage = false;
      }
    });
    return validPage;
  });
  const incorrectPages = pages.filter(page => !correctPages.includes(page));

  incorrectPages.map(pages => {
    let relevantRules = rules.filter(rule => pages.includes(rule[0]) && pages.includes(rule[1]));
    const orderedRules: string[] = [];
    const rulesCopy = [...relevantRules];
    while (relevantRules.length !== 0) {
      let beforeRules = relevantRules.map(rule => rule[0]);
      let afterRules = relevantRules.map(rule => rule[1]);
      let nextPage = beforeRules.find((rule, index) => !afterRules.includes(rule));
      if (!nextPage) {
        console.error('No next page found', beforeRules, afterRules);
        throw new Error('No next page found');
      }
      orderedRules.push(nextPage);
      relevantRules = relevantRules.filter(rule => rule[0] !== nextPage);
    }
    // Add any numbers in afterRules that are not in the beforeRules to the end of the orderedRules
    orderedRules.push(rulesCopy.map(rule => rule[1]).filter(rule => !orderedRules.includes(rule))[0]);
    return pages.sort((a, b) => orderedRules.indexOf(a) - orderedRules.indexOf(b));
  });

  return incorrectPages.reduce((acc, page) => acc + Number.parseInt(page[(page.length - 1) / 2]), 0);
};