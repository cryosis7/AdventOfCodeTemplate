import 'bootstrap/dist/css/bootstrap.min.css';
import { useAtom, useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { SOLUTIONS } from './solutions/solutions';
import { inputForSelectedDayAtom, selectedDayAtom, selectedSolutionAtom, selectedYearAtom, sessionAtom, setInputForDayAtom } from './store';

function App(): JSX.Element {
  const [selectedYear, setSelectedYear] = useAtom(selectedYearAtom);
  const [selectedSolution, setSelectedSolution] = useAtom(selectedSolutionAtom);
  const [sessionId, setSessionId] = useAtom(sessionAtom);
  const [storedInputForSelectedDay] = useAtom(inputForSelectedDayAtom);
  const [selectedDay] = useAtom(selectedDayAtom);
  const [input, setInput] = useState(storedInputForSelectedDay);
  const [output, setOutput] = useState('');
  const setInputForDay = useSetAtom(setInputForDayAtom);

  // Initialize selectedSolution if empty or invalid for current year
  useEffect(() => {
    const yearSolutions = SOLUTIONS[selectedYear] || {};
    const solutionKeys = Object.keys(yearSolutions);
    if (solutionKeys.length > 0 && (!selectedSolution || !yearSolutions[selectedSolution])) {
      setSelectedSolution(solutionKeys[0]);
    }
  }, [selectedYear, selectedSolution, setSelectedSolution]);

  useEffect(() => {
    setInput(storedInputForSelectedDay);
  }, [storedInputForSelectedDay, selectedSolution]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleRun = () => {
    const yearSolutions = SOLUTIONS[selectedYear] || {};
    const solution = yearSolutions[selectedSolution];
    if (solution) {
      const processedOutput = solution(input);
      setOutput(processedOutput.toString());
    } else {
      setOutput('No solution selected for this year');
    }
  };

  const handleSolutionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSolution(event.target.value);
  };

  const getInput = async () => {
    if (sessionId == '') {
      alert('Retrieve your session ID from the Advent of Code website. You can find it in the cookies');
      return;
    }

    if (!selectedDay) {
      return;
    }

    document.cookie = `session=${sessionId}`;
    const request = new Request(`/api/${selectedYear}/day/${selectedDay}/input`, {
      method: 'GET',
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`Error fetching input: ${response.status}`);
    }

    const input = (await response.text()).trim();
    setInput(input);
    setInputForDay({ day: selectedDay, value: input, year: selectedYear });
  };

  const yearSolutions = SOLUTIONS[selectedYear] || {};
  const solutionKeys = Object.keys(yearSolutions);
  const years = Array.from({ length: 11 }, (_, i) => (2015 + i).toString());

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    // Reset solution to first available for new year
    const newYearSolutions = SOLUTIONS[newYear] || {};
    const newSolutionKeys = Object.keys(newYearSolutions);
    if (newSolutionKeys.length > 0) {
      setSelectedSolution(newSolutionKeys[0]);
    } else {
      setSelectedSolution('');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">
        <a
          href={`https://adventofcode.com/${selectedYear}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Advent of Code Solutions
        </a>
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <label htmlFor="yearSelect">Select Year:</label>
          <select
            id="yearSelect"
            className="form-select mb-3"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label htmlFor="solutionSelect">Select Solution:</label>
          <select
            id="solutionSelect"
            className="form-select mb-3"
            value={selectedSolution}
            onChange={handleSolutionChange}
            disabled={solutionKeys.length === 0}
          >
            {solutionKeys.length === 0 ? (
              <option>No solutions available for this year</option>
            ) : (
              solutionKeys.map((solutionKey) => (
                <option key={solutionKey} value={solutionKey}>
                  {solutionKey}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Enter Session ID From AOC"
            className="form-control mb-3"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
          />
          <div className="d-flex justify-content-center">
            <button onClick={getInput} className="btn btn-primary">
              Fetch Input
            </button>
          </div>
          <label htmlFor="inputElement">Input:</label>
          <textarea
            id="inputElement"
            className="form-control mb-3"
            value={input}
            onChange={handleInput}
            style={{ fontFamily: 'monospace' }}
            rows={8}
          />
          <div className="d-flex justify-content-center">
            <button onClick={handleRun} className="btn btn-primary">
              Run
            </button>
          </div>
          <p style={{ whiteSpace: 'pre-wrap' }}>{output}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
