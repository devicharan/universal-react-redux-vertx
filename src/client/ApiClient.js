import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];


function formatUrl(path) {
    console.log(path);
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (false) {
      console.log('I am running on server');
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

export default class ApiClient {
  constructor(req) {

      console.log('APICLIENT :'+req);
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {

        const request = superagent[method](formatUrl(path));
        console.log('APICLIENT for superagent');
        console.log('Data is '+data);
        console.log('params are '+params);

        if (params) {
            console.log('About to query request with params'+params);
          request.query(params);
        }

        if (false && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
            console.log('about to send reque');
          request.send(data);
        }
        console.log('Cana i send request');
        request.end(function (err,res) {

            if(err)
            {
                console.log('error is '+err);
                reject(res || err);
            }
            else {
                console.log('resposne is :' +res

                )
                resolve(res.body);
            }

        });
        //request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
