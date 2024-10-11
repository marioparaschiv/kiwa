import ReactDOM from 'react-dom/client';
import React from 'react';
import './global.css';

import App from './app';

const wrapper = document.getElementById('root')!;
const root = ReactDOM.createRoot(wrapper);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
