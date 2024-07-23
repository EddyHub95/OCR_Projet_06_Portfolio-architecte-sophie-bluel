// Fonction modifier l'attribut aria-hidden des éléments
function updateAriaHidden(elements, value) {
  elements.forEach(element => {
    if (element) {
      element.setAttribute("aria-hidden", value);
    }
  });
}

// Fonction masquer les éléments
function hideElements(elements) {
    elements.forEach(element => {
      if (element && element.classList) {
        element.classList.add("display-none");
      }
    });
  }
  
// Fonction afficher les éléments
function showElements(elements) {
    elements.forEach (element => {
      if (element && element.classList) {
        element.classList.remove("display-none");
      }
    });
}
  
// Fonction basculer l'affichage des éléments
function toggleElements(elements, visible) {
    elements.forEach(element => {
      if (element && element.classList) {
        element.classList.toggle("display-none", !visible);
      }
    });
}

// Cette fonction filtre les projets affichés en fonction de la catégorie sélectionnée. 
// Elle affiche les projets dont la catégorie correspond à celle sélectionnée ou à "all", et masque les autres.
function filterProjects(category) {
	const gallery = document.querySelector('.gallery');
	const projects = gallery.querySelectorAll('figure');

	projects.forEach(project => {
		const projectCategory = project.dataset.category;

		if (category === 'all' || projectCategory === category) {
            const show = [project];
			showElements(show);
		} else {
            const hide = [project];
            hideElements(hide);
		}
	});
}

// Cette fonction supprime un projet en envoyant une requête à l'API. 
// Si la suppression est réussie, elle retire l'élément correspondant du DOM.
function deleteProject(projectId) {

  const token = localStorage.getItem("token");
  const elementDeleted = document.querySelector(`.delete-icon[data-project-id="${projectId}"]`);
  const portfolioDeleted = document.querySelector(`figure[data-project-id="${projectId}"]`);
  const galleryDeleted = elementDeleted.parentElement;

  fetchDelete(projectId, token)
    .then(response => {
      if (response.ok) {
        portfolioDeleted.remove();
        galleryDeleted.remove();
        console.log(`Le projet avec l'ID ${projectId} a été supprimé.`);
      } else {
        console.log(`Une erreur s'est produite lors de la suppression du projet avec l'ID ${projectId}.`);
      }
    })
    .catch(error => {
      console.log('Une erreur s\'est produite lors de la communication avec l\'API :', error);
    });
}

// Cette fonction met à jour les galeries principale et modale avec les données du projet. 
// Elle crée les éléments nécessaires et les ajoute au DOM, et configure également le bouton de suppression.
function Updatewithdata(project) {
  const { id, title, imageUrl, categoryId } = project;

  // Galerie principale
  const gallery = document.getElementById('portfolio').querySelector('.gallery');
  const figure = document.createElement('figure');
  figure.dataset.category = categoryId;
  figure.dataset.projectId = id;

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = title;

  const figcaption = document.createElement('figcaption');
  figcaption.textContent = title;

  // Ajout dans galerie principale
  figure.appendChild(image);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);

  // Galerie modale
  const modalOverlay = document.getElementById('modal-overlay');
  const modalGallery = modalOverlay.querySelector('.modal-gallery');
  const modalGalleryDiv = document.createElement('div');
  modalGalleryDiv.style.position = 'relative';

  const modalGalleryImg = document.createElement('img');
  modalGalleryImg.src = imageUrl;
  modalGalleryImg.alt = title;

  // Création du lien de suppression pour la galerie modale
  const trashButton = document.createElement('a');
  trashButton.classList.add('delete-icon');
  trashButton.dataset.projectId = id;

  // Création de l'icône de poubelle
  const trashIcon = document.createElement('i');
  trashIcon.classList.add('fa-solid', 'fa-trash-can', 'fa-2xs');

  // Ajout dans la galerie modale
  trashButton.appendChild(trashIcon);
  modalGalleryDiv.appendChild(modalGalleryImg);
  modalGalleryDiv.appendChild(trashButton);
  modalGallery.appendChild(modalGalleryDiv);

  // Supprimer un projet (pour la galerie modale)
  trashButton.addEventListener('click', () => {
      deleteProject(id);
  });
}


