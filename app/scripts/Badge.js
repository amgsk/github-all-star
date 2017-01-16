'use strict';

export default class Badge {

  // public methods

  static setLoadingBadge () {
    this[Symbol.for('_setBadgeColor')]('gray');
    this[Symbol.for('_setBadge')]('...');
  }

  static setErrorBadge () {
    this[Symbol.for('_setBadgeColor')]('red');
    this[Symbol.for('_setBadge')]('✗');
  }

  static setInvalidBadge() {
    this[Symbol.for('_setBadgeColor')]('gray');
    this[Symbol.for('_setBadge')]('-');
  }

  static setCountBadge (count) {
    this[Symbol.for('_setBadgeColor')]('blue');
    this[Symbol.for('_setBadge')](count);
  }

  // private methods

  static [Symbol.for('_setBadgeColor')] (color) {
    chrome.browserAction.setBadgeBackgroundColor({ color: color });
  }

  static [Symbol.for('_setBadge')] (count) {
    chrome.browserAction.setBadgeText({ text: String(count) });
  }
}
