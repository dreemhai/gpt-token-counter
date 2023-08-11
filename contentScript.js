function countTokens(str) {
    // Cette fonction est une simplification. Pour une comptabilité exacte des tokens,
    // vous devrez probablement utiliser une bibliothèque ou un algorithme spécifique.
    return str.split(/\s+/).length;
}

let inputField = document.querySelector('textarea'); // Remplacez ceci par le sélecteur approprié pour le champ d'input de ChatGPT
if (inputField) {
    let tokenCounterDiv = document.createElement('div');
    tokenCounterDiv.style.position = 'absolute';
    tokenCounterDiv.style.top = '-30px'; // Ajustez selon l'emplacement souhaité
    tokenCounterDiv.style.left = '0';
    tokenCounterDiv.style.backgroundColor = '#343541';
    tokenCounterDiv.style.padding = '0px';
    tokenCounterDiv.textContent = 'Tokens: 0';

    inputField.parentElement.appendChild(tokenCounterDiv);

    inputField.addEventListener('input', function() {
        tokenCounterDiv.textContent = 'Tokens: ' + countTokens(inputField.value);
    });
}
