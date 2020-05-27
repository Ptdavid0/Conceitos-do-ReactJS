import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState(["Devs"])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
      console.log(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: `newRepo${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    })
    const repo = response.data
    setRepositories([...repositories, repo])

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    //Remove from the front-end array too
    const repoIndex = repositories.findIndex(repos => repos.id === id);
    repositories.splice(repoIndex,1)

    //Tell React that there are changes in repositories
    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo,index) =>
          <React.Fragment key={index}>
            <li>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          </React.Fragment>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
