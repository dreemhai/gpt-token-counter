
function countTokens(str) {
    return str.split(/\s+/).length;
}

let tokenCounterDiv = null;
let toggleButton = null;
let inputField = document.querySelector('textarea');
let isHidden = false; 
let isActivedByDefault = false;

const checkbox = document.getElementById('alwaysOnCheckbox');

// Charge la valeur actuelle de la case à cocher depuis le stockage local
browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'enableTokenCounter') {
        setupTokenCounter(); // Exécute la logique de setupTokenCounter
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('alwaysOnCheckbox');
    if (checkbox) {
        checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    // Stocke l'état de la case à cocher comme cochée
                    browser.storage.local.set({ isCheck: true });
                    // Envoie un message au contenu du script pour activer la fonction "test"
                    browser.runtime.sendMessage({ action: 'enableTest' });
                    console.log("test1");
                } else {
                    // Stocke l'état de la case à cocher comme non cochée
                    browser.storage.local.set({ isCheck: false });
                    // Envoie un message au contenu du script pour désactiver la fonction "test"
                    browser.runtime.sendMessage({ action: 'disableTest' });
                    console.log("test2");
                }
            });
    }
});



function setupTokenCounter() {
    if (inputField) {
        tokenCounterDiv = document.createElement('div');
        tokenCounterDiv.style.position = 'absolute';
        tokenCounterDiv.style.top = '-30px';
        tokenCounterDiv.style.left = '0'; 
        tokenCounterDiv.style.padding = '0px';
        tokenCounterDiv.style.color = 'white';
        tokenCounterDiv.textContent = 'Tokens: 0';

        toggleButton = document.createElement('button');
        toggleButton.type = 'button'; // Ceci empêche le bouton de soumettre le formulaire
        toggleButton.textContent = 'OFF';
        toggleButton.style.backgroundColor = '#FF4136'; 
        toggleButton.style.border = 'none';
        toggleButton.style.color = 'white';
        toggleButton.style.marginLeft = '10px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.borderRadius = '5px';
        toggleButton.style.width = '3em';       
        toggleButton.style.textAlign = 'center';  
        toggleButton.style.lineHeight = '1.5';     


        toggleButton.addEventListener('click', function() {
            if (toggleButton.textContent === 'OFF') {
                toggleButton.textContent = 'ON';
                toggleButton.style.backgroundColor = '#2ECC40'; // Vert pour ON
                inputField.addEventListener('input', updateTokenCount);
                isActivedByDefault = false;
            } else {
                toggleButton.textContent = 'OFF';
                toggleButton.style.backgroundColor = '#FF4136'; // Rouge pour OFF
                inputField.removeEventListener('input', updateTokenCount);
                isActivedByDefault = true;
            }
        });

        inputField.parentElement.appendChild(tokenCounterDiv);
        if (!isHidden) {
            tokenCounterDiv.appendChild(toggleButton);
        }

        if (isActivedByDefault) {
            inputField.addEventListener('input', updateTokenCount);
        }
    }
}

function updateTokenCount() {
    tokenCounterDiv.textContent = 'Tokens: ' + countTokens(inputField.value);
    if (!isHidden && isActivedByDefault) {
        tokenCounterDiv.appendChild(toggleButton); 
    }
}

setupTokenCounter();
