import { atomWithStorage } from "jotai/utils";
import { SOLUTIONS } from "./solutions/solutions";
import { atom } from "jotai";

export const storedInputAtom = atomWithStorage<Record<string, string>>(
  "fetchedInputs",
  {}
);

export const sessionAtom = atomWithStorage<string>("sessionId", "");
export const selectedSolutionAtom = atomWithStorage<string>(
  "selectedSolution",
  Object.keys(SOLUTIONS)[0]
);

export const selectedDayAtom = atom(
  (get) => get(selectedSolutionAtom).match(/Day\s?(\d+)/i)?.[1] ?? "1"
);

export const inputForSelectedDayAtom = atom((get) => {
  const storedInputs = get(storedInputAtom);
  const selectedDay = get(selectedDayAtom);

  return storedInputs[selectedDay] ?? "";
});

export const setInputForDayAtom = atom(
  null,
  (get, set, { day, value }: { day: string; value: string }) => {
    const storedInputs = get(storedInputAtom);

    set(storedInputAtom, {
      ...storedInputs,
      [day]: value,
    });
  }
);
