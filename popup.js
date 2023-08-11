const checkbox = document.getElementById('alwaysOnCheckbox');
const toggleButton = document.getElementById('toggleButton');
// Charge la valeur actuelle de la case à cocher depuis le stockage local
browser.storage.local.get('isButtonOn').then(result => {
    if (result.isButtonOn) {
        toggleButton.classList.add('on');
        toggleButton.textContent = 'ON';
    }
});

// Écoute les changements de la case à cocher
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        // Stocke l'état de la case à cocher comme cochée
        browser.storage.local.set({ isCheck: true });
        browser.runtime.sendMessage({ action: 'activateFunction' });
    } else {
        // Stocke l'état de la case à cocher comme non cochée
        browser.storage.local.set({ isCheck: false });
        browser.runtime.sendMessage({ action: 'activateFunction' });
    }
});

toggleButton.addEventListener('click', () => {
    const isChecked = !toggleButton.classList.contains('on');

    toggleButton.textContent = isChecked ? 'ON' : 'OFF';
    toggleButton.classList.toggle('on', isChecked);

    // Stocke l'état du bouton ON/OFF dans le stockage local
    browser.storage.local.set({ isButtonOn: isChecked });

    // Envoie un message au contenu du script pour activer ou désactiver la fonctionnalité
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { action: 'activateFunction' });
    });
});