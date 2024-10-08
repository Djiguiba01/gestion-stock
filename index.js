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
   
});
