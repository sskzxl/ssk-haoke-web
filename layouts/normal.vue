<template>
  <BasicLayout>
    <template v-slot:header>
      <Header name="header"></Header>
    </template>
    <template v-slot:footer>
      <Footer></Footer>
    </template>
  </BasicLayout>
</template>

<script>
import BasicLayout from "~/layouts/basic";
import Header from "~/components/header/HeaderBasic";
import Footer from "~/components/Footer";
export default {
  components: {
    Header,
    BasicLayout,
    Footer
  }
};
</script>
<style></style>
