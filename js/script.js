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

async function captureScreen() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
    const video = document.createElement("video");

    video.addEventListener("loadedmetadata", async () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      video.play();
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      stream.getVideoTracks()[0].stop();

      const imageDataURL = canvas.toDataURL('image/png');
      const blobData = await (await fetch(imageDataURL)).blob();

      var now = new Date();
      var timestamp = now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '_' + now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blobData);
      link.download = 'LoveMessage_' + timestamp + '.png';
      link.click();
    });
    video.srcObject = stream;
  } catch (error) {
    console.log(error);
  }
}