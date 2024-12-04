import React, {useState} from "react";
import {SOLUTIONS} from "./solutions/solutions";
import "bootstrap/dist/css/bootstrap.min.css";

function App(): JSX.Element {
    const [selectedSolution, setSelectedSolution] = useState<string>(
        Object.keys(SOLUTIONS)[0]
    );
    const [sessionId, setSessionId] = useState<string>("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
    };

    const handleRun = () => {
        const processedOutput = SOLUTIONS[selectedSolution](input);
        setOutput(processedOutput.toString());
    };

    const handleSolutionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedSolution(event.target.value);
    };

    const getInput = async () => {
        const inferredDay = selectedSolution.match(/Day\s?(\d+)/i)?.[1];
        if (inferredDay == null || sessionId == '') {
            return;
        }

        document.cookie = `session=${sessionId}`
        const request = new Request(`/api/input/${inferredDay}`, {
            method: 'GET',
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(`Error fetching input: ${response.status}`);
        }

        const input = await response.text();
        setInput(input);
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">
                <a
                    href="https://adventofcode.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Advent of Code Solutions
                </a>
            </h1>
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
                    />
                    <div className="d-flex justify-content-center">
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
