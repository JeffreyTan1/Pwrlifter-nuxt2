<template>
  <div class="w-44 h-44 bg-grey">
      <h2>{{ name }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  }
}
</script>