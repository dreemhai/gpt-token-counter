const checkbox = document.getElementById('alwaysOnCheckbox');

// Charge la valeur actuelle de la case à cocher depuis le stockage local
browser.storage.local.get('isCheck').then(result => {
    if (result.isCheck) {
        checkbox.checked = true;
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
