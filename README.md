# Advent of Code Solutions

A web-based solution runner for [Advent of Code](https://adventofcode.com/) puzzles, built with React, TypeScript, and Vite.

## Quick Start

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cryosis7/AdventOfCodeTemplate.git
cd AdventOfCodeTemplate
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
│   ├── solution1.ts
│   └── ...
└── solutions.ts
```

To add a new solution:

1. Create a new file in the appropriate year folder (e.g., `src/solutions/2024/solution7.ts`)
2. Export your solution functions following the naming convention:

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

**That's it!** The app automatically discovers and registers your solutions. Just follow the naming convention:
- File name: `solution{number}.ts` (e.g., `solution7.ts`)
- Export names: `solution{number}part1` and `solution{number}part2`
- The solution will appear in the UI as "Solution {number} - Part 1/2"

## Features

- 🎄 Interactive UI for running Advent of Code solutions
- 📅 Support for multiple years (2015-2025)
- 🔄 Automatic input fetching from Advent of Code website
- 📆 Handles every-other-day format for 2025+ puzzles (12 puzzles total)
- 💾 Local storage for inputs and session management
- ⚡ Fast development with Vite and Hot Module Replacement
- 🎨 Clean UI with Bootstrap styling

## Development

### Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Jotai** - State management
- **React Bootstrap** - UI components
- **ESLint & Prettier** - Code quality

### Project Structure

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

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production

### Technical Details

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

