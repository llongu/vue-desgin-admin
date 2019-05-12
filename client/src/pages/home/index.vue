<template>
  <div class="wrap">
    <VueMarkdown>{{msg}}</VueMarkdown>
    <div @click='testKepp'>{{keepValue}}</div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'; //vue markdown 解析器 +
import ReadMe from './readme.md';
export default {
  name: 'home',
  data() {
    return {
      msg: ReadMe,
      keepValue: '点击测试keep-alive数据'
    };
  },
  components: {
    VueMarkdown
  },
  methods: {
    testKepp() {
      this.keepValue = '测试完毕';
    }
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

