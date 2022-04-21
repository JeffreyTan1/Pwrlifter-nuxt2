<template>

<div v-if="slug !== null">

  <div v-if="slug === ''" class="min-w-screen min-h-screen flex flex-col justify-center">
    <div class="flex flex-col items-center justify-center text-center gap-20">
      <SearchBar />
      <h1 class="text-5xl font-bold">A portfolio for your best powerlifts</h1>
      <div class="flex justify-center items-center gap-16" v-if="user === null">
        <NuxtLink :to="'/analytics/dashboard'" class="py-2 px-3.5 bg-red inline text-s font-bold text-center">
          Analytics
        </NuxtLink>

        <!-- <NuxtLink to="/accounts/login" class="min-w-[6rem] py-2 px-3.5 bg-red inline text-s font-bold text-center">
          Login
        </NuxtLink>

        <NuxtLink to="/accounts/signup" class="min-w-[6rem] py-2 px-3.5 bg-red inline text-s font-bold text-center">
          Signup
        </NuxtLink> -->
        <a
        class="min-w-[6rem] py-2 px-3.5 bg-red inline text-s font-bold text-center" 
        :href="'https://auth.pwrlifter.com/login?client_id=5v9ssu9o5ri02k6nu2ng9ruu60&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=' + currentUrl + '/callback/login'">
        Login
        </a>

        <a
        class="min-w-[6rem] py-2 px-3.5 bg-red inline text-s font-bold text-center" 
        :href="'https://auth.pwrlifter.com/signup?client_id=5v9ssu9o5ri02k6nu2ng9ruu60&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=' + currentUrl + '/callback/login'">
        Signup
        </a>
      </div>
      <div v-else class="flex justify-center items-center gap-16">
        <NuxtLink :to="'/analytics/dashboard'" class="py-2 px-3.5 bg-red inline text-s font-bold text-center">
          Analytics
        </NuxtLink>
        <NuxtLink :to="'/' + user" class="py-2 px-3.5 bg-red inline text-s font-bold text-center">
          My Profile
        </NuxtLink>
        <NuxtLink :to="'/account/following'" class="py-2 px-3.5 bg-red inline text-s font-bold text-center">
          Following
        </NuxtLink>
        <button
          class="min-w-[6rem] py-2 px-3.5 bg-red inline text-s font-bold text-center"
          @click="logout"
          >
          Logout
        </button>
      </div>

    </div>
  </div>

  <div v-else class="px-[3%] py-16">
    <NavBar />

    <div class="min-w-screen h-30 flex justify-between items-center flex-wrap gap-y-10">
      <div class="flex">
        <div class="w-28 h-26 bg-grey mr-10 inline relative" >
          <img :src="'https://d6eerfex7ow65.cloudfront.net/' + slug + ';' + 'profilePic'"/>
          <!-- Allow edits when user is the same as page -->
          <NuxtLink class="absolute bottom-0 right-0 scale-75" :to="'/post/profile'" v-if="user === slug">
            <IconButton :name="'edit'"/>
          </NuxtLink>
        </div>
        
        <div class="flex flex-col">
          <h1 class="text-7xl font-bold">{{slug}}</h1>
          <h2 class="text-base text-red mt-3">Total: {{total.kg}}kg/{{total.lbs}}lbs</h2>
        </div>
      </div>
      <div class="flex gap-10">
        <!-- Allow follows when user is logged in and isnt themself -->
        <button @click="toggle_follow">
          <IconButton :name="isFollowing ? 'x' : 'plus'" v-if="user !== null && user !== slug"/>
        </button>

        <IconButton :name="'share'"/>
      </div>
        
      </div>

      <div class="min-w-screen h-full mt-24">
        <div class="flex flex-wrap justify-between">
          <VideoFrame :name="'squat'" :data="res.squat" :slug="slug"/>
          <VideoFrame :name="'bench'" :data="res.bench"  :slug="slug"/>
          <VideoFrame :name="'deadlift'" :data="res.deadlift"  :slug="slug"/>
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
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    currentUrl() {
      return process.env.baseUrl
    },
    total() {
      const squatKg = this.res.squat.unit === 'kg' ? Number(this.res.squat.weight) : Number(this.res.squat.weight) / 2.20462262185
      const benchKg = this.res.bench.unit === 'kg' ? Number(this.res.bench.weight) : Number(this.res.bench.weight) / 2.20462262185
      const deadliftKg = this.res.deadlift.unit === 'kg' ? Number(this.res.deadlift.weight) : Number(this.res.deadlift.weight) / 2.20462262185
      const totalKg = squatKg + benchKg + deadliftKg
      const totalLbs = totalKg * 2.20462262185

      return {
        kg: totalKg.toFixed(2),
        lbs: totalLbs.toFixed(2)
      }
    },
    isFollowing() {

      return this.res.followers.includes(this.$store.state.auth.user)
    },
  },
  data() {
    return {
      slug: null,
    }
  },
  methods: {
    logout() {
      this.$store.commit('auth/setToken', null)
      this.$store.commit('auth/setUser', null)
    },
    toggle_follow() {
      this.$axios.$put(`https://rz7wshkfyh.execute-api.ap-southeast-2.amazonaws.com/prod/update`,
        {
          action: 'toggle_follow',
          payload: this.slug,
        },
        {
          headers: {
            Authorization: this.$store.state.auth.token,
          }
        }
      ).catch(
        (err) => {
          console.error(err)
        }
      ).then(
        (res) => {
          console.info(res)
          this.$nuxt.refresh()
        }
      )
      
    },

  },
  async asyncData({params, $axios}) {
    if(!params?.slug) {
      return
    }
    let res = await $axios.$get(`https://rz7wshkfyh.execute-api.ap-southeast-2.amazonaws.com/prod/read` + `?username=${params.slug}`)
    
    const content = JSON.parse(res.body)
    // if user doesn't exist then an error will be thrown when accessing the data in render, showing 404 page

    return {
      res: content.Item
    }
    
  }
}

</script>
