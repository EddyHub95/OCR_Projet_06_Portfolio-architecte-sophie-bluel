// Attend que le DOM soit entièrement chargé avant d'exécuter le code
// Cela garantit que tous les éléments du DOM sont disponibles pour manipulation.
document.addEventListener('DOMContentLoaded', function () {
  
  // Récupère les éléments du DOM correspondant aux champs de saisie de l'email, du mot de passe et du bouton de soumission
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const submitButton = document.getElementById('login-submit');

  // Clic sur le bouton de submitButton
  // Lorsqu'on clique sur ce bouton, la fonction à l'intérieur de l'événement est exécutée.
  submitButton.addEventListener('click', async (e) => {

    // Cette ligne empêche le comportement par défaut du formulaire (rechargement de la page).
    e.preventDefault();


    // Si le formulaire est valide
    // Vérifie si les champs d'email et de mot de passe ne contiennent pas la classe error-input, ce qui indiquerait qu'ils sont valides. 
    // Ensuite, elle récupère les valeurs de ces champs
    if (!emailInput.classList.contains('error-input') && !passwordInput.classList.contains('error-input')) {
      const email = emailInput.value;
      const password = passwordInput.value;

      // Si l'adresse e-mail n'est pas au bon format, affiche une erreur si c'est le cas et arrête l'exécution de la fonction.
      if (!validateEmail(email)) {
        showValidationError(emailInput, 'Format incorrect');
        return;
      }

      // Prépare les données à envoyer pour la connexion
      const data = {
        email: email,
        password: password,
      };

      // appel la fonction fetchlogin avec les données de connexion (parametre DATA).
      fetchLogin(data)
        .then(response => {
          // Si la connexion réussit, traite la réponse
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) { //Si la réponse est un code 401, cela signifie que l'email ou le mot de passe est incorrect.
            throw new Error('Adresse mail ou mot de passe invalide');
          } else {
            throw new Error('Erreur lors de la connexion');
          }
        })
        .then(responseData => {
          // Stocke le token dans le stockage local et redirige vers la page d'accueil
          const token = responseData.token;
          localStorage.setItem('token', token);
          window.location.href = 'index.html';
        })
        .catch(error => {
          // Si une erreur survient, elle affiche un message d'erreur et vide le champ de mot de passe.
          showValidationError(passwordInput, error.message);
          passwordInput.value = '';
        });
    }
  });

  // Récupère le lien de connexion par sa classe login-link.
  const loginLink = document.querySelector(".login-link");

  // Récupère le nom de la page actuellement affichée dans l'URL
  const currentPage = window.location.pathname.split("/").pop();

  // Vérifie si la page actuelle est "login.html" et ajoute une classe "active" au lien
  if (currentPage === "login.html") {
    loginLink.classList.add("active");
  }

  // Ajoute un gestionnaire d'événements à la saisie dans le champ d'e-mail
  emailInput.addEventListener('input', function () {
    hideValidationError(emailInput, false);
  // Si l'email est vide ou incorrect, elle affiche un message d'erreur ; sinon, elle masque le message d'erreur.
    if (emailInput.value.trim() === '') {
        showValidationError(emailInput, false);
    } else if (!validateEmail(emailInput.value.trim())) {
        showValidationError(emailInput, false, 'Format incorrect');
    } else {
        hideValidationError(emailInput, false);
    }
  });

  // Ajoute un gestionnaire d'événements à la saisie dans le champ de mot de passe pour vérifier si le mot de passe est vide pendant la saisie.
  // Si c'est le cas, elle affiche un message d'erreur ; sinon, elle masque le message d'erreur.
  passwordInput.addEventListener('input', function () {
    if (passwordInput.value === '') {
        showValidationError(passwordInput, false);
    } else {
        hideValidationError(passwordInput, false);
    }
  });

});
