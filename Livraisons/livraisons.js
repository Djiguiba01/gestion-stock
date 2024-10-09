let tempDeliveryList = []; // Liste temporaire pour stocker les livraisons
let deliveries = []; // Liste principale des livraisons

const deliveryList = document.getElementById('livraisonList');
const addDeliveryButton = document.getElementById('addDeliveryButton');
const deliveryPopup = document.getElementById('deliveryPopup');
const overlay = document.getElementById('overlay');
const saveDeliveryButton = document.getElementById('saveDeliveryButton');
const nextDeliveryButton = document.getElementById('nextDeliveryButton');
const cancelButton = document.getElementById('cancelButton');
const dateInput = document.getElementById('date');

// Popup de détails
const detailsPopup = document.getElementById('detailsPopup');
const detailsContent = document.getElementById('detailsContent');
const closeDetailsPopup = document.getElementById('closeDetailsPopup');
const addLineButton = document.getElementById('addLineButton');

// Set current date automatically
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

// Récupérer les livraisons existantes du localStorage au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const storedDeliveries = JSON.parse(localStorage.getItem('deliveries'));
    if (storedDeliveries) {
        deliveries = storedDeliveries;
        deliveries.forEach(delivery => {
            addDeliveryToList(delivery);
        });
    }
});

addDeliveryButton.addEventListener('click', () => {
    deliveryPopup.style.display = 'block';
    overlay.style.display = 'block';
});

cancelButton.addEventListener('click', () => {
    deliveryPopup.style.display = 'none';
    overlay.style.display = 'none';
});

// Fonction pour stocker temporairement les données et vider les champs sauf la destination
nextDeliveryButton.addEventListener('click', () => {
    const destination = document.getElementById('destination').value;
    const designation = document.getElementById('designation').value;
    const variete = document.getElementById('variete').value;
    const quantite = document.getElementById('quantite').value;
    const unite = document.getElementById('unite').value;
    const date = document.getElementById('date').value;

    // Stocker les informations sauf destination dans un tableau temporaire
    const newDelivery = {
        destination,
        designation,
        variete,
        quantite,
        unite,
        date
    };

    tempDeliveryList.push(newDelivery); // Ajout à la liste temporaire

    // Vider les champs sauf destination
    document.getElementById('designation').value = '';
    document.getElementById('variete').value = '';
    document.getElementById('quantite').value = '';
    document.getElementById('unite').value = 'gr';
    dateInput.value = today; // Réinitialiser la date
});

// Fonction pour ajouter la livraison à la liste et au localStorage
function addDeliveryToList(delivery) {
    const listItem = document.createElement('li');
    listItem.textContent = `Destination: ${delivery.destination}, Date: ${delivery.date}`;
    listItem.addEventListener('click', () => showDetails(delivery)); // Ajouter un événement de clic

    deliveryList.appendChild(listItem);
}

// Enregistrer toutes les livraisons temporaires dans la liste principale
saveDeliveryButton.addEventListener('click', () => {
    const destination = document.getElementById('destination').value;

    // Ajouter la livraison actuelle à la liste temporaire
    const finalDelivery = {
        destination,
        deliveries: [...tempDeliveryList] // Toutes les livraisons stockées
    };

    // Ajouter toutes les livraisons à la liste principale
    finalDelivery.deliveries.forEach(delivery => {
        addDeliveryToList(delivery);
    });

    // Stocker toutes les livraisons dans le localStorage
    deliveries.push(finalDelivery);
    localStorage.setItem('deliveries', JSON.stringify(deliveries));

    // Réinitialiser la liste temporaire et fermer le popup
    tempDeliveryList = [];
    deliveryPopup.style.display = 'none';
    overlay.style.display = 'none';

    // Vider les champs
    document.getElementById('destination').value = '';
    document.getElementById('designation').value = '';
    document.getElementById('variete').value = '';
    document.getElementById('quantite').value = '';
    document.getElementById('unite').value = 'gr';
    dateInput.value = today; // Réinitialiser la date
});

// Afficher le popup avec les détails de la livraison
function showDetails(delivery) {
    detailsContent.innerHTML = `
        <p><strong>Destination:</strong> ${delivery.destination}</p>
        <p><strong>Désignation:</strong> ${delivery.designation}</p>
        <p><strong>Variété:</strong> ${delivery.variete}</p>
        <p><strong>Quantité:</strong> ${delivery.quantite} ${delivery.unite}</p>
        <p><strong>Date:</strong> ${delivery.date}</p>
    `;
    detailsPopup.style.display = 'block'; // Afficher le popup
}

// Fermer le popup de détails
closeDetailsPopup.addEventListener('click', () => {
    detailsPopup.style.display = 'none';
});

// Ajouter une ligne à la livraison
addLineButton.addEventListener('click', () => {
    const newDestination = prompt('Entrez une nouvelle destination:');
    if (newDestination) {
        const newDelivery = {
            destination: newDestination,
            designation: '',
            variete: '',
            quantite: '',
            unite: 'gr',
            date: today
        };
        tempDeliveryList.push(newDelivery); // Ajouter la nouvelle ligne à la liste temporaire
        addDeliveryToList(newDelivery); // Afficher la nouvelle ligne dans la liste
    }
});
