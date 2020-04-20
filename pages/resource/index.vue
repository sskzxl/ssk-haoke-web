<template>
  <div class="resource">
    <ResourceList :rentMethod="rentMethod"></ResourceList>
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
        rentMethod: 1,
      };
    },
    created() {
      this.rentMethod = Number(this.$route.query.type);
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
