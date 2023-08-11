
browser.browserAction.onClicked.addListener((tab) => {
    // Envoie un message au contenu du script pour activer la fonctionnalité
    browser.tabs.sendMessage(tab.id, { action: 'enableTokenCounter' });
});
