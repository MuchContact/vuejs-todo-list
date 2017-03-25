import {router} from '../index'
const API_URL = "http://localhost:3000/authentication"

export default {

  user: {
    authenticated: false
  },

  login(context, creds, redirect) {
    context.$http.post(API_URL, creds).then((data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }, (err) => {
      context.error = err
    });

  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  }
}
