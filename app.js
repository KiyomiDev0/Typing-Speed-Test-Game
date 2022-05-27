let randomParagraph = 'https://api.quotable.io/random?minLength=200',
    sec = maxTime = 60,
    firstKeystroke = barWidth = 0,
    timerBar = document.querySelector('.timer-bar'),
    timer = document.querySelector('.timer span'),
    pContainer = document.querySelector('.paragraph-container'),
    input = document.querySelector('.input'),
    correctAudio = new Audio('audios/input.mp3'),
    wrongAudio = new Audio('audios/wrong.mp3'),
    audioControl = document.querySelector('.volume')

showNewParagraph();
body.onclick = () => input.focus();

input.addEventListener('input', (e) => {
   let words = Array.from(document.querySelectorAll('.paragraph-container div')),
       characters = Array.from(document.querySelectorAll('.paragraph-container span')),
       inputLength = input.value.length,
       currentCharacter = characters[inputLength],
       preCharacter;

   characters.forEach(span => span.classList.remove('active'));
   if(inputLength < characters.length) {
      currentCharacter.classList.add('active');
   };

   inputLength > 0 ? preCharacter = characters[inputLength - 1] : preCharacter = characters[0];

   runTimer();
   checkInput(e, currentCharacter, preCharacter, input.value[inputLength - 1]);
   activateCurrentWord(words, characters);
})

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
   function activeFirstCharacter() {
      let firstCharacter = document.querySelector(".paragraph-container span");
      firstCharacter.classList.add('active');
   }
   activeFirstCharacter();
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

function timerFn(){
   function updateTime(){
      timer.innerText = `${sec}s`;
      if (sec == 5) timer.classList.add('blink');
      sec--;
      sec < 0 ? clearInterval(timerFn) : 0;
      if (timer.innerText == '0s') input.readOnly = true;
  }
   updateTime();
   let timerFn = setInterval(updateTime, 1000);
}
// run timer on first keystroke only
function runTimer(){
   firstKeystroke += 1;
   if(firstKeystroke == 1) {
      timerFn();
      timerBarFn();
   }
}

function activateCurrentWord(words, characters) {
   characters.forEach(span => {
      if ((span.classList.contains('active'))) {
         let spanParent = span.parentElement;
         words.forEach(word => word.classList.remove('word-active'));
         spanParent.classList.add('word-active')
      }
   })
}

function checkInput(e, currentCharacter, preCharacter, inputVal) {
   if (e.inputType == 'deleteContentBackward') {
      if (currentCharacter.classList.contains('mistake')) {
         currentCharacter.classList.remove('mistake')
      }
      else if (currentCharacter.classList.contains('correct')) {
         currentCharacter.classList.remove('correct');
      }
   }
   else if (preCharacter.innerText === inputVal) {
      correctAudio.play();
      preCharacter.classList.add('correct');
   } 
   else {
      wrongAudio.play();
      preCharacter.classList.add('mistake')
   }
}

audioControl.addEventListener('click', () => {
   correctAudio.muted = wrongAudio.muted = !correctAudio.muted;
   correctAudio.muted ? audioControl.innerHTML = '<span class="icon-volume-mute2"></span>' 
   : audioControl.innerHTML = '<span class="icon-volume-high"></span>';
})
