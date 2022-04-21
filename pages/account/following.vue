<template>

<div>
  <div class="px-[3%] py-16">
    <NavBar />
      <div class="flex flex-col min-w-screen h-30">
        <h1 class="text-7xl font-bold">Following</h1>
        <h2 class="text-base text-red mt-3">{{following.length}} Strong people</h2>
      </div>
      
      <div class="min-w-screen h-full mt-24">
        <div class="flex flex-wrap gap-x-44">
          <span v-for="user in following" :key="user">
            <FollowCard :name="user" />
          </span>
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
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    following() {
      return this.res.following
    },
  },

  async asyncData({$axios, store}) {
    let res = await $axios.$get(`https://rz7wshkfyh.execute-api.ap-southeast-2.amazonaws.com/prod/read` + `?username=${store.state.auth.user}`)
    const content = JSON.parse(res.body)

    return {
      res: content.Item
    }
    
  }

}

</script>
