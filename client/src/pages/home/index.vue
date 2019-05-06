<template>
  <VueMarkdown class="wrap">{{msg}}</VueMarkdown>
</template>

<script>
import VueMarkdown from 'vue-markdown'; //vue markdown 解析器 +
import ReadMe from './readme.md';
export default {
  data() {
    return {
      msg: ReadMe
    };
  },
  components: {
    VueMarkdown
  },
  mounted() {
    // console.log(this.$route.query);
    // console.log(this.$route.params);
  }
};
</script>

<style lang='less' scoped>
.wrap {
  width: 100%;
  height: auto;
  padding: 15px;
}
</style>

