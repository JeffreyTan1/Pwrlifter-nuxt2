<template>
  <div class="min-w-screen h-14 flex justify-end gap-16">

    <Link :to="'/'"><font-awesome-icon class="text-white" icon="search"/></Link>
    
    <Link :to="'/analytics/dashboard'">Analytics</Link>
    <Link v-if="user" :to="'/'+ user">My profile</Link>
    <Link v-if="user" :to="'/account/following'">Following</Link>
    <a v-if="user" class="font-bold cursor-pointer" @click="logout">Logout</a>
    
    <span v-else class="flex gap-x-16">
      <a
        class="font-bold cursor-pointer"
        :href="'https://auth.pwrlifter.com/login?client_id=5v9ssu9o5ri02k6nu2ng9ruu60&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=' + currentUrl + '/callback/login'">
        Login
      </a>
      <a
        class="font-bold cursor-pointer"
        :href="'https://auth.pwrlifter.com/signup?client_id=5v9ssu9o5ri02k6nu2ng9ruu60&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=' + currentUrl + '/callback/login'">
        Signup
      </a>
    </span>
    
  </div>
</template>

<script>
export default {
  mounted() {
    this.user = this.$store.state.auth.user
    this.currentUrl = process.env.baseUrl
  },
  data() {
    return {
      user: null,
      currentUrl: null
    }
  },
  methods: {
    logout() {
      this.$store.commit('auth/setToken', null)
      this.$store.commit('auth/setUser', null)
      this.$router.push('/')
    }
  },
}
</script>