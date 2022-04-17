<template>

      <div class="w-80 relative">
        <form @submit="onSubmit">
          <input class="pl-10 py-2 rounded-xl text-lg outline-none w-80" v-model="query" scale/>
        </form>
        <font-awesome-icon class="text-grey absolute top-3.5 left-3" icon="search"/> 
      </div>
   
</template>

<script>
export default {
  data() {
    return {
      query: '',
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$nuxt.$options.router.push(this.query)
    },
  }
}
</script>
