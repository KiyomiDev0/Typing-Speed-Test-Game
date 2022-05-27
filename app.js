let randomParagraph = 'https://api.quotable.io/random?minLength=200';

function getRandomParagraph() {
   return fetch(randomParagraph)
   .then(response => response.json())
   .then(data => data.content);
}