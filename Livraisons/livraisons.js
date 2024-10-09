const deliveryList = document.getElementById('livraisonList');
const addDeliveryButton = document.getElementById('addDeliveryButton');
const deliveryPopup = document.getElementById('deliveryPopup');
const overlay = document.getElementById('overlay');
const saveDeliveryButton = document.getElementById('saveDeliveryButton');
const cancelButton = document.getElementById('cancelButton');
const dateInput = document.getElementById('date');

// Set current date automatically
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

addDeliveryButton.addEventListener('click', () => {
    deliveryPopup.style.display = 'block';
    overlay.style.display = 'block';
});

cancelButton.addEventListener('click', () => {
    deliveryPopup.style.display = 'none';
    overlay.style.display = 'none';
});

saveDeliveryButton.addEventListener('click', () => {
    const destination = document.getElementById('destination').value;
    const designation = document.getElementById('designation').value;
    const variete = document.getElementById('variete').value;
    const quantite = document.getElementById('quantite').value;
    const unite = document.getElementById('unite').value;
    const date = document.getElementById('date').value;

    const listItem = document.createElement('li');
    listItem.textContent = `Destination: ${destination}, Désignation: ${designation}, Variété: ${variete}, Quantité: ${quantite} ${unite}, Date: ${date}`;
    deliveryList.appendChild(listItem);

    // Clear the form fields
    document.getElementById('destination').value = '';
    document.getElementById('designation').value = '';
    document.getElementById('variete').value = '';
    document.getElementById('quantite').value = '';
    document.getElementById('unite').value = 'gr';
    dateInput.value = today;

    deliveryPopup.style.display = 'none';
    overlay.style.display = 'none';
});
