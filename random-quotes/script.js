const quoteParagraph = document.getElementById('quote');
const authorParagraph = document.getElementById('author');
const button = document.getElementById('button');

function getQuote() {
  fetch('https://api.api-ninjas.com/v1/quotes', {
    headers: {
      'X-Api-Key': 'HocZot4DGh6U3Kx1zCNE3w==3yrATQuswKoeVAvg' // Your API key here
    }
  })
    .then(response => response.json())
    .then(data => {
      const quote = data[0].quote;
      const author = data[0].author;
  
      quoteParagraph.innerHTML = `${quote}`;
      authorParagraph.innerHTML = `- ${author}`;
    })
}


  button.addEventListener('click', () => {
    getQuote();
  })