let randomParagraph = 'https://api.quotable.io/random?minLength=200',
    pContainer = document.querySelector('.paragraph-container'),
    input = document.querySelector('.input')

showNewParagraph();
body.onclick = () => input.focus();

function getRandomParagraph() {
   return fetch(randomParagraph)
   .then(response => response.json())
   .then(data => data.content);
}

async function showNewParagraph() {
   pContainer.innerHTML = ''
   let paragraph = await getRandomParagraph();
   paragraph.split(' ').forEach(word => {
      let wordContainer = document.createElement('div');

      word.split('').forEach(char => {
         let character = document.createElement('span');
         character.innerText = char;
         wordContainer.appendChild(character);
      })
      pContainer.appendChild(wordContainer);
   })
}