<template>
  <div>
  </div>
</template>

<script>
  import jwt_decode from 'jwt-decode'

  export default {
  mounted() {
    const start = `access_token=`
    const end = `&expires_in`
    let accessToken = window.location.href.split(start)[1].split(end)[0]
    this.$store.commit('auth/setToken', accessToken)

    const decoded = jwt_decode(accessToken)
    this.$store.commit('auth/setUser', decoded.username)

    this.$router.push('/')
  }
  }
</script>
