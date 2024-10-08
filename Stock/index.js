document.addEventListener('DOMContentLoaded', function() {
    const popupMenu = document.getElementById('popupMenu');
    const menuToggle = document.getElementById('menuToggle');
    const cards = document.querySelectorAll('.card, .popup-card');
    const mainContent = document.querySelector('.menu-main');

    // Ouvre le menu contextuel quand l'icône est cliquée
    menuToggle.addEventListener('click', function() {
        popupMenu.style.display = 'block';
    });

    // Ferme le popup si on clique en dehors du popup ou sur un lien du menu
    document.addEventListener('click', function(event) {
        const isClickInside = popupMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside) {
            popupMenu.style.display = 'none';
        }
    });

    // Change le contenu principal lorsque l'on clique sur un menu
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le comportement par défaut du lien
            const path = this.getAttribute('data-path');

            fetch(path) // Utilise fetch pour charger la page correspondante
                .then(response => response.text())
                .then(data => {
                    // Met à jour le contenu principal avec le contenu de la page chargée
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const newMain = doc.querySelector('.menu-main').innerHTML;
                    mainContent.innerHTML = newMain;
                });

            // Supprime la classe 'selected-card' de tous les éléments
            cards.forEach(c => c.classList.remove('selected-card'));

            // Ajoute la classe 'selected-card' à l'élément cliqué
            this.classList.add('selected-card');

            // Ferme le popup
            popupMenu.style.display = 'none';
        });
    });
});
