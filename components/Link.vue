<template>
  <NuxtLink class="font-bold" :to="to">
    <slot></slot>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: String,
  }
}
</script>