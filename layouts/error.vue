<template>
  <div class="min-h-screen min-w-screen flex justify-center align-middle">
    <div class="flex flex-col w-1/3 mx-auto my-auto text-center">
      <h1 class="text-3xl" v-if="error.statusCode === 404">Page not found</h1>
      <h1 class="text-3xl" v-else>An error occurred</h1>
      <Link class="mt-24" :to="'/'">Go To Home</Link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>