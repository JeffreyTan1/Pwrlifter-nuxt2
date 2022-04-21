<template>

<div class="px-[10%] py-16">
  <NavBar />

  <div class="min-w-screen h-30 flex gap-16 items-center">
    <a @click="goBack" class="cursor-pointer">
      <font-awesome-icon class="text-white text-3xl" icon="arrow-left"/>
    </a>
    <h1 class="text-4xl font-bold sm:text-6xl">Profile Pic</h1>
  </div>
  
  <div class="min-w-screen h-full mt-36">

    <div class="max-w-[40rem]">
      <div class="flex flex-wrap items-center mt-10 justify-between gap-10">
        <label for="Profile Picture" class="text-2xl font-bold">Profile Picture</label>
      </div>
    </div>
  </div>

</div>



</template>

<script>

export default {
  data() {
    return {
      // name: null,
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
  middleware({ store, redirect }) {
    if (!store.state.auth.token) {
      return redirect('/')
    }
  }
}

</script>
