browser.browserAction.onClicked.addListener((tab) => {
    // Envoie un message au contenu du script pour activer la fonctionnalité
    browser.tabs.sendMessage(tab.id, { action: 'enableTokenCounter' });
});

browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'activateFunction') {
        // Envoie un message au contenu du script pour activer la fonction
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, { action: 'activateFunction' });
        });
    }
    // Ajoutez le traitement pour d'autres actions si nécessaire
});
