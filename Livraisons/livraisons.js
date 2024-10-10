document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');
    const popupForm = document.getElementById('popupForm');
    const livraisonForm = document.getElementById('livraisonForm');
    const cancelButton = document.getElementById('cancelButton');
    const livraisonList = document.getElementById('livraisons-list');
    const dateField = document.getElementById('date');
    const suivantButton = document.getElementById('suivantButton');
  
    // Afficher la date du jour automatiquement
    const currentDate = new Date().toLocaleDateString('fr-CA');
    dateField.value = currentDate;

    // Charger les livraisons depuis le localStorage
    let livraisons = JSON.parse(localStorage.getItem('livraisons')) || [];
    displayLivraisons();

    // Objet temporaire pour la livraison en cours
    let currentLivraison = {
        destination: '',
        date: currentDate,
        articles: [] // Liste des articles ajoutés
    };

    // Ouvrir le popup quand on clique sur le bouton "Ajouter"
    addButton.addEventListener('click', function() {
        popupForm.style.display = 'block';
    });

    // Fermer le popup quand on clique sur "Annuler"
    cancelButton.addEventListener('click', function() {
        popupForm.style.display = 'none';
    });

    // Bouton "Suivant" pour ajouter un article à la livraison
    suivantButton.addEventListener('click', function() {
        addCurrentArticleToList(); // Ajouter l'article actuel
    });

    // Enregistrer la livraison complète quand on soumet le formulaire
    livraisonForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Ajouter l'article en cours avant l'enregistrement
        addCurrentArticleToList();

        // Ajouter la livraison à la liste principale
        currentLivraison.destination = document.getElementById('destination').value;
        livraisons.push(currentLivraison);
        localStorage.setItem('livraisons', JSON.stringify(livraisons));

        // Réinitialiser le formulaire et l'état de la livraison
        popupForm.style.display = 'none';
        livraisonForm.reset();
        dateField.value = currentDate;
        currentLivraison = { destination: '', date: currentDate, articles: [] };

        // Afficher les livraisons mises à jour
        displayLivraisons();
    });

    // Fonction pour afficher les livraisons
    function displayLivraisons() {
        livraisonList.innerHTML = '';

        livraisons.forEach((livraison, index) => {
            const li = document.createElement('li');
            li.textContent = `${livraison.destination} - ${livraison.date}`;
            livraisonList.appendChild(li);

            // Ajouter un événement de clic pour chaque livraison
            li.addEventListener('click', function() {
                showLivraisonDetails(livraison);
            });
        });
    }

    // Fonction pour ajouter l'article actuel à la liste
    function addCurrentArticleToList() {
        const designation = document.getElementById('designation').value;
        const variete = document.getElementById('variete').value;
        const quantite = document.getElementById('quantite').value;
        const unite = document.getElementById('unite').value;

        if (designation && quantite && unite) { // Vérifier si les champs requis sont remplis
            const article = {
                designation: designation,
                variete: variete,
                quantite: quantite,
                unite: unite
            };

            // Ajouter l'article à la livraison en cours
            currentLivraison.articles.push(article);

            // Réinitialiser les champs d'articles
            document.getElementById('designation').value = '';
            document.getElementById('variete').value = '';
            document.getElementById('quantite').value = '';
            document.getElementById('unite').value = '';
        }
    }
// :::::::::::::::::::::::::::::::::::::::::::::::::
// Variables pour le popup de détails
const detailPopup = document.getElementById('detailPopup');
const popupMessage = document.getElementById('popupMessage');
const addLineButton = document.getElementById('addLineButton');
const viewDetailButton = document.getElementById('viewDetailButton');
const closeDetailPopup = document.getElementById('closeDetailPopup');

// Afficher les détails de la livraison dans le popup
function showLivraisonDetails(livraison) {
    popupMessage.textContent = `Détails pour la livraison: ${livraison.destination} - ${livraison.date}`;
    detailPopup.style.display = 'block';

    // Gérer le clic sur "Ajouter une ligne"
    addLineButton.onclick = function() {
        // Logique pour ajouter une ligne (vous pouvez appeler une fonction ici)
        alert('Ajouter une ligne'); // Remplacez cela par votre logique
    };

    // Gérer le clic sur "Voir les détails"
    viewDetailButton.onclick = function() {
        // Rediriger vers une autre page
        window.location.href = `detailslivraisons.html?id=${livraison.destination}`; // Changez l'URL comme nécessaire
    };
}

// Fermer le popup de détails
closeDetailPopup.addEventListener('click', function() {
    detailPopup.style.display = 'none';
});

   
});
