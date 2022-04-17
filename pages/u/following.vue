<template>

<div>
  <div class="px-[3%] py-16">
    <NavBar />
      <div class="flex flex-col min-w-screen h-30">
        <h1 class="text-7xl font-bold">Following</h1>
        <h2 class="text-base text-red mt-3">256 Strong people</h2>
      </div>
      
      <div class="min-w-screen h-full mt-24">
        <div class="flex flex-wrap gap-x-44">
          <FollowCard :name="'Jeff'" />
          <FollowCard :name="'Jeff'" />
        </div>
      </div>

  </div>



</div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
}

</script>
