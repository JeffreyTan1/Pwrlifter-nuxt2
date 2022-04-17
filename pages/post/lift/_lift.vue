<template>

<div class="px-[10%] py-16">
  <NavBar />

  <div class="min-w-screen h-30 flex gap-16 items-center">
    <a @click="goBack" class="cursor-pointer">
      <font-awesome-icon class="text-white text-3xl" icon="arrow-left"/>
    </a>
    <h1 class="text-4xl font-bold sm:text-6xl">{{lift}}</h1>
  </div>
  
  <div class="min-w-screen h-full mt-36">

    <div class="max-w-[40rem]">

      <div class="flex flex-wrap items-center justify-between gap-10">
        <label for="weight" class="text-2xl font-bold">Weight</label>
        <input type="number" id="weight" v-model="weight" class="px-3 py-2 rounded-xl text-lg outline-none w-80"/>
      </div>
      <div class="flex flex-wrap items-center mt-10 justify-between gap-10">
        <label for="unit" class="text-2xl font-bold">Unit</label>
        <select name="unit" id="unit" v-model="unit" class="px-3 py-2 rounded-xl w-80 outline-none text-lg">
          <option>Kg</option>
          <option>Lbs</option>
        </select>
      </div>

      <div class="flex flex-wrap items-center mt-10 justify-between">
        <label for="video" class="text-2xl font-bold">Video</label>
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
  mounted() {
    const routeSplit = this.$route.path.split('/')
    let param = routeSplit[routeSplit.length - 1]
    this.lift = param.charAt(0).toUpperCase() + param.slice(1)
  },
  data() {
    return {
      lift: null,
      weight: 0,
      unit: '',
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  }
}

</script>
