import ReactDOM from 'react-dom/client';
import { Router } from 'routes';
import { StrictMode } from 'react';
import './index.css';

if (!process.env.REACT_APP_NET_URL) throw new Error('REACT_APP_NET_URL is not set');

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <StrictMode>
        <Router />
    </StrictMode>,
);
