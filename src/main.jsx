import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { DataProvider } from "./context/DataContext.jsx";

createRoot(document.getElementById('root')).render(
    <DataProvider>
        <Router>
            <App />
        </Router>
    </DataProvider>

);
