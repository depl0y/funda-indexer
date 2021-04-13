import React from 'react';
import './App.css';
import { Top10view } from './views/top10';
import { Top10DataSource } from './data-sources/top10';
import { Top10GardenDataSource } from './data-sources/top10garden';

function App() {
	return (
		<div className="App">
			<Top10view title="Top 10 with most objects in Amsterdam" datasource={new Top10DataSource()} />
			<Top10view title="Top 10 with most objects in Amsterdam with a garden" datasource={new Top10GardenDataSource()} />
		</div>
	);
}

export default App;
