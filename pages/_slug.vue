<template>

<div v-if="slug !== null">

  <div v-if="slug === ''" class="min-w-screen min-h-screen flex flex-col justify-center">
    <div class="flex flex-col items-center justify-center text-center gap-20">
      <SearchBar />
      <h1 class="text-5xl font-bold">A portfolio for your best powerlifts</h1>
      <div class="flex justify-center items-center gap-16 ">
        <Button>Log in</Button>
        <Button>Sign up</Button>
      </div>
    </div>
  </div>

  <div v-else class="px-[3%] py-16">
    <NavBar />

    <div class="min-w-screen h-30 flex justify-between items-center flex-wrap gap-y-10">
      <div class="flex">
        <span class="w-28 h-26 bg-grey mr-10">IMG</span>
        <div class="flex flex-col">
          <h1 class="text-7xl font-bold">{{slug}}</h1>
          <h2 class="text-base text-red mt-3">Total: kg/lbs</h2>
        </div>
      </div>
      <div class="flex gap-10">
        <NuxtLink :to="'/post/user'">
          <IconButton :name="'edit'"/>
        </NuxtLink>
        <IconButton :name="'plus'"/>
        <IconButton :name="'share'"/>    
      </div>
        
      </div>

      <div class="min-w-screen h-full mt-24">
        <div class="flex flex-wrap justify-between">
          <VideoFrame :name="'Squat'" :weight="177.5"/>
          <VideoFrame :name="'Bench'" :weight="122.0"/>
          <VideoFrame :name="'Deadlift'" :weight="197.5"/>
        </div>
      </div>

  </div>



</div>
</template>

<script>

export default {
  mounted() {
    this.slug = this.$route.path.split('/')[1]
  },
  data() {
    return {
      slug: null,
    }
  },
}

</script>
