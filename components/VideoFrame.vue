<template>
  <div class="w-96 flex flex-col items-start">
      <h2 class="inline font-bold text-3xl mr-5">{{capName}}</h2>
      <p class="inline text-base text-red">{{weight.kg}}kg/{{weight.lbs}}lbs</p>
      <video width="320" height="600" controls :src="'https://d6eerfex7ow65.cloudfront.net/' + slug + ';' + name"/>
      <!-- Allow edits when user is the same as page -->
      <NuxtLink :to="'/post/lift/' + name.toLowerCase()" v-if="user === slug">
        <IconButton :name="'edit'"/>
      </NuxtLink>
  </div>
</template>

<script>

export default {
  props: {
    name: String,
    data: Object,
    slug: String,

  },
  computed: {
    capName() {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1)
    },
    user() {
        return this.$store.state.auth.user
    },
    weight() {
      const weightKg = this.data.unit === 'kg' ? Number(this.data.weight) : Number(this.data.weight) / 2.20462262185
      const weightLbs = weightKg * 2.20462262185

      return {
        kg: weightKg.toFixed(2),
        lbs: weightLbs.toFixed(2)
      }
    },
    
    },

}
</script>
