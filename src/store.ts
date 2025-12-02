import { atomWithStorage } from "jotai/utils";
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

export const selectedDayAtom = atom(
  (get) => get(selectedSolutionAtom).match(/Solution\s?(\d+)/i)?.[1] ?? "1"
);

export const inputForSelectedDayAtom = atom((get) => {
  const storedInputs = get(storedInputAtom);
  const selectedDay = get(selectedDayAtom);
  const selectedYear = get(selectedYearAtom);
  return storedInputs[`${selectedYear}-${selectedDay}`] ?? "";
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
