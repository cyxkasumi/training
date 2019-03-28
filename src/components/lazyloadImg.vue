<style scoped lang="less">
  img {
    width: 100%;
    height: 100%;
  }
</style>
<template>
  <img ref="target" :data-src="dataSrc" />
</template>
<script>
export default{
  props: {
    dataSrc: {
      default: '',
      type: String
    },
    defaultImg: {
      default: require('../assets/img/testing_reload.png'),
      type: String
    }
  },
  mounted () {
    let img = this.$refs.target
    this.$lazyLoad.addImages(img)
  },
  methods: {}
}
</script>
