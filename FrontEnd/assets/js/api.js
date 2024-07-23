// Fetch Works : Fonction pour récupérer les projets via une API.
async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}

// Fetch Categories : Fonction pour récupérer les catégories via une API.
async function fetchCategory () {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
}

// Fetch Login : Fonction pour envoyer les informations de connexion et obtenir un token si les informations sont correctes.
async function fetchLogin(data) {

    return fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
}

// Fetch Delete : Fonction pour supprimer un projet en utilisant son ID et un token d'autorisation.
async function fetchDelete(projectId, token) {
    return fetch(`http://localhost:5678/api/works/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}

// Fetch Send : Fonction pour envoyer un nouveau projet avec un token d'utilisateur et des données de formulaire.
async function fetchSend(userToken, formData) {
    return fetch('http://localhost:5678/api/works', {
      
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        body: formData
    });
}

