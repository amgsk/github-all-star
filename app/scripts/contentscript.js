import GitHubAPI from './GitHubAPI';
import Settings  from './Settings';
import debug     from './Debug';

const getAuthorName = () => {
  const userNameSelector = document.querySelector('.vcard-username');
  return userNameSelector ? userNameSelector.innerText : null;
};

const isValidPage = () => {
  return getAuthorName() !== null;
};

const getTarget = () => {
  const target = document.getElementsByClassName('underline-nav-item');
  return target ? target[0] : null;
};

const setCountToDom = (count) => {
  const target = getTarget();
  if (target && getTarget().children.length === 0) {
    target.innerHTML += `<span class='counter'>${count}</span>`;
  }
};

const domApplied = () => {
  if (!getTarget()) {
    return false;
  }
  return getTarget().children.length > 0;
};

const getCountFromAppliedDom = () => {
  return getTarget().children[0].innerText;
};

const getCount = (author, callback) => {
  if (domApplied()) {
    callback(null, getCountFromAppliedDom());
    return;
  }
  Settings.getToken().then((token) => {
    debug.log(token);

    GitHubAPI.getStarCount(token, author)
      .then((count) => {
        callback(null, count);
      })
      .catch((error) => {
        callback(error);
      });
  });
};

chrome.extension.onRequest.addListener( (request, sender, sendResponse) => {

  const author = getAuthorName();

  if (request.from === 'background') {
    debug.log('Request from background');

    switch (request.action) {

      case "isValid":
        debug.log('action: isValid');
        sendResponse({valid: isValidPage()});
        break;

      case "getCount":
        debug.log('action: getCount');
        getCount(author, (error, count) => {
          if (!error) {
            setCountToDom(count);
          }
          const response = {
            success : !error,
            enable  : true,
            author  : author,
            count   : count,
            error   : error,
          };
          sendResponse(response);
        });
        break;

      default:
        throw new Error('invalid action.');
        break;
    }
  } else if (request.from === "popup") {
    debug.log('Request from popup.');
    sendResponse({author: author, count: getCountFromAppliedDom()});
  }
});
