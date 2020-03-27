<template>
  <div class="resource">
    <ResourceList></ResourceList>
  </div>
</template>

<script>
  import ResourceList from "~/components/resource-list";

  export default {
    name: "Resources",
    components: {
      ResourceList
    },
    data() {
      return {
        filterType: 1,
        resources: [],
        loading: false,
        finished: false
      };
    },
    methods: {
    }
  };
</script>

<style lang="scss">
  .resource {
    background-color: #fff;

    .hk-recommend__list {
      padding: 10px;
    }
  }
</style>
