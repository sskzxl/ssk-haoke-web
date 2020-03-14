<template>
  <van-tree-select
    :items="addressList"
    :active-id.sync="activeId"
    :main-active-index.sync="activeIndex"
  />
</template>

<script>
export default {
  data() {
    return {
      addressList: [{ text: "广东", children: [
        {
          text: "广州"
        },
        {
          text: "揭阳"
        },
      ] }],
      activeId: 1,
      activeIndex: 0
    };
  }
};
</script>
<style lang="scss"></style>
