import Settings from './Settings';

const tokenSelector = document.getElementById('token');
const saveSelector  = document.getElementById('save');

const showMessage = (message) => {
  const messageSelector = document.getElementById('message');
  messageSelector.style.display='block';
  messageSelector.innerText = message;

  setTimeout(() => {
    messageSelector.style.display='none';
    messageSelector.innerText = '';
  }, 1000);
};

saveSelector.addEventListener('click', () => {
  if (!tokenSelector.value) {
    showMessage('fail.');
    return;
  }
  Settings.setToken(tokenSelector.value).then(() => {
    showMessage('success.')
  });
});

Settings.getToken().then((settingToken) => {
  if (settingToken) {
    tokenSelector.value = settingToken;
  }
});
