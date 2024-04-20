function getRandomQuote() {
  document.getElementById('quote').textContent = '';
  document.getElementById('author').textContent = '';

  const button = document.getElementById('getRandomQuoteButton');
  button.disabled = true;

  fetch('../data/quote.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('captureButton').style.display = 'none';
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex].quote;
      const randomAuthor = data[randomIndex].author;
      
      animateSpan('quote', randomQuote, () => {
          animateSpan('author', randomAuthor, () => {
              button.disabled = false;
              document.getElementById('captureButton').style.display = 'block';
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

document.getElementById('captureButton').addEventListener('click', function() {
  document.getElementById('captureButton').style.display = 'none';
  document.getElementById('getRandomQuoteButton').style.display = 'none';
  document.getElementById('github').style.display = 'none';
  document.getElementById('donate').style.display = 'none';

  setTimeout(function() {
      var now = new Date();
      var timestamp = now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '_' + now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
      
      html2canvas(document.body).then(function(canvas) {
          var link = document.createElement('a');
          link.download = 'LoveMessage_' + timestamp + '.png';
          link.href = canvas.toDataURL();
          link.click();
      });

      document.getElementById('captureButton').style.display = 'block';
      document.getElementById('getRandomQuoteButton').style.display = 'block';
      document.getElementById('github').style.display = 'block';
      document.getElementById('donate').style.display = 'block';
  }, 500);
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function openSourceCode() {
  var confirmation = confirm("Bạn có chắc chắn muốn mở liên kết trong một tab mới?");

  if (confirmation) {
    var url = 'https://github.com/hoaphamduc/LoveMessage';
    window.open(url, '_blank');
  }
}
