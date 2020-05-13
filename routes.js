const routes = [
  // static assets
  {
    method: "GET",
    path: '/public/{params*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
        listing: true
      }
    }
  },
  // index
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.view('index', {
        title: 'Index Page'
      });
    }
  },
  // login
  {
    method: 'GET',
    path: '/login',
    options: {
      auth: 'sso'
    },
    handler: (request, h) => {
      return h.view('login', {
        title: 'Login Page'
      });
    }
  }
]


module.exports = routes;