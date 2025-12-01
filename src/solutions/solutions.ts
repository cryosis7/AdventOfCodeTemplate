export type Solution = (input: string) => string | number;

// Eagerly import all solution files
const solutionModules = import.meta.glob<{ [key: string]: Solution }>(
  './**/solution*.ts',
  { eager: true }
);

// Auto-build the SOLUTIONS object
export const SOLUTIONS: { [year: string]: { [key: string]: Solution } } = {};

for (const [path, module] of Object.entries(solutionModules)) {
  // path looks like "./2024/solution1.ts"
  const match = path.match(/\.\/(\d{4})\/solution(\d+)\.ts/);
  if (!match) continue;
  
  const [, year, day] = match;
  if (!SOLUTIONS[year]) SOLUTIONS[year] = {};
  
  const solutionModule = module as { [key: string]: Solution };
  // Auto-register part1 and part2 if they exist
  if (solutionModule[`solution${day}part1`]) {
    SOLUTIONS[year][`Solution ${day} - Part 1`] = solutionModule[`solution${day}part1`];
  }
  if (solutionModule[`solution${day}part2`]) {
    SOLUTIONS[year][`Solution ${day} - Part 2`] = solutionModule[`solution${day}part2`];
  }
}