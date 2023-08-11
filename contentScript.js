function countTokens(str) {
    return str.split(/\s+/).length;
}

let tokenCounterDiv = null;
let toggleButton = null;
let inputField = document.querySelector('textarea');

function setupTokenCounter() {
    if (inputField) {
        tokenCounterDiv = document.createElement('div');
        tokenCounterDiv.style.position = 'absolute';
        tokenCounterDiv.style.top = '-30px';
        tokenCounterDiv.style.left = '0'; // Positionnez le compteur à gauche
        tokenCounterDiv.style.padding = '0px';
        tokenCounterDiv.style.color = 'white';
        tokenCounterDiv.textContent = 'Tokens: 0';

        toggleButton = document.createElement('button');
        toggleButton.type = 'button'; // Ceci empêche le bouton de soumettre le formulaire
        toggleButton.textContent = 'OFF';
        toggleButton.style.backgroundColor = '#FF4136'; // Rouge pour OFF
        toggleButton.style.border = 'none';
        toggleButton.style.color = 'white';
        toggleButton.style.marginLeft = '10px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.borderRadius = '5px';

        toggleButton.addEventListener('click', function() {
            if (toggleButton.textContent === 'OFF') {
                toggleButton.textContent = 'ON';
                toggleButton.style.backgroundColor = '#2ECC40'; // Vert pour ON
                inputField.addEventListener('input', updateTokenCount);
            } else {
                toggleButton.textContent = 'OFF';
                toggleButton.style.backgroundColor = '#FF4136'; // Rouge pour OFF
                inputField.removeEventListener('input', updateTokenCount);
            }
        });

        inputField.parentElement.appendChild(tokenCounterDiv);
        tokenCounterDiv.appendChild(toggleButton);
    }
}

function updateTokenCount() {
    tokenCounterDiv.textContent = 'Tokens: ' + countTokens(inputField.value);
    tokenCounterDiv.appendChild(toggleButton); // Gardez le bouton à droite du texte du compteur
}

setupTokenCounter();
