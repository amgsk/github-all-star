export default class Settings {

  static getToken () {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('token', (storage) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }
        resolve(storage.token);
      });
    });
  }

  static setToken (token) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({token: token}, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }
        resolve();
      });
    });
  }
}
