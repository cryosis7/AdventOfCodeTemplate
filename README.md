# Advent of Code Solutions

A web-based solution runner for [Advent of Code](https://adventofcode.com/) puzzles, built with React, TypeScript, and Vite.

## Features

- 🎄 Interactive UI for running Advent of Code solutions
- 📅 Support for multiple years (2015-2025)
- 🔄 Automatic input fetching from Advent of Code website
- 📆 Handles every-other-day format for 2025+ puzzles (12 puzzles total)
- 💾 Local storage for inputs and session management
- ⚡ Fast development with Vite and Hot Module Replacement
- 🎨 Clean UI with Bootstrap styling

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Jotai** - State management
- **React Bootstrap** - UI components
- **ESLint & Prettier** - Code quality

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AdventOfCode
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3002`

## Usage

### Running Solutions

1. **Select Year**: Choose the Advent of Code year from the dropdown
2. **Select Solution**: Choose the specific solution/part you want to run
3. **Add Input**: Either:
   - Paste your puzzle input directly into the text area, or
   - Enter your Advent of Code session ID and click "Fetch Input" to automatically retrieve it
4. **Run**: Click the "Run" button to execute the solution

**Note**: Starting in 2025, Advent of Code releases puzzles every other day (12 puzzles total). The app automatically maps Solution X to the correct AOC day:
- **2025+**: Solution X = Day (2X - 1) (e.g., Solution 1 = Day 1, Solution 2 = Day 3, Solution 3 = Day 5)
- **2024 and earlier**: Solution X = Day X (one puzzle per day)

### Getting Your Session ID

To automatically fetch puzzle inputs:

1. Log in to [Advent of Code](https://adventofcode.com/)
2. Open your browser's Developer Tools (F12)
3. Go to the "Application" or "Storage" tab
4. Find "Cookies" and locate the `session` cookie
5. Copy the value and paste it into the Session ID field

### Adding New Solutions

Solutions are organized by year in the `src/solutions/` directory:

```
src/solutions/
├── 2024/
│   ├── solution1.ts
│   ├── solution2.ts
│   └── ...
├── 2025/
└── solutions.ts
```

To add a new solution:

1. Create a new file in the appropriate year folder (e.g., `src/solutions/2024/solution7.ts`)
2. Export your solution functions:

```typescript
import { Solution } from "../solutions";

export const solution7part1: Solution = (input) => {
    // Your solution logic here
    return result;
}

export const solution7part2: Solution = (input) => {
    // Your solution logic here
    return result;
}
```

3. Register your solutions in `src/solutions/solutions.ts`:

```typescript
import { solution7part1, solution7part2 } from "./2024/solution7";

export const SOLUTIONS = {
    "2024": {
        "Solution 7 - Part 1": solution7part1,
        "Solution 7 - Part 2": solution7part2,
        // ... other solutions
    },
    // ... other years
}
```

## Project Structure

```
AdventOfCode/
├── src/
│   ├── App.tsx           # Main application component
│   ├── index.tsx         # Application entry point
│   ├── store.ts          # Jotai state management
│   └── solutions/
│       ├── 2024/         # 2024 solutions
│       ├── 2025/         # 2025 solutions
│       └── solutions.ts  # Solution registry
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.js        # Vite configuration
└── eslint.config.mjs     # ESLint configuration
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production

## Development

The project uses:
- **Jotai** for lightweight state management
- **Local Storage** to persist inputs and session data
- **Vite proxy** for fetching inputs from Advent of Code API

## Contributing

Feel free to add your own solutions or improve the application!

## Author

Scott Dacre-Curtis

## License

ISC

---

Happy coding! 🎄✨

