<template>
  <NuxtLink :to="'/' + name">
    <div class="w-44 h-44 bg-grey flex justify-center items-center" >
      <img :src="'https://d6eerfex7ow65.cloudfront.net/' + name + ';' + 'profilePic'"/>
      <h2>{{ name }}</h2>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    name: String,
  }
}
</script>