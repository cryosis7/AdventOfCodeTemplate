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
  const [copySuccess, setCopySuccess] = useState(false);
  const setInputForDay = useSetAtom(setInputForDayAtom);

  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasHydrated(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    const yearSolutions = SOLUTIONS[selectedYear] || {};
    const solutionKeys = Object.keys(yearSolutions);
    if (solutionKeys.length > 0 && (!selectedSolution || !yearSolutions[selectedSolution])) {
      setSelectedSolution(solutionKeys[0]);
    }
  }, [hasHydrated, selectedYear, selectedSolution, setSelectedSolution]);

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

  const handleCopyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
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
        <div className="col-md-8">
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
        <div className="col-md-8">
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
            rows={4}
          />
          <div className="d-flex justify-content-center">
            <button onClick={handleRun} className="btn btn-primary">
              Run
            </button>
          </div>
          {output && (
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="mb-0">Output:</label>
                <button
                  onClick={handleCopyOutput}
                  className="btn btn-sm btn-outline-secondary"
                  title="Copy output to clipboard"
                >
                  {copySuccess ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        style={{ marginRight: '4px' }}
                      >
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        style={{ marginRight: '4px' }}
                      >
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p style={{ 
                whiteSpace: 'pre-wrap', 
                border: '1px solid #dee2e6', 
                borderRadius: '4px', 
                padding: '12px',
                backgroundColor: '#f8f9fa',
                fontFamily: 'monospace'
              }}>{output}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
