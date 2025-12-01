import 'bootstrap/dist/css/bootstrap.min.css';
import { useAtom, useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { SOLUTIONS } from './solutions/solutions.js';
import { inputForSelectedDayAtom, selectedDayAtom, selectedSolutionAtom, selectedYearAtom, sessionAtom, setInputForDayAtom } from './store.js';

function App(): React.ReactNode {
  const [selectedYear, setSelectedYear] = useAtom(selectedYearAtom);
  const [selectedSolution, setSelectedSolution] = useAtom(selectedSolutionAtom);
  const [sessionId, setSessionId] = useAtom(sessionAtom);
  const [storedInputForSelectedDay] = useAtom(inputForSelectedDayAtom);
  const [selectedDay] = useAtom(selectedDayAtom);
  const [input, setInput] = useState(storedInputForSelectedDay);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    try {
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
    } finally {
      setIsLoading(false);
    }
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
          <div className="mb-3">
            <label htmlFor="sessionInput" className="form-label">
              Session ID
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={
                  <Popover id="session-help-popover">
                    <Popover.Header as="h3">How to Get Your Session ID</Popover.Header>
                    <Popover.Body>
                      <ol className="mb-0 ps-3">
                        <li>Log in to <a href="https://adventofcode.com/" target="_blank" rel="noopener noreferrer">Advent of Code</a></li>
                        <li>Open your browser's Developer Tools (F12)</li>
                        <li>Go to the "Application" or "Storage" tab</li>
                        <li>Find "Cookies" and locate the <code>session</code> cookie</li>
                        <li>Copy the value and paste it here</li>
                      </ol>
                    </Popover.Body>
                  </Popover>
                }
                rootClose
              >
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0 ms-2"
                  style={{ textDecoration: 'none', verticalAlign: 'baseline' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </button>
              </OverlayTrigger>
            </label>
            <input
              id="sessionInput"
              type="text"
              placeholder="Enter Session ID From AOC"
              className="form-control"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button 
              onClick={getInput} 
              className="btn btn-primary"
              disabled={isLoading}
              style={isLoading ? { borderStyle: 'solid', borderWidth: '1px' } : undefined}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Fetching...
                </>
              ) : (
                'Fetch Input'
              )}
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
