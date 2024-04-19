function getRandomQuote() {
  document.getElementById('quote').textContent = '';
  document.getElementById('author').textContent = '';

  const button = document.getElementById('getRandomQuoteButton');
  button.disabled = true;

  fetch('../data/quote.json')
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex].quote;
      const randomAuthor = data[randomIndex].author;
      
      animateSpan('quote', randomQuote, () => {
          animateSpan('author', randomAuthor, () => {
              button.disabled = false;
          });
      });
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi:', error);
      button.disabled = false;
  });
}

function animateSpan(spanId, text, callback) {
  const span = document.getElementById(spanId);
  let index = 0;
  const interval = setInterval(() => {
      if (index < text.length) {
      span.textContent += text[index];
      index++;
      } else {
      clearInterval(interval);
      if (callback) {
          callback();
      }
      }
  }, 50);
}

window.onload = function() {
  function lockScroll() {
      window.scrollTo(0, 0);
  }
  window.addEventListener('resize', lockScroll);
  window.addEventListener('load', lockScroll);
};

document.getElementById("shareButton").addEventListener("click", function() {
  var quoteContent = document.getElementById("quote").innerText;
  document.querySelector('meta[property="og:description"]').setAttribute("content", quoteContent);
});