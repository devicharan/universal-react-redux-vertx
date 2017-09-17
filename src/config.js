require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Site Title',
    description: 'Example Universal React Vertx Application',
    head: {
      titleTemplate: 'TitleTemplate: %s',
      meta: [
        {name: 'description', content: 'Site Description'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Sitename'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'company name'},
        {property: 'og:description', content: 'Company description'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@Devicharan'},
        {property: 'og:creator', content: '@Devicharan'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
