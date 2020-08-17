import React, { useState, useEffect } from 'react';
import api from './services/api';
import './styles.css';

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('repositories').then((response) => {
			setRepositories(response.data);
		});
	}, []);

	async function handleAddRepository() {
		const repository = await api.post('repositories', {
			url: 'https://github.com/teste123',
			title: `Repositorio ${Date.now()}`,
			techs: ['React', 'Node.js'],
		});

		setRepositories([...repositories, repository.data]);
	}

	async function handleRemoveRepository(id) {
		const result = await api.delete(`repositories/${id}`);

		if (result) {
			const indexRepository = repositories.findIndex((repo) => repo.id === id);
			repositories.splice(indexRepository, 1);
			setRepositories([...repositories]);
		}
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map((repo) => (
					<li key={repo.id}>
						{repo.title}
						<button onClick={() => handleRemoveRepository(repo.id)}>
							Remover
						</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
