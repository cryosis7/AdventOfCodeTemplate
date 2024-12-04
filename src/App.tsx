import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { SOLUTIONS } from './solutions/solutions';

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
    <div className="App">
      <select value={selectedSolution} onChange={handleSolutionChange}>
        {Object.keys(SOLUTIONS).map((solutionKey) => (
          <option key={solutionKey} value={solutionKey}>
            {solutionKey}
          </option>
        ))}
      </select>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleRun}>Run</button>
      <p>{output}</p>
    </div>
  );
}

export default App;