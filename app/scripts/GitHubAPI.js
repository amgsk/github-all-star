import debug from './Debug';

module.exports = {
  getStarCount: function (token, author) {
    const _this = this;
    const _urlBase = 'https://api.github.com';
    const _request = function (path, token, data) {
      return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();

        req.open('GET', `${_urlBase}${path}`, true);
        req.setRequestHeader('Accept', 'application/vnd.github.v3.raw+json');
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        if (token) {
          req.setRequestHeader('Authorization', `token ${token}`);
        }

        req.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              resolve(JSON.parse(this.responseText));
            } else {
              reject(this.status);
            }
          }
        };
        req.onerror = function () {
          reject(this.status);
        };
        req.send(data);
      });
    };

    const getRepository = function (token, author, page) {
      let url = `/users/${author}/repos?page=${page}&per_page=100`;
      return _request(url, token, null);
    };

    const getRepositories = function (token, info) {

      if (info['public_repos'] === 0) {
        return new Promise((resolve, reject) => {
          resolve([]);
        });
      }

      function recordValue(results, value) {
        return Array.prototype.concat.apply(results, value);
      }

      const pushValue = recordValue.bind(null, []);

      let requests              = [];
      let require_request_count = Math.ceil(info['public_repos'] / 100);
      for (let i = 0; i < require_request_count; i++) {
        requests.push(getRepository(token, info["login"], i + 1).then(pushValue));
      }
      return Promise.all(requests);
    };

    return _request(`/users/${author}`, token)
      .then(function (data) {
        return getRepositories(token, data).then(function(repos) {
          return _this.getCount(repos);
        });
      })
      .catch((responseCode) => {
        let message = '';
        switch (responseCode) {
          case 401:
            message = 'Invalid token.';
            debug.log(message);
            break;
          default:
            message = 'An error occurred.';
            break;
        }
        throw new Error(message);
      });
  },

  convertUnit : function (count) {

    debug.log(`before convert count: ${count}`);
    if (count === 0) {
      return 0;
    }

    const K = 1000;
    const MEASURE = ['', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y'];
    const decimalPoint = count < K ? 0 : 1;

    const i = Math.floor(Math.log(count) / Math.log(K));
    const convertedCount = (count / Math.pow(1000, i)).toFixed(decimalPoint) + MEASURE[i];

    debug.log(`after convert count: ${convertedCount}`);
    return convertedCount;
  },

  getCount : function(repos) {
    let count = 0;
    let repositories = Array.prototype.concat.apply([], repos);

    repositories.forEach(function(repo) {
      if (!repo.fork) {
        count += repo.stargazers_count;
      }
    });

    return this.convertUnit(count);
  }
};