// Cette fonction affiche une prévisualisation de l'image sélectionnée dans un champ de fichier. 
// Elle masque certains éléments et affiche l'image de prévisualisation.
function previewPicture() {
  const elementsToHide = [buttonAdd, addText, imgIcon, errorText];
  const elementsToShow = [previewImg];

  hideElements(elementsToHide);
  showElements(elementsToShow);

  const picture = fileInput.files[0];
  previewImg.src = URL.createObjectURL(picture);
}

// Supprimer la prévisualisation
// Cette fonction réinitialise la prévisualisation de l'image en masquant l'image de prévisualisation et en affichant les éléments initiaux.
function removePreviewPicture() {
  const elementsToHide = [previewImg];
  const elementsToShow = [buttonAdd, addText, imgIcon, errorText];

  showElements(elementsToShow);
  hideElements(elementsToHide);

  errorText.textContent = "";

  previewImg.src = "";
}

// Réinitialiser le formulaire d'ajout d'image, efface la prévisualisation et masque les messages d'erreur, puis désactive le bouton de soumission.
function resetForm() {
  addImgForm.reset();
  removePreviewPicture();
  hideValidationError(titleInput);
  hideValidationError(categorySelect);
  hideValidationError(fileInputDiv);
  disableSubmit();
}

// Affiche un message d'erreur sous un champ de formulaire. 
//Elle ajoute une classe error-input à l'élément et insère un paragraphe contenant le message d'erreur.
function showValidationError(inputElement, submit = true, text = 'Ce champ doit être rempli') {
    const errorElement = inputElement.parentNode.querySelector(`.error-message[data-input="${inputElement.id}"]`);
    if (errorElement) {
      return;
    }
  
    inputElement.classList.add('error-input');
  
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = text;
    errorMessage.dataset.input = inputElement.id;
    inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
    if (submit) {
      disableSubmit();
    }
}
  
// Masque le message d'erreur associé à un champ de formulaire et retire la classe error-input.
function hideValidationError(inputElement, submit = true) {
    inputElement.classList.remove('error-input');
    const errorElement = inputElement.parentNode.querySelector(`.error-message[data-input="${inputElement.id}"]`);
    if (errorElement) {
      errorElement.parentNode.removeChild(errorElement);
    }
    if (submit) {
      disableSubmit();
    }
}
  
// Cette fonction vérifie la validité des champs du formulaire et active ou désactive le bouton de soumission en conséquence.
function disableSubmit() {
    const isTitleValid = titleInput.value.trim() !== '';
    const isCategoryValid = categorySelect.value !== '';
    const isFileValid = fileInput.value !== '';
    const isFormValid = isTitleValid && isCategoryValid && isFileValid;
    if (isFormValid) {
      submitButton.classList.remove('disabled');
    } else {
      submitButton.classList.add('disabled');
    }
}

// Cette fonction vérifie la validité de chaque champ de formulaire fourni. 
// Si un champ est vide, elle affiche un message d'erreur
// Sinon, elle masque le message d'erreur. 
// Ensuite, elle appelle disableSubmit pour mettre à jour l'état du bouton de soumission.
function checkFormValidity(elements) {

  elements.forEach(el => {
      if(el.value.trim() === '') {
          if(el.id==='') {
              el = el.parentElement.parentElement;
          }
          showValidationError(el);
      } else {
          hideValidationError(el);
      }
  });
  disableSubmit();
}

// Fonction vérifier la validité du formulaire de connexion
// Vérifie la validité des champs de l'email et du mot de passe dans le formulaire de connexion. 
// Elle affiche des messages d'erreur si les champs sont vides ou si l'email est mal formaté.
function checkLoginFormValidity(email, password) {
    if (email.value.trim() === '') {
      showValidationError(email, false);
    } else if (!validateEmail(email.value.trim())) {
      showValidationError(email, false, 'Format incorrect');
    } else {
      hideValidationError(email, false);
    }
  
    if (password.value === '') {
      showValidationError(password, false);
    } else {
      hideValidationError(password, false);
    }
}


// Cette fonction vérifie et valide le format d'une adresse e-mail
function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
}