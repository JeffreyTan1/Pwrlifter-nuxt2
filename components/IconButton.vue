<template>
  <div class="py-3 px-4 bg-red">
      <font-awesome-icon class="text-white" :icon="name"/> 
  </div>
</template>

<script>
export default {
  props: {
    name: String
  }
}
</script>
