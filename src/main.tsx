import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './app';
import './global.css';

const wrapper = document.getElementById('root')!;
const root = ReactDOM.createRoot(wrapper);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
