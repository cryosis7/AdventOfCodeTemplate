import React, { useState } from 'react';
import { SOLUTIONS } from './solutions/solutions';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(): JSX.Element {
  const [selectedSolution, setSelectedSolution] = useState<string>(Object.keys(SOLUTIONS)[0]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleRun = () => {
    const processedOutput = SOLUTIONS[selectedSolution](input);
    setOutput(processedOutput);
  };

  const handleSolutionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSolution(event.target.value);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <label htmlFor="solutionSelect">Select Solution:</label>
          <select
            id="solutionSelect"
            className="form-select mb-3"
            value={selectedSolution}
            onChange={handleSolutionChange}
          >
            {Object.keys(SOLUTIONS).map((solutionKey) => (
              <option key={solutionKey} value={solutionKey}>
                {solutionKey}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <label htmlFor="inputField">Input:</label>
          <input
            id="inputField"
            type="text"
            className="form-control mb-3"
            value={input}
            onChange={handleInputChange}
          />
          <div className="d-flex justify-content-center"> {/* Center the button */}
            <button onClick={handleRun} className="btn btn-primary">
              Run
            </button>
          </div>
          <p>{output}</p>
        </div>
      </div>
    </div>
  );
}

export default App;