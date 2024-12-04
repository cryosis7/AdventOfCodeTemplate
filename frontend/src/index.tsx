import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl !== null) {
    const root = createRoot(rootEl);
    root.render(<App />);
}