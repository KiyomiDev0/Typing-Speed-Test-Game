let randomParagraph = 'https://api.quotable.io/random?minLength=200',
    maxTime = 60,
    barWidth = 0,
    timerBar = document.querySelector('.timer-bar'),
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

function timerBarFn(){
   let widthIncrement = 100 / maxTime;
   function updateBarWidth() {
      timerBar.style.width = `${barWidth}%`;
      barWidth += widthIncrement;
      barWidth > 101 ? clearInterval(timerBarFn) : 0;
   }
   updateBarWidth()
   let timerBarFn = setInterval(updateBarWidth, 1000);
}
timerBarFn()