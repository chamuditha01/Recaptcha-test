import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 and later use this import
import App from './App';

const rootElement = document.getElementById('root'); // Make sure this matches the ID in your HTML

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error('Root element not found');
}
