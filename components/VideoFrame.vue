<template>
  <div class="w-96 flex flex-col items-start">
      <h2 class="inline font-bold text-3xl mr-5">{{name}}</h2>
      <p class="inline text-base text-red">{{weight}} kg/lbs</p>
      <video width="320" height="600" controls>
      </video>
      <NuxtLink :to="'/post/lift/' + name.toLowerCase()">
        <IconButton :name="'edit'"/>
      </NuxtLink>
  </div>
</template>

<script>

export default {
  props: {
    name: String,
    weight: Number,
  }
}
</script>
