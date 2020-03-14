<template>
  <BasicLayout>
    <template v-slot:header>
      <HeaderSearch></HeaderSearch>
    </template>
    <template v-slot:footer>
      <Footer />
    </template>
  </BasicLayout>
</template>

<script>
import BasicLayout from "~/layouts/basic"
import HeaderSearch from "~/components/Header/HeaderSearch"
import Footer from "~/components/Footer"
export default {
  components: {
    HeaderSearch,
    BasicLayout,
    Footer,
  }
};
</script>
<style>
</style>
