import jwt_decode from 'jwt-decode'

function removeAuth(context) {
  context.store.commit('auth/setToken', null)
  context.store.commit('auth/setUser', null)
}

export default function (context) {
  // Check if the user is authenticated
  if (context.store.state.auth.token) {
    // Check if the token is valid
    try {
      const decodedToken = jwt_decode(context.store.state.auth.token)
      // Check if the token has expired
      if (decodedToken.exp < Date.now() / 1000) {
        removeAuth(context)
      }
    } catch (err) {
      removeAuth(context)
    }
  } else {
    removeAuth(context)
  }
}
