function getRandomQuote() {
    document.getElementById('quote').textContent = '';
    document.getElementById('author').textContent = '';
  
    fetch('../data/quote.json')
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex].quote;
        const randomAuthor = data[randomIndex].author;
        
        animateSpan('quote', randomQuote);
        animateSpan('author', randomAuthor);
      })
      .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
    });
}

function animateSpan(spanId, text) {
    const span = document.getElementById(spanId);
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
        span.textContent += text[index];
        index++;
        } else {
        clearInterval(interval);
        }
    }, 50);
}