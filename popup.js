// Récupérer la référence à la case à cocher
let alwaysOnCheckbox = document.getElementById('always-on-checkbox');

// Écouter les changements d'état de la case à cocher
alwaysOnCheckbox.addEventListener('change', function() {
    // Enregistrer l'état actuel de la case à cocher dans le stockage local
    browser.storage.local.set({ alwaysOn: alwaysOnCheckbox.checked });
});
