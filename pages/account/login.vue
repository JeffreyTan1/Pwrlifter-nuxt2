<template>
  <div class="max-w-[20rem] min-h-screen mx-auto flex flex-col justify-center">

    <div class="flex items-center gap-x-4 mb-14">
      <NuxtLink to="/" class="cursor-pointer">
        <font-awesome-icon class="text-white text-lg" icon="arrow-left"/>
      </NuxtLink>
      <h1 class="inline text-lg">Home</h1>
    </div>

    <form @submit="login" class="flex flex-col gap-y-4">

      <div class="flex flex-col items-start gap-y-2">
        <label for="username" class="text-lg">Username</label>
        <input id="username" v-model="username" class="px-3 py-2 rounded-xl text-lg outline-none w-full"/>
      </div>

      <div class="flex flex-col items-start gap-y-2">
        <label for="password" class="text-lg">Password</label>
        <input id="password" v-model="password" type="password" class="px-3 py-2 rounded-xl text-lg outline-none w-full"/>
      </div>

      <button @click="login" class="mt-4 py-2 px-3.5 bg-red inline text-s font-bold text-center">
        Login
      </button>

    </form>
    
    <NuxtLink to="/accounts/signup" class="underline text-sm mt-6">
      Don't have an account? Signup.
    </NuxtLink>

  </div>

</template>


<script>

export default {
  mounted() {
    this.slug = this.$route.path.split('/')[1]
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login(e) {
      e.preventDefault()

    },
  },
}

</script>
