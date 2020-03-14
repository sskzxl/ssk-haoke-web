<template>
  <p>{{ $route.params.id }}</p>
</template>

<script>
export default {
    
    created() {
        console.log(this.$route)
    }
}
</script>

<style>

</style>