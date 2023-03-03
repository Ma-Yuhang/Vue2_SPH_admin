<!-- 自己封装的有提示文字的按钮 -->
<template>
  <a :title="title" style="margin:10px">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: 'HintButton',
  props: ['title']
}
</script>

<style>
</style>