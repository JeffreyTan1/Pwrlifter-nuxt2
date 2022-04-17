<template>
  <div class="min-w-screen h-14 flex justify-end gap-16">
    <Link :to="'/'"><font-awesome-icon class="text-white" icon="search"/></Link>
    <Link :to="'/u/following'">Following</Link>
    <Link :to="'/u/logout'">Logout</Link>
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>