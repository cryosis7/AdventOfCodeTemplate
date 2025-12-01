import { atomWithStorage } from "jotai/utils";
import { SOLUTIONS } from "./solutions/solutions.js";
import { atom } from "jotai";

export const storedInputAtom = atomWithStorage<Record<string, string>>(
  "fetchedInputs",
  {}
);

export const sessionAtom = atomWithStorage<string>("sessionId", "");
export const selectedYearAtom = atomWithStorage<string>("selectedYear", "2025");

export const selectedSolutionAtom = atomWithStorage<string>(
  "selectedSolution",
  ""
);

export const selectedSolutionNumberAtom = atom(
  (get) => get(selectedSolutionAtom).match(/Solution\s?(\d+)/i)?.[1] ?? "1"
);

export const selectedDayAtom = atom((get) => {
  const solutionNum = parseInt(get(selectedSolutionNumberAtom));
  const year = parseInt(get(selectedYearAtom));
  
  // 2025+ uses every-other-day format: Solution X = Day (2X - 1)
  if (year >= 2025) {
    return ((solutionNum * 2) - 1).toString();
  }
  // 2024 and earlier: Solution X = Day X
  return solutionNum.toString();
});

export const inputForSelectedDayAtom = atom((get) => {
  const storedInputs = get(storedInputAtom);
  const selectedDay = get(selectedDayAtom);
  const selectedYear = get(selectedYearAtom);
  const key = `${selectedYear}-${selectedDay}`;

  return storedInputs[key] ?? "";
});

export const setInputForDayAtom = atom(
  null,
  (get, set, { day, value, year }: { day: string; value: string; year: string }) => {
    const storedInputs = get(storedInputAtom);
    const key = `${year}-${day}`;

    set(storedInputAtom, {
      ...storedInputs,
      [key]: value,
    });
  }
);
