<template>

<div class="px-[10%] py-16">
  <NavBar />

  <div class="min-w-screen h-30 flex gap-16 items-center">
    <a @click="goBack" class="cursor-pointer">
      <font-awesome-icon class="text-white text-3xl" icon="arrow-left"/>
    </a>
    <h1 class="text-4xl font-bold sm:text-6xl">Personal Info</h1>
  </div>
  
  <div class="min-w-screen h-full mt-36">

    <div class="max-w-[40rem]">

      <div class="flex flex-wrap items-center justify-between gap-10">
        <label for="name" class="text-2xl font-bold">Name</label>
        <input id="name" v-model="name" class="px-3 py-2 rounded-xl text-lg outline-none w-80"/>
      </div>

      <div class="flex flex-wrap items-center mt-10 justify-between gap-10">
        <label for="Profile Picture" class="text-2xl font-bold">Profile Picture</label>
      </div>

      <div class="flex justify-end mt-10">
        <Button>
          Save
        </Button>
      </div>

    </div>

    

  </div>

</div>



</template>

<script>

export default {
  data() {
    return {
      name: null,
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  }
}

</script>
