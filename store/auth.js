export const state = () => ({
  token: null,
  user: null,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  },
}
