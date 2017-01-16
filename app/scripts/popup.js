import debug from './Debug';

const resultDivSelector = document.getElementById('resultDiv');
const authorSelector    = document.getElementById('author');
const countSelector     = document.getElementById('count');
const messageSelector   = document.getElementById('message');

const initPopup = () => {
  authorSelector.innerText  = '';
  countSelector.innerText   = '';
  messageSelector.innerText = '';

  resultDivSelector.style.display = 'none';
  messageSelector.style.display   = 'none';
};

const showAuthorStarCount = (author, count) => {
  resultDivSelector.style.display = 'block';
  authorSelector.innerText = author;
  countSelector.innerText = count;
};

const showMessage = (message) => {
  messageSelector.style.display = 'block';
  messageSelector.innerText = message;
};

window.addEventListener('DOMContentLoaded', function () {

  initPopup();

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendRequest(tabs[0].id, {from: 'popup'}, function(response) {

      debug.log(response);

      if (response) {
        showAuthorStarCount(response.author, response.count);

      } else {
        showMessage('Star count can not be displayed on this page.');

      }
    });
  });
});


